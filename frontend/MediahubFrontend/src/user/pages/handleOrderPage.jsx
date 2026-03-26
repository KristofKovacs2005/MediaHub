import RenderNavbar from "../components/navbar/renderNavbar";
import { Footer } from "../components/footer/footer";
import OrderTable from "../components/librarianOrderPage/orderTable";
import { useState, useEffect } from "react";
import { getOrdersForLibrarian } from "../functions/orders";


export default function HandleOrderPage(){
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getOrdersForLibrarian();
                setOrders(data);
            } catch (err) {
                console.error(err);
                setError("Nem sikerült betölteni a kölcsönzéseket.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []); 

    return(
        <div className="pageMainDiv">
            {/* Navbar */}
            <RenderNavbar />

            {/* Main page content */}
            <div className="pageBelowNavbar">
                <h2>Kölcsönzések kezelése</h2>
                {loading && <p>Betöltés...</p>}
                {error && <p>Hiba: {error}</p>}

                {!loading && !error && (
                    <OrderTable orders={orders} />
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}