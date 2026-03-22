import { useEffect, useState } from 'react';
import { fetchTags } from '../functions/getAllTags';
import { fetchItems } from '../functions/items';
import { applyFilters } from '../functions/useFilter';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/footer';

const TermekekPage = () => {
  const [tags, setTags] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchTags(setTags, setError);
    fetchItems({ setLoading, setItems, setError });
  }, []);

  // Parse input like: "author:John tag:Science tag:Math MyItemName"
  const parseSearchInput = (input) => {
    const tagRegex = /tag:([^\s]+)/gi;
    const authorRegex = /author:([^\s]+)/i;
    let tags = [];
    let author = '';
    let name = input;
    // Extract tags
    let tagMatch;
    while ((tagMatch = tagRegex.exec(input))) {
      tags.push(tagMatch[1]);
    }
    // Extract author
    const authorMatch = authorRegex.exec(input);
    if (authorMatch) {
      author = authorMatch[1];
    }
    // Remove tag and author from name
    name = name.replace(tagRegex, '').replace(authorRegex, '').trim();
    return { name, author, tags };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { name, author, tags } = parseSearchInput(searchInput);
    setNameFilter(name);
    setAuthorFilter(author);
    setTagsFilter(tags);
    applyFilters({
      nameFilter: name,
      tagsFilter: tags,
      authorFilter: author,
      setLoading,
      setItems,
      setError,
      fetchFn: fetchItems
    });
  };

  // Tag selection for convenience (optional)
  const handleTagClick = (tag) => {
    // Add tag to searchInput if not present
    if (!searchInput.includes(`tag:${tag}`)) {
      setSearchInput((prev) => `${prev} tag:${tag}`.trim());
    }
    setShowDropdown(false);
  };

  const handleTagRemove = (tag) => {
    // Remove tag from searchInput
    setSearchInput((prev) => prev.replace(new RegExp(`tag:${tag}\b`, 'g'), '').replace(/\s+/g, ' ').trim());
  };

  return (
    <div className="termekek-page">
      <Navbar />
      <div className="filter-bar">
        <form onSubmit={handleSearch} className="filter-form">
          <input
            type="text"
            placeholder="Keresés: author:John tag:Science ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="tags-input">
            {tagsFilter.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
                <button type="button" onClick={() => handleTagRemove(tag)}>×</button>
              </span>
            ))}
            <button type="button" onClick={() => setShowDropdown((v) => !v)}>
              Tag választó ▼
            </button>
            {showDropdown && (
              <div className="tags-dropdown">
                {tags.map((tag) => (
                  <button
                    key={tag.t_name || tag}
                    type="button"
                    className="tag-btn"
                    onClick={() => handleTagClick(tag.t_name || tag)}
                  >
                    {tag.t_name || tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="search-btn">🔍</button>
        </form>
      </div>
      <div className="items-list">
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && items.length === 0 && <div>Nincs találat.</div>}
        {!loading && !error && items.length > 0 && (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.i_id} className="item-card">
                <h4>{item.i_name}</h4>
                <p>{item.i_description}</p>
                <p>Szerző: {item.author}</p>
                <p>Tag-ek: {item.tagek}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TermekekPage;
