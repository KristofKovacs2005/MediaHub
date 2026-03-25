export default function OrderRow({ order, user }) {
    const { item } = useLoadThisItem({ id: order.p_id });

    const statusOrderName = {
        1: "Várakozik",
        2: "Aktív",
        3: "Elutasítva",
        4: "Visszahozva",
        5: "Visszahozva későn",
        6: "Késik"
    };

    const isPending = order.s_id === 1;
    const isActive = [2, 6].includes(order.s_id);

    return (
        <tr>
            <td>{item?.i_name || "Betöltés..."}</td>
            <td>{user?.username}</td>
            <td>{statusOrderName[order.s_id]}</td>

            <td>
                {isPending && (

                    <button className="btn btn-success me-2">
                        Elfogadás
                    </button>
                )}

                {isActive && (
                    <button className="btn btn-warning">
                        Visszahozva
                    </button>
                )}
            </td>
            <td>
                {isPending && (
                    <button className="btn btn-danger">
                        Elutasítás
                    </button>
                )}
            </td>
        </tr>
    );
}