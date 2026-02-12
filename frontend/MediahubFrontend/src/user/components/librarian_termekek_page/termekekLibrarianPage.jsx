import { useState, useEffect } from "react";
import LoadItems from "../../termekek/load";
import InsertTermekModal from "../modal/termekek_handling/termekek_hozzaAdasa";
import Modal from "../modal/modal";
import TermekTable from "./termekTable"; // renamed for PascalCase
import { Footer } from "../footer/footer";
import { renderNavbar } from "../navbar/renderNavbar";
import "./termekek_page.css"

export default function TermekekLibrarianPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInsertOpen, setIsInsertOpen] = useState(false);

    // fetch items using your async function
    const fetchItems = async () => {
        await LoadItems({ setLoading, setError, setItems });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="pageMainDiv">
            {/* Navbar */}
            {renderNavbar()}

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
                    <TermekTable items={items} onActionComplete={fetchItems} />
                )}

                {/* Insert Modal */}
                {isInsertOpen && (
                    <Modal isOpen={isInsertOpen} isClose={() => setIsInsertOpen(false)}>
                        <InsertTermekModal
                            isClose={() => setIsInsertOpen(false)}
                            onSubmit={fetchItems} // reload table after insert
                        />
                    </Modal>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
