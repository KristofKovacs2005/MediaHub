import { useDeleteReportedReview } from "./delete_review_ban_user";
import { useBanUserForRuleBreaking } from "./delete_review_ban_user";
import { useReportedReviewToNormalReview } from "./delete_review_ban_user";

export default function AdminActionModal({ r_id, u_id, isClose }) {
    const { deleteReview } = useDeleteReportedReview();
    const { banUser } = useBanUserForRuleBreaking();
    const { modifyReview } = useReportedReviewToNormalReview()

    const handleDelete = async () => {
        try {
            await deleteReview(r_id);
            alert("Vélemény törölve!");
            isClose();
        } catch (err) {
            console.error(err);
            alert("Hiba a vélemény törlésekor!");
        }
    };

    const handleReturnToNormal = async () => {
        try {
            await modifyReview(r_id);
            alert("Vélemény visszaállítva!");
            isClose();
        } catch (err) {
            console.error(err);
            alert("Hiba a vélemény törlésekor!");
        }
    };

    const handleBan = async () => {
        try {
            await banUser(u_id);
            alert("Felhasználó felfüggesztve!");
            isClose();
        } catch (err) {
            console.error(err);
            alert("Hiba a felhasználó felfüggesztésekor!");
        }
    };

    return (
        <div className="modalContent">
            <h3>Admin műveletek</h3>
            <p>Válassz egy műveletet a véleményhez:</p>
            <div className="adminButtonGroup">
                <button className="btn btn-danger" onClick={handleDelete}>
                    Vélemény törlése
                </button>
                <button className="btn btn-success" onClick={handleReturnToNormal}>
                    Vélemény visszaállítása
                </button>
                <button className="btn btn-warning" onClick={handleBan}>
                    Felhasználó felfüggesztése
                </button>
                <button className="btn btn-secondary" onClick={isClose}>
                    Mégse
                </button>
            </div>
        </div>
    );
}
