import { useState, useEffect } from "react";
import { checkStatus, checkAuthAdminLoader } from "../../util/auth";
import { decodeBuffer } from "../../util/decoder";


export function useGetReportedReviews() {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState([]);
    const [error, setError] = useState(null);
    const status = checkStatus();
    const token = checkAuthAdminLoader();

    useEffect(() => {
        async function loadReviewsReported() {
            const url = "http://localhost:3000/reviews/flagged";
            let reports = [];
            try {
                setLoading(true);

                const reportRes = await fetch(`${url}`, {
                    headers: { "x-access-token": token },
                    method: "GET",
                });

                if (reportRes.ok) {
                    const reviewsData = await reportRes.json();
                    reports = Array.isArray(reviewsData) ? reviewsData : [];//biztosra megy hogy a komment/vélemény az egy array
                    reports = reports.map((r) => ({//végig jár a tömbön
                        ...r,
                        comment: decodeBuffer(r?.comment),//a komment/vélemény üzenetét dekodólja
                    }));
                }
            } catch (err) {//elkapott error
                console.error(err);
                setError(err.message || String(err));
            } finally {//loading befejeződött
                setLoading(false);
            }
            setReport(reports);//a bejelentett üzenetek eltárolása
        }
        if (status == 5) loadReviewsReported()
    }, [token, status]);
    return { report, loading, error };
}