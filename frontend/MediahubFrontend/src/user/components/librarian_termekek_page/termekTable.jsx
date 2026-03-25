import  TermekRow from "./termekRow";

export default function TermekTable({ items, onActionComplete }) {
    if (!items || items.length === 0) {
        return <p>Nincsenek elemek.</p>;
    }

    return (
        <table className="functional_cell-table table table-striped">
            <thead>
                <tr>
                    <th className="functional_cell">Név</th>
                    <th className="functional_cell">Szerző/Rendező</th>
                    <th className="functional_cell">Tagek</th>
                    <th className="functional_cell">Raktáron</th>
                    <th className="functional_cell" colSpan={2}>Műveletek</th>
                </tr>
            </thead>
            <tbody>
                {items.map((termek) => (
                    <TermekRow key={termek.i_id} termek={termek} onActionComplete={onActionComplete} />
                ))}
            </tbody>
        </table>
    );
}
