import { useState, useEffect } from "react";
import { checkStatus, checkAuthAdminLoader } from "../../util/auth";
import { decodeBuffer } from "../../util/decoder";


export function useModifyOrder(id, orderData) {
    const [loading, setLoading] = useState(false); // betöltés állapot
    const [error, setError] = useState(null); // hiba üzenet
    const [success, setSuccess] = useState(false); // sikeres módosítás jelző
    const token = checkAuthAdminLoader(); // admin auth token lekérdezése

    /**
     * A rendelés módosítását végző aszinkron függvény
     */
    async function modify() {
        setLoading(true); // kezdődik a betöltés
        setError(null);   // előző hiba törlése
        setSuccess(false);// siker jelző nullázása

        try {
            // PATCH kérés az API végpont felé
            const response = await fetch(`http://localhost:3000/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "x-access-token": token,  // auth token
                    "Content-Type": "application/json", // JSON küldése
                },
                body: JSON.stringify(orderData), // módosítandó mezők
            });

            // ha a válasz nem OK, dobjuk a hibát
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Hiba a módosítás során");
            }

            // sikeres módosítás
            setSuccess(true);
        } catch (err) {
            console.error(err); // hibalogolás konzolra
            setError(err.message || String(err)); // hiba tárolása state-be
        } finally {
            setLoading(false); // betöltés befejeződött
        }
    }

    return { modify, loading, error, success };
}