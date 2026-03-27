import { useEffect, useState } from "react";
import { Footer } from "../components/footer/footer.jsx";
import ItemsGrid from "../components/sections/item-grid.jsx";
import FilterBar from "../components/filter/filterBar.jsx";
import { fetchItems } from "../functions/items";
import { fetchTags } from "../functions/tags.js";
import { sortItemsAZ, sortItemsZA } from "../functions/sortingItems.js";
import RenderNavbar from "../components/navbar/renderNavbar.jsx";
import { applyFilters } from "../functions/useFilter.js";
import "./dontBeInNavbar.css";

const TermekekPage = () => {
  const [tags, setTags] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState(""); // FilterBar manages selected tags internally
  const [sortOrder, setSortOrder] = useState("AZ");   // Default sort A→Z

  useEffect(() => {
    fetchTags(setTags, setError);
    fetchItems({ setLoading, setItems, setError });
  }, []);

  // Sorting items
  const sortedItems = sortOrder === "AZ"
    ? sortItemsAZ(items)
    : sortItemsZA(items);

  // Handle search submission
  // Handle search submission
const handleSearch = (input) => {
  // parse tags and author from the search string
  const tagRegex = /tag:([^\s]+)/gi;
  const authorRegex = /author:([^\s]+)/i;

  let tagsArray = [];
  let author = "";
  let name = input;

  let match;
  while ((match = tagRegex.exec(input))) {
    tagsArray.push(match[1]);
  }

  const authorMatch = authorRegex.exec(input);
  if (authorMatch) author = authorMatch[1];

  // remove parsed tags and author from the text search
  name = name.replace(tagRegex, "").replace(authorRegex, "").trim();

  // call your existing applyFilters helper
  applyFilters({
    nameFilter: name,
    tagsFilter: tagsArray,
    authorFilter: author,
    setLoading,
    setItems,
    setError,
    fetchFn: fetchItems,
    
  });
};

  return (
    <div className="termekek-page">
      <RenderNavbar />

      <FilterBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        tags={tags}
        handleSearch={handleSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder} // input will be passed automatically
      />

      <div className="items-grid-wrapper">
        <ItemsGrid items={sortedItems} loading={loading} error={error} />
      </div>
      <Footer />
    </div>
  );
};

export default TermekekPage;