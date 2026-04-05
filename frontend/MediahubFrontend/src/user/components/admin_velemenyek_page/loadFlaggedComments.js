import { useState, useEffect, useCallback } from "react";
import { getAuthToken } from "../../util/auth";
import { decodeBuffer } from "../../util/decoder";


export function useGetReportedReviews() {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refetch = useCallback(() => setRefreshKey((k) => k + 1), []);

    useEffect(() => {
        const token = getAuthToken();

        async function fetchReportedReviews() {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch("http://localhost:3000/reviews/flagged", {
                    method: "GET",
                    headers: {
                        "x-access-token": token,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Hiba a jelzett vélemények lekérése során");
                }

                const data = await response.json();
                setReport(data);
            } catch (err) {
                setError(err.message || "Nem sikerult betolteni a jelzett velemenyeket.");
            } finally {
                setLoading(false);
            }
        }

        fetchReportedReviews();
    }, [refreshKey]);

    return { report, loading, error, refetch };
}

export function useModifyOrder(id, orderData) {
    const [loading, setLoading] = useState(false); // betöltés állapot
    const [error, setError] = useState(null); // hiba üzenet
    const [success, setSuccess] = useState(false); // sikeres módosítás jelző
    const token = localStorage.getItem("authToken")

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
            setError(err.message || "Hiba a modositas soran"); // hiba tárolása state-be
        } finally {
            setLoading(false); // betöltés befejeződött
        }
    }

    return { modify, loading, error, success };
}