import { useState } from "react";
import { insertOrder } from "../../../functions/insertOrder.js";

export default function ModalOrderInsert({ isClose, termek }) {
    const [returnDate, setReturnDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 7); // default 7 days
        return date.toISOString().split("T")[0]; // yyyy-mm-dd
    });

    const handleRent = async (e) => {
        e.preventDefault();
        try {
            await insertOrder(termek.id, returnDate);
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
                <input
                    type="date"
                    value={returnDate}
                    min={new Date().toISOString().split("T")[0]} // prevent past dates
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