export default function FilterUi({
    applyFilters,
    clearFilters,
    nameFilter,
    setNameFilter,
    tagsFilter,
    setTagsFilter,
    setLoading,
    setItems,
    setError
}) {
    // List of predefined tags
    const predefinedTags = ["Hős", "Dráma", "Akció", "2D"];

    // Toggle tag in the filter
    const toggleTag = (tag) => {
        if (tagsFilter.includes(tag)) {
            // Remove tag if already selected
            setTagsFilter(tagsFilter.filter((t) => t !== tag));
        } else {
            // Add tag if not selected
            setTagsFilter([...tagsFilter, tag]);
        }
    };

    return (
        <section className="filter-section">
            <div className="filter-row">
                {/* Name search input */}
                <input
                    className="filter-input"
                    placeholder="Search name..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    aria-label="Search by name"
                />

                {/* Tags as buttons */}
                <div className="tags-row">
                    {predefinedTags.map((tag) => (
                        <button
                            key={tag}
                            className={`tag-btn ${tagsFilter.includes(tag) ? "selected" : ""}`}
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Apply & Clear buttons */}
                <button
                    className="filter-btn"
                    onClick={() =>
                        applyFilters({ nameFilter, tagsFilter, setLoading, setItems, setError })
                    }
                >
                    Szűrés
                </button>
                <button
                    className="filter-btn"
                    onClick={() =>
                        clearFilters({ setNameFilter, setTagsFilter, setLoading, setItems, setError })
                    }
                >
                    Clear
                </button>
            </div>
        </section>
    );
}


