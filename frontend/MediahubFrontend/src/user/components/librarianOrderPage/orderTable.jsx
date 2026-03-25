import  OrderRow from "./orderRow";

export default function TermekTable({ items, onActionComplete }) {
    if (!items || items.length === 0) {
        return <p>Nincsenek elemek.</p>;
    }

    return (
        <table className="functional_cell-table table table-striped">
            <thead>
                <tr>
                    <th className="functional_cell">Termék</th>
                    <th className="functional_cell">Felhasználó</th>
                    <th className="functional_cell">Státusz</th>
                    <th className="functional_cell" colSpan={2}>Műveletek</th>
                </tr>
            </thead>
            <tbody>
                {items.map((order) => (
                    <OrderRow key={order.o_id} order={order} user={order.user} />
                ))}
            </tbody>
        </table>
    );
}
