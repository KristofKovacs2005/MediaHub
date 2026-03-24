import { useState } from "react";
import "./filterBar.css";

const FilterBar = ({
    searchInput,
    setSearchInput,
    tags,           // all available tags
    handleSearch
}) => {
    const [selectedTags, setSelectedTags] = useState([]); // state for selected tags
    const [showDropdown, setShowDropdown] = useState(false);

    // add tag to selectedTags
    const handleTagClick = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags((prev) => [...prev, tag]);
            setSearchInput((prev) => `${prev} tag:${tag}`.trim()); // append tag to input
        }
        setShowDropdown(false);
    };

    // remove tag from selectedTags
    const handleTagRemove = (tag) => {
        setSelectedTags((prev) => prev.filter((t) => t !== tag));
        setSearchInput((prev) => prev.replace(`tag:${tag}`, "").trim()); // remove tag from input
    };

    // update the search input with free text + tags when submitting
    const onSubmit = (e) => {
    e.preventDefault();
    const tagString = selectedTags.map((t) => `tag:${t}`).join(" ");
    const fullSearch = `${searchInput} ${tagString}`.trim();
    setSearchInput(fullSearch);
    handleSearch(fullSearch); // <-- pass string, not event
    };

    return (
        <div className="filter-bar">
            <form onSubmit={onSubmit} className="filter-form">
                <input
                    type="text"
                    placeholder="Keresés: author:John ..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <div className="tags-input">
                    {/* selected tags as chips */}
                    {selectedTags.map((tag) => (
                        <span key={tag} className="tag-chip">
                            {tag}
                            <button
                                type="button"
                                className="removeTagBtn"
                                onClick={() => handleTagRemove(tag)}
                            >
                                ×
                            </button>
                        </span>
                    ))}

                    {/* Dropdown toggle */}
                    <button
                        type="button"
                        className="tagRollDownBtn"
                        onClick={() => setShowDropdown((v) => !v)}
                    >
                        Taggek ▼
                    </button>

                    {/* Dropdown list */}
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

                <button type="submit" className="search-btn">
                    🔍
                </button>
            </form>
        </div>
    );
};

export default FilterBar;