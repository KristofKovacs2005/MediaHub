import { useDeleteReportedReview } from "./delete_review_ban_user";
import { useBanUserForRuleBreaking } from "./delete_review_ban_user";
import { useReportedReviewToNormalReview } from "./delete_review_ban_user";
import "./AdminActionModal.css"; // import CSS file

export default function AdminActionModal({ r_id, u_id, isClose }) {
    const { deleteReview } = useDeleteReportedReview();
    const { banUser } = useBanUserForRuleBreaking();
    const { modifyReview } = useReportedReviewToNormalReview();

    const handleDelete = async () => {
        try {
            await deleteReview(r_id);
            alert("Vélemény törölve!");
            isClose();
        } catch (err) {
            alert("Hiba a vélemény törlésekor!");
        }
    };

    const handleReturnToNormal = async () => {
        try {
            await modifyReview(r_id);
            alert("Vélemény visszaállítva!");
            isClose();
        } catch (err) {
            alert("Hiba a vélemény visszaállítása során!");
        }
    };

    const handleBan = async () => {
        try {
            await banUser(u_id);
            alert("Felhasználó felfüggesztve!");
            isClose();
        } catch (err) {
            alert("Hiba a felhasználó felfüggesztésekor!");
        }
    };

    return (
        <div className="modalContentAdminCom">
            <h3 className="modalTitle">Admin műveletek</h3>
            <p className="modalSubtitle">Válassz egy műveletet a véleményhez:</p>
            <div className="adminButtonGroup">
                <button className="btn btn-delete" onClick={handleDelete}>
                    Vélemény törlése
                </button>
                <button className="btn btn-restore" onClick={handleReturnToNormal}>
                    Vélemény visszaállítása
                </button>
                <button className="btn btn-ban" onClick={handleBan}>
                    Felhasználó felfüggesztése
                </button>
                <button className="btn btn-cancel" onClick={isClose}>
                    Mégse
                </button>
            </div>
        </div>
    );
}