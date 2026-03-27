import "./shared.css";

/**
 * TableSearchBar
 *
 * Generic search + filter bar for admin/librarian table pages.
 * Renders a row of text inputs (via refs), Search and Clear buttons,
 * and an optional children slot for extra controls (e.g. "Add item" link).
 *
 * Props:
 *   fields    {Array<{ ref: React.RefObject, placeholder: string, type?: string }>}
 *               - Each entry becomes one <input> bound to the given ref
 *   onSearch  {function} - Called when the Search button is clicked
 *   onClear   {function} - Called when the Clear button is clicked
 *             (should reset ref.current.value = "" for each field)
 *   children  {node}     - Optional extra content rendered after the buttons
 *                          (e.g. a <Link> to add a new item)
 *
 * Usage:
 *   const nameRef = useRef();
 *   const authorRef = useRef();
 *
 *   <TableSearchBar
 *     fields={[
 *       { ref: nameRef,   placeholder: "Név alapján..." },
 *       { ref: authorRef, placeholder: "Szerző alapján..." },
 *     ]}
 *     onSearch={handleSearch}
 *     onClear={handleClear}
 *   >
 *     <Link className="btn btn-success" to="/ujtermek">Új termék</Link>
 *   </TableSearchBar>
 */
export default function TableSearchBar({ fields = [], onSearch, onClear, children }) {
    return (
        <div className="shared-search-bar">
            {fields.map((field, i) => (
                <input
                    key={i}
                    ref={field.ref}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    className="form-control"
                    style={{ maxWidth: "220px" }}
                />
            ))}
            <button className="btn btn-primary" onClick={onSearch}>
                Keresés
            </button>
            <button className="btn btn-secondary" onClick={onClear}>
                Törlés
            </button>
            {children}
        </div>
    );
}
