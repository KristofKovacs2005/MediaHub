import LoadItemsUser from "./loadTermekekUser";
import "./termekek.css";

// Apply filters function
export function applyFilters({ nameFilter, tagsFilter, setLoading, setItems, setError }) {
    LoadItemsUser({
        name: nameFilter.trim(),
        tags: tagsFilter.join(","), // send as comma-separated string
        setLoading,
        setItems,
        setError
    });
}

// Clear filters function
export function clearFilters({ setNameFilter, setTagsFilter, setLoading, setItems, setError }) {
    setNameFilter("");
    setTagsFilter([]);
    LoadItemsUser({ setLoading, setItems, setError }); // reload all items
}