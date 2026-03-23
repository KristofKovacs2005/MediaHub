import { Header } from "../header/header";
import { AboutUs } from "../sections/about_us";
import { StatisticContainer } from "../charts/statistics/statisticContainer.jsx";
import { fetchItems } from "../../functions/items";
import { fetchComments } from "../../functions/getComments.js";
import { useState, useEffect } from "react";
import bookIcon from '../../../assets/illustration-of-book-icon-free-vector.jpg';
import chatIcon from "../../../assets/chat.png";
import { HeaderText } from "../header/headerText.jsx";

export default function GuestBody() {
    const [items, setItems] = useState([]);       // lowercase setter
    const [comments, setComments] = useState([]); // lowercase setter
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetchItems({ setItems, setLoading, setError });
        fetchComments(setComments); // pass the setter directly

    }, []);

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p>{error}</p>;

    const statistics = [
        {
            value: items.length || '0',
            title: 'Termékek',
            color: '#3498db',
            image: bookIcon
        },
        {
            value: comments.length || '0',
            title: 'Értékelések',
            color: '#e74c3c',
            image: chatIcon
        }
    ];

    return (
        <div className="guest-body">
            <Header title={<HeaderText/>} subtitle={"Nincs még fiókód?"}/>
            <main className="body-content">
                <AboutUs />
                <StatisticContainer stats={statistics} />
            </main>
        </div>
    );
}