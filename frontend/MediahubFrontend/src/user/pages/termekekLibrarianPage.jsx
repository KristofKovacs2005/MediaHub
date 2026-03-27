import { useState, useEffect, useRef } from "react";
import { fetchItems } from "../functions/items";
import TermekTable from "../components/librarian_termekek_page/termekTable";
import { Footer } from "../components/footer/footer";
import RenderNavbar from "../components/navbar/renderNavbar";
import "../components/librarian_termekek_page/termekek_page.css";
import { Link } from "react-router-dom";

export default function TermekekLibrarianPage() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const nameRef = useRef();
    const authorRef = useRef();

    const fetchingItems = async () => {
        await fetchItems({ setLoading, setError, setItems });
    };
    useEffect(() => {
        fetchingItems();
    }, []);

    const handleSearch = () => {
        const filtered = items.filter(item =>
            (!nameRef.current.value || item.i_name.toLowerCase().includes(nameRef.current.value.toLowerCase())) &&
            (!authorRef.current.value || item.author.toLowerCase().includes(authorRef.current.value.toLowerCase()))
        );
        setFilteredItems(filtered);
    };

    const handleClear = () => {
        nameRef.current.value = "";
        authorRef.current.value = "";
        setFilteredItems([]);
    };

    return (
        <div className="pageMainDiv">
            <RenderNavbar />
            <div className="pageBelowNavbar">
                <h2>Elemek kezelése</h2>

                

                {/* Search Inputs */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                    <input ref={nameRef} type="text" placeholder="Név alapján..." className="functional_cell-button" />
                    <input ref={authorRef} type="text" placeholder="Szerző/Rendező alapján..." className="functional_cell-button" />
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
                    <Link className="btn btn-success " to="/ujtermek">
                    Új termék hozzáadása
                </Link>
                </div>

                {loading && <p>Betöltés...</p>}
                {error && <p>Hiba: {error}</p>}

                {!loading && !error && (
                    <TermekTable items={filteredItems.length > 0 ? filteredItems : items} onActionComplete={fetchingItems} />
                )}
            </div>
            <Footer />
        </div>
    );
}