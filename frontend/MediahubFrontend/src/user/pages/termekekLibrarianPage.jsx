import { useState, useEffect } from "react";
import { fetchItems } from "../functions/items";
import TermekTable from "../components/librarian_termekek_page/termekTable"; // renamed for PascalCase
import { Footer } from "../components/footer/footer";
import RenderNavbar from "../components/navbar/renderNavbar";
import "../components/librarian_termekek_page/termekek_page.css"

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

                <button
                    className="btn btn-success mb-3"
                    onClick={() => setIsInsertOpen(true)}
                >
                    Új termék hozzáadása
                </button>

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
