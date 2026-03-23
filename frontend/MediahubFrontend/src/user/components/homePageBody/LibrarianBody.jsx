import { useEffect, useState } from "react";
import { Header } from "../header/header";
import fetchOrdersLibrarian from "../../functions/getAllOrdersLibrarian"

export default function LibrarianBody() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrdersLibrarian(setOrders);
    }, []);

    // fixed structure like AdminBody
    const statusCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    const labels = [
        "Várakozik",
        "Elfogadva",
        "Elutasítva",
        "Visszahozva",
        "Visszahozva késő",
        "Késik"
    ];

    // count orders
    orders.forEach(order => {
        if (statusCounts[order.s_id] !== undefined) {
            statusCounts[order.s_id]++;
        }
    });

    const values = [
        statusCounts[1],
        statusCounts[2],
        statusCounts[3],
        statusCounts[4],
        statusCounts[5],
        statusCounts[6]
    ];

    return (
        <div className="guest-body">
            <Header />
            <main className="body-content">
                <PieChart
                    valuesArray={values}
                    labelsArray={labels}
                    title="Rendelések státusz szerint"
                    onSliceClick={(label) => console.log(label)}
                />
            </main>
        </div>
    );
}