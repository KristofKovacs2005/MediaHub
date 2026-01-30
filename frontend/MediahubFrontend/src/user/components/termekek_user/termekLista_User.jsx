import React, { useEffect, useState } from "react";
import { applyFilters, clearFilters } from "./termekekUserFilterFunction.jsx";
import FilterUI from "./termekekUserFilter.jsx";
import LoadItemsUser from "./loadTermekekUser.jsx";
import TermekekSectionUser from "./termekekUserSection.jsx";

export default function TermekekUser() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nameFilter, setNameFilter] = useState("");
    const [tagsFilter, setTagsFilter] = useState("");
    const userToken = localStorage.getItem("userToken");
    const jogosultsag = localStorage.getItem("jogosultsag");
    if (!userToken || jogosultsag === 0 || jogosultsag === null || jogosultsag === undefined || jogosultsag === 3 || jogosultsag === 2) {
        setError("User not authenticated");
        setLoading(false);
        return;
    }
    // initial load (no filters)
    useEffect(() => {
        LoadItemsUser({ setLoading, setItems, setError });
    }, []);

    if (loading) return <section>Loading items…</section>;
    if (error) return <section>Error loading items: {error}</section>;

    return (
        <div className="termekekUserDiv">
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
            <TermekekSectionUser items={items} />
        </div>
    );
}