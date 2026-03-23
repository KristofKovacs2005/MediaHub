import { useState, useEffect } from "react";
import { fetchItems } from "../../functions/items";
import InsertTermekModal from "../modal/termekek_handling/termekek_hozzaAdasa";
import Modal from "../modal/modal";
import TermekTable from "./termekTable"; // renamed for PascalCase
import { Footer } from "../footer/footer";
import RenderNavbar from "../navbar/renderNavbar";
import "./termekek_page.css"

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

                {/* Insert Modal */}
                {isInsertOpen && (
                    <Modal isOpen={isInsertOpen} isClose={() => setIsInsertOpen(false)}>
                        <InsertTermekModal
                            isClose={() => setIsInsertOpen(false)}
                            onSubmit={fetchingItems} // reload table after insert
                        />
                    </Modal>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
