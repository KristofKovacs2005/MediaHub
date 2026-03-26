import  OrderRow from "./orderRow";

export default function OrderTable({ orders }) {
    if (!orders || orders.length === 0) {
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
                {orders.map((order) => (
                    <OrderRow key={order.o_id} order={order}/>
                ))}
            </tbody>
        </table>
    );
}
