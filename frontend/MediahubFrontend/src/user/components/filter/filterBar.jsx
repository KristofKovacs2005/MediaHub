import "./filterBar.css";

const FilterBar = ({
    searchInput,
    setSearchInput,
    tags,           // all available tags
    selectedTags,   // tags currently applied / selected
    showDropdown,
    setShowDropdown,
    handleSearch
}) => {
    const handleTagClick = (tag) => {
        if (!searchInput.includes(`tag:${tag}`)) {
            setSearchInput((prev) => `${prev} tag:${tag}`.trim());
        }
        setShowDropdown(false);
    };

    const handleTagRemove = (tag) => {
        setSearchInput((prev) => prev.replace(new RegExp(`tag:${tag}\\b`, "g"), "").trim());
    };

    return (
        <div className="filter-bar">
            <form onSubmit={handleSearch} className="filter-form">
                <input
                    type="text"
                    placeholder="Keresés: author:John tag:Science ..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <div className="tags-input">
                    {/* Show currently selected tags */}
                    {selectedTags.map((tag) => (
                        <span key={tag} className="tag-chip">
                            {tag}
                            <button type="button" onClick={() => handleTagRemove(tag)}>×</button>
                        </span>
                    ))}

                    {/* Dropdown toggle */}
                    <button type="button" onClick={() => setShowDropdown((v) => !v)}>
                        Taggek ▼
                    </button>

                    {/* Dropdown list of all tags */}
                    {showDropdown && (
                        <div className="tags-dropdown">
                            {tags.map((tag) => {
                                const tagName = tag.t_name || tag;
                                const isSelected = selectedTags.includes(tagName);

                                return (
                                    <button
                                        key={tagName}
                                        type="button"
                                        className={`tag-btn ${isSelected ? "disabled" : ""}`}
                                        disabled={isSelected}
                                        onClick={() => handleTagClick(tagName)}
                                    >
                                        {tagName}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <button type="submit" className="search-btn">🔍</button>
            </form>
        </div>
    );
};

export default FilterBar;