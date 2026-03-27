import { useState, useEffect, useRef } from "react";
import RenderNavbar from "../components/navbar/renderNavbar";
import { Footer } from "../components/footer/footer";
import OrderTable from "../components/librarianOrderPage/orderTable";
import { getOrdersForLibrarian } from "../functions/orders";
import "../components/librarianOrderPage/orderPage.css";
import { PieChart } from "../components/charts/pieChart/pieChart";

export default function OrdersLibrarianPage() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const userRef = useRef();
    const itemRef = useRef();
    const statusRef = useRef(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersForLibrarian();
                setOrders(data);
            } catch (err) {
                setOrders([]);
            }
        };
        fetchOrders();
    }, []);

    // count statuses
    const statusCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const labels = ["Várakozik", "Elfogadva", "Elutasítva", "Visszahozva", "Visszahozva későn", "Késik"];
    orders.forEach(order => { if (statusCounts[order.s_id] !== undefined) statusCounts[order.s_id]++; });
    const values = [1, 2, 3, 4, 5, 6].map(i => statusCounts[i]);

    const handleSearch = () => {
        const filtered = orders.filter(order =>
            (!userRef.current.value || order.user?.username.toLowerCase().includes(userRef.current.value.toLowerCase())) &&
            (!itemRef.current.value || order.item?.i_name.toLowerCase().includes(itemRef.current.value.toLowerCase())) &&
            (!statusRef.current || order.s_id === statusRef.current)
        );
        setFilteredOrders(filtered);
    };

    const handleClear = () => {
        userRef.current.value = "";
        itemRef.current.value = "";
        setFilteredOrders([]);
    };

    return (
        <div className="page-wrapper">
            <RenderNavbar />
            <div className="page-content">
                <h2>Kölcsönzés kezelés</h2>
                <div className="div-divider" />

                {/* PIE CHART SECTION */}
                <section className="section-container">
                    <div className="pie-chart-card">
                        <h3>Rendelések státusz szerint</h3>
                        <PieChart
                            labelsArray={labels}
                            valuesArray={values}
                            backgroundColors={[
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)'
                            ]}
                            onSliceClick={(label) => {
                                const index = labels.indexOf(label);
                                statusRef.current = index >= 0 ? index + 1 : null;
                                handleSearch(); // immediately apply filter
                            }}
                        />
                    </div>
                </section>

                {/* TABLE SECTION */}
                <section className="section-container">
                    <div className="table-card">
                        <OrderTable orders={filteredOrders.length > 0 ? filteredOrders : orders} />
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}