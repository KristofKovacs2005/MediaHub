// Filter logic hook
export function applyFilters({ nameFilter, tagsFilter, authorFilter, setLoading, setItems, setError, fetchFn }) {
    fetchFn({
        name: nameFilter.trim(),
        tags: Array.isArray(tagsFilter) ? tagsFilter.join(",") : tagsFilter,
        author: authorFilter.trim(),
        setLoading,
        setItems,
        setError
    });
}

export function clearFilters({ setNameFilter, setTagsFilter, setAuthorFilter, setLoading, setItems, setError, fetchFn }) {
    setNameFilter("");
    setTagsFilter([]);
    setAuthorFilter("");
    fetchFn({ setLoading, setItems, setError });
}
