import { useState } from "react";
import "./filterBar.css";

const FilterBar = ({
    titleInput,
    setTitleInput,
    authorInput,
    setAuthorInput,
    tags,
    handleSearch,
    sortOrder,
    setSortOrder
}) => {
    const [selectedTags, setSelectedTags] = useState([]); // state for selected tags
    const [showDropdown, setShowDropdown] = useState(false);

    // add tag to selectedTags
    const handleTagClick = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev : [...prev, tag]
        );

        setShowDropdown(false);
    };

    // remove tag from selectedTags
    const handleTagRemove = (tag) => {
        setSelectedTags((prev) => prev.filter((t) => t !== tag));
    };

    // update the search input with free text + tags when submitting
    const onSubmit = (e) => {
        e.preventDefault();
        handleSearch({ title: titleInput, author: authorInput, selectedTags });
    };

    return (
        <div className="filter-bar">
            <form onSubmit={onSubmit} className="filter-form">
                <input
                    type="text"
                    placeholder="Keresés cím alapján..."
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Keresés szerző alapján..."
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
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
                <div className="sort-container">
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
                <button type="submit" className="search-btn">
                    🔍
                </button>
            </form>
        </div>
    );
};

export default FilterBar;