import { useEffect, useState } from "react";
import {Footer} from "../components/footer/footer.jsx";
import ItemsGrid from "../components/sections/item-grid.jsx";
import FilterBar from "../components/filter/filterBar.jsx";
import { fetchItems } from "../functions/items";
import { fetchTags } from "../functions/getAllTags";
import { applyFilters } from "../functions/useFilter";
import {sortItemsAZ, sortItemsZA} from "../functions/sortingItems.js"
import RenderNavbar from "../components/navbar/renderNavbar.jsx";

const TermekekPage = () => {
  const [tags, setTags] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("AZ"); // Default sort A→Z

  useEffect(() => {
    fetchTags(setTags, setError);
    fetchItems({ setLoading, setItems, setError });
  }, []);

  const parseSearchInput = (input) => {
    const tagRegex = /tag:([^\s]+)/gi;
    const authorRegex = /author:([^\s]+)/i;
    let tags = [];
    let author = "";
    let name = input;

    let tagMatch;
    while ((tagMatch = tagRegex.exec(input))) tags.push(tagMatch[1]);
    const authorMatch = authorRegex.exec(input);
    if (authorMatch) author = authorMatch[1];
    name = name.replace(tagRegex, "").replace(authorRegex, "").trim();

    return { name, author, tags };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { name, author, tags } = parseSearchInput(searchInput);
    setNameFilter(name);
    setAuthorFilter(author);
    setTagsFilter(tags);

    applyFilters({
      nameFilter: name,
      tagsFilter: tags,
      authorFilter: author,
      setLoading,
      setItems,
      setError,
      fetchFn: fetchItems,
    });
  };

  // Apply sorting whenever items or sortOrder changes
  const sortedItems = sortOrder === "AZ"
    ? sortItemsAZ(items)
    : sortItemsZA(items);

  return (
    <div className="termekek-page">
      <RenderNavbar/>
      
      <FilterBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        tags={tags}
        selectedTags={tagsFilter}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleSearch={handleSearch}
      />

      {/* Sort select */}
      <div className="sort-bar">
        <label htmlFor="sortOrder">Rendezés:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="AZ">A → Z</option>
          <option value="ZA">Z → A</option>
        </select>
      </div>

      <ItemsGrid items={sortedItems} loading={loading} error={error} />
      <Footer />
    </div>
  );
};

export default TermekekPage;