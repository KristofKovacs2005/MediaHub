import LoadItems from "./load";

export function applyFilters({ nameFilter, tagsFilter, setLoading, setItems, setError }) {
    LoadItems({
        name: nameFilter.trim(),
        tags: tagsFilter.trim(),
        setLoading,
        setItems,
        setError
    });
}

export function clearFilters({ setNameFilter, setTagsFilter, setLoading, setItems, setError }) {
    setNameFilter("");
    setTagsFilter("");
    LoadItems({ setLoading, setItems, setError }); // reload all items
}