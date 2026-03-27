import { Header } from "../header/header";
import { AboutUs } from "../sections/about_us";
import TermekCard from "../carouselCards/termekCard";
import { fetchItems } from "../../functions/items";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderText from "../header/headerTextGuest.jsx"
import "./GuestBody.css"

export default function GuestBody() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItems({ setLoading, setItems, setError });
    }, []);

    const previewItems = items.slice(0, 8);
    const rollingItems = [...previewItems, ...previewItems];

    return (
    <div className="guest-body">
        
        {/* ✅ FULL WIDTH HERO */}
        <Header 
            title={<HeaderText/>}
        />
        <div className="section-divider"></div>
        <main className="body-content">
            <AboutUs />

            <section className="guest-preview-section">
                <div className="guest-preview-header">
                    <div>
                        <p className="guest-preview-kicker">Böngészés vendégként</p>
                        <h2>Könyvek és filmek</h2>
                        <p className="guest-preview-text">
                            Nézz körül a kínálatban bejelentkezés nélkül is. Ha találsz valamit, ami érdekel,
                            belépés után már kölcsönözhetsz és véleményt is írhatsz.
                        </p>
                    </div>
                    <Link to="/termekek" className="guest-preview-link">
                        Összes termék megtekintése
                    </Link>
                </div>

                {loading && <p className="guest-preview-feedback">Betöltés...</p>}
                {!loading && error && <p className="guest-preview-feedback">Hiba: {error}</p>}

                {!loading && !error && previewItems.length > 0 && (
                    <div className="guest-preview-viewport">
                        <div className="guest-preview-track">
                            {rollingItems.map((item, index) => (
                                <div className="guest-preview-card" key={`${item.i_id}-${index}`}>
                                    <TermekCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </main>
    </div>
);
}