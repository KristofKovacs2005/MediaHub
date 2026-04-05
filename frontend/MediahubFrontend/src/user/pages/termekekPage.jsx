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

  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
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
const handleSearch = ({ title, author, selectedTags }) => {
  applyFilters({
    nameFilter: title,
    tagsFilter: selectedTags,
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
        titleInput={titleInput}
        setTitleInput={setTitleInput}
        authorInput={authorInput}
        setAuthorInput={setAuthorInput}
        tags={tags}
        handleSearch={handleSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="items-grid-wrapper">
        <ItemsGrid items={sortedItems} loading={loading} error={error} />
      </div>
      <Footer />
    </div>
  );
};

export default TermekekPage;