import React, { useEffect, useState } from "react";
import { applyFilters, clearFilters } from "./termekekUserFilterFunction.jsx";
import FilterUI from "./termekekUserFilter.jsx";
import LoadItemsUser from "./loadTermekekUser.jsx";
import TermekekSectionUser from "./termekekUserSection.jsx";
import "./termekek.css";

export default function TermekekUser() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nameFilter, setNameFilter] = useState("");
    const [tagsFilter, setTagsFilter] = useState("");

    // initial load (no filters)
    useEffect(() => {
        LoadItemsUser({ setLoading, setItems, setError });
    }, []);

    if (loading) return <section>Loading items…</section>;
    if (error) return <section>Error loading items: {error}</section>;

    return (
      <>
      <div className="termekekUserHeader">
        <FilterUI
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          tagsFilter={tagsFilter}
          setTagsFilter={setTagsFilter}
          setLoading={setLoading}
          setItems={setItems}
          setError={setError}
        />
        </div>
        <div className="termekekUserDiv">
          <TermekekSectionUser items={items} />
        </div>
      </>
    );
}