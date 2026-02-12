import { FlaggedComment } from "./flaggedComment";
import { useGetReportedReviews } from "./loadFlaggedComments";

export default function FlaggedCommentsTable() {
    const { report: flaggedComments, loading, error } = useGetReportedReviews();
    console.log(flaggedComments)

    return (
        <div className="flagged_cell-container">

            {loading && <p>Betöltés...</p>}
            {error && <p>Hiba: {error}</p>}
            {!loading && flaggedComments.length === 0 && <p>Nincsenek jelzett vélemények.</p>}

            {flaggedComments.length > 0 && (
                <table className="flagged_cell-table table table-striped">
                    <thead>
                        <tr>
                            <th className="flagged_cell-cell">Felhasználó ID</th>
                            <th className="flagged_cell-cell">Vélemény</th>
                            <th className="flagged_cell-cell">Értékelés</th>
                            <th className="flagged_cell-cell">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flaggedComments.map((r) => (
                            <FlaggedComment
                                key={r.r_id}
                                r_id={r.r_id}
                                u_id={r.u_id}
                                username={r.u_id}
                                comment={r.comment}
                                stars={r.stars}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}