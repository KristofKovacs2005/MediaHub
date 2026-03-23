import { useEffect, useState } from "react";
import { Footer } from "../components/footer/footer.jsx";
import ItemsGrid from "../components/sections/item-grid.jsx";
import FilterBar from "../components/filter/filterBar.jsx";
import { fetchItems } from "../functions/items";
import { fetchTags } from "../functions/getAllTags";
import { sortItemsAZ, sortItemsZA } from "../functions/sortingItems.js";
import RenderNavbar from "../components/navbar/renderNavbar.jsx";
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
  const handleSearch = (input) => {
    // input comes directly from FilterBar
    // you can parse tags or author here if needed
    fetchItems({ setItems, setLoading, setError, search: input });
  };

  return (
    <div className="termekek-page">
      <RenderNavbar />

      <FilterBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        tags={tags}
        handleSearch={handleSearch} // input will be passed automatically
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