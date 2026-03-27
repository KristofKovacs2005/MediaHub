import { useState, useEffect } from "react";
import { FlaggedComment } from "./FlaggedComment";
import { useGetReportedReviews } from "./loadFlaggedComments";

export default function FlaggedCommentsTable() {
    const [flaggedComments, setFlaggedComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { report: fetchedComments, loading: fetchLoading, error: fetchError, refetch } = useGetReportedReviews();

    // Fetch data on mount
    useEffect(() => {
        setLoading(true);
        setError(null);

        // If your hook already fetches automatically, we just copy the results
        if (!fetchLoading) {
            if (fetchError) {
                setError(fetchError);
                setLoading(false);
            } else {
                setFlaggedComments(fetchedComments || []);
                setLoading(false);
            }
        }

        // Optional: you can also call refetch if your hook exposes it
        // refetch();

    }, [fetchedComments, fetchLoading, fetchError]); // run when hook data changes

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p className="text-red-500">Hiba: {error}</p>;
    if (flaggedComments.length === 0) return <p>Nincsenek feljelentett vélemények.</p>;

    return (
        <div className="flagged_cell-container">
            <table className="flagged_cell-table table-auto min-w-[600px]">
                <thead>
                    <tr>
                        {["Felhasználó ID", "Vélemény", "Értékelés", "Miért lett feljelentve", "Műveletek"].map((head) => (
                            <th key={head} className="flagged_cell-cell">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {flaggedComments.map((r) => (
                        <FlaggedComment
                            key={r.r_id}
                            r_id={r.r_id}
                            u_id={r.u_id}
                            reason={r.reason}
                            username={r.u_id}
                            comment={r.comment}
                            stars={r.stars}
                            onActionCompleted={() => {
                                // Refetch after admin action (delete/restore/ban)
                                if (refetch) refetch();
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}