import { useState } from "react";
import { insertOrder } from "../../../functions/orders.js";

export default function ModalOrderInsert({ isClose, termekId,termek }) {
    const today = new Date().toISOString().split("T")[0];

    const [startDate, setStartDate] = useState(today);
    const [returnDate, setReturnDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 7); // default 7 days
        return date.toISOString().split("T")[0]; // yyyy-mm-dd
    });

    const handleRent = async (e) => {
        e.preventDefault();
        if (startDate > returnDate) {
            alert("A kezdő dátum nem lehet a visszahozási dátum után!");
            return;
        }
        try {
            await insertOrder(termekId, startDate, returnDate);
            alert("Sikeres kölcsönzés!");
            isClose && isClose(); // close modal
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="modalContent">
            <button className="closeButton" onClick={isClose}>X</button>
            <h2>Kölcsönzés</h2>
            <p>Meddig szeretnéd kölcsönözni a(z) <strong>{termek.name}</strong>?</p>
            <form className="modalForm" onSubmit={handleRent}>
                <label>Kezdő dátum</label>
                <input
                    type="date"
                    value={startDate}
                    min={today}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <label>Visszahozási dátum</label>
                <input
                    type="date"
                    value={returnDate}
                    min={startDate || today}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                />
                <div className="modalButtons">
                    <button type="submit">Kölcsönzés</button>
                    <button type="button" onClick={isClose}>Mégse</button>
                </div>
            </form>
        </div>
    );
}