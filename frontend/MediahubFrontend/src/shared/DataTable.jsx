import "./shared.css";

/**
 * DataTable
 *
 * Generic table used across admin/librarian pages (orders, items, comments).
 * Takes a column config and a renderRow function so each feature keeps
 * its own row logic while sharing the table shell.
 *
 * Props:
 *   columns      {Array<{ label: string, colSpan?: number }>}
 *                  - Column header definitions
 *   data         {Array}    - Array of items to display
 *   renderRow    {function} - (item, index) => <tr>…</tr>
 *   emptyMessage {string}   - Message shown when data is empty (optional)
 *   className    {string}   - Extra CSS class on the <table> element (optional)
 *
 * Usage:
 *   const columns = [
 *     { label: "Termék" },
 *     { label: "Felhasználó" },
 *     { label: "Státusz" },
 *     { label: "Műveletek", colSpan: 2 },
 *   ];
 *
 *   <DataTable
 *     columns={columns}
 *     data={orders}
 *     renderRow={(order) => <OrderRow key={order.o_id} order={order} />}
 *   />
 */
export default function DataTable({
    columns,
    data,
    renderRow,
    emptyMessage = "Nincsenek elemek.",
    className = "",
}) {
    if (!data || data.length === 0) {
        return <p className="shared-empty-state">{emptyMessage}</p>;
    }

    return (
        <table className={`shared-table table table-striped ${className}`}>
            <thead>
                <tr>
                    {columns.map((col, i) => (
                        <th key={i} colSpan={col.colSpan ?? 1}>
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => renderRow(item, index))}
            </tbody>
        </table>
    );
}
