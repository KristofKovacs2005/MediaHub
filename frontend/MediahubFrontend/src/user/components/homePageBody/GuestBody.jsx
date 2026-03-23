import { Header } from "../header/header";
import { AboutUs } from "../sections/about_us";
import {StatisticContainer} from"../charts/statistics/statisticContainer.jsx";
import { fetchItems } from "../../functions/items";
import { fetchComments } from "../../functions/getComments.js";
import { useState, useEffect } from "react";
import bookIcon from '../../../assets/illustration-of-book-icon-free-vector.jpg';
import chatIcon from "../../../assets/chat.png"

export default function GuestBody() {
    const [items, SetItems] = useState([]);
    const [comments, SetComments] = useState([]);
    useEffect(() => {
    fetchItems({ setItems: SetItems });
    fetchComments({setComments: SetComments})
    }, []);
    const statistics = [
        {
            value: items.length || '0',
            title: 'Termékek',
            color: '#3498db',
            image: bookIcon
        },{
            value: comments.length || '0',
            title: 'Értékelések',
            color: '#e74c3c',
            image: chatIcon
        }
    ];

    return (
        <div className="guest-body">
            <Header />
            <main className="body-content">
                <AboutUs/>
                <StatisticContainer stats={statistics}/>
            </main>
        </div>
    );
}