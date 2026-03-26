import { useState, useEffect } from "react";
import { fetchItems } from "../functions/items";
import TermekTable from "../components/librarian_termekek_page/termekTable"; // renamed for PascalCase
import { Footer } from "../components/footer/footer";
import RenderNavbar from "../components/navbar/renderNavbar";
import "../components/librarian_termekek_page/termekek_page.css"
import { Link } from "react-router-dom";

export default function TermekekLibrarianPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInsertOpen, setIsInsertOpen] = useState(false);

    // fetch items using your async function
    const fetchingItems = async () => {
        await fetchItems({ setLoading, setError, setItems });
    };

    useEffect(() => {
        fetchingItems();
    }, []);

    return (
        <div className="pageMainDiv">
            {/* Navbar */}
            <RenderNavbar />

            {/* Main page content */}
            <div className="pageBelowNavbar">
                <h2>Elemek kezelése</h2>

                <Link
                    className="btn btn-success mb-3"
                    to="/ujtermek"
                >
                    Új termék hozzáadása
                </Link>

                {loading && <p>Betöltés...</p>}
                {error && <p>Hiba: {error}</p>}

                {!loading && !error && (
                    <TermekTable items={items} onActionComplete={fetchingItems} />
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}