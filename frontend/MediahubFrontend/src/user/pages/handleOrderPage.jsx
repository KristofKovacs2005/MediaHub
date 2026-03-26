import { useState, useEffect } from "react";
import RenderNavbar from "../components/navbar/renderNavbar";
import { Footer } from "../components/footer/footer";
import OrderTable from "../components/librarianOrderPage/orderTable";
import { getOrdersForLibrarian } from "../functions/orders";
import "../components/librarianOrderPage/orderPage.css"
import { PieChart } from "../components/charts/pieChart/pieChart";

export default function OrdersLibrarianPage() {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState(null); // filter by pie slice
    const [searchTerm, setSearchTerm] = useState("");       // optional search

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersForLibrarian();
                setOrders(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, []);

    // count statuses
    const statusCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const labels = ["Várakozik", "Elfogadva", "Elutasítva", "Visszahozva", "Visszahozva későn", "Késik"];
    orders.forEach(order => { if (statusCounts[order.s_id] !== undefined) statusCounts[order.s_id]++; });
    const values = [1, 2, 3, 4, 5, 6].map(i => statusCounts[i]);

    // filtered orders by status & search
    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter ? order.s_id === statusFilter : true;
        const matchesSearch = searchTerm
            ? order.item?.i_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.username.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return matchesStatus && matchesSearch;
    });

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
                                setStatusFilter(index >= 0 ? index + 1 : null);
                            }}
                        />

                    </div>
                </section>

                {/* SEARCH FILTER */}
                <div className="search-filter" style={{ marginBottom: '1rem', textAlign: 'right' }}>
                    <input
                        type="text"
                        placeholder="Keresés felhasználó vagy termék név alapján..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            width: '100%',
                            maxWidth: '400px',
                            fontSize: '0.9rem'
                        }}
                    />
                    <button
                        className="btn btn-secondary"
                        style={{ marginTop: "1rem" }}
                        onClick={() => { setStatusFilter(null); setSearchTerm(""); }}
                    >
                        Clear
                    </button>
                </div>

                {/* TABLE SECTION */}
                <section className="section-container">
                    <div className="table-card">
                        <OrderTable orders={filteredOrders} />
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}