import { useDeleteTermek } from "./termekek_hooks";

export default function DeleteTermekModal({ i_id, isClose, onDelete }) {
    const { deleteTermek } = useDeleteTermek();

    const handleDelete = async () => {
        if (!window.confirm("Biztosan törölni szeretnéd az elemet?")) return;

        try {
            await deleteTermek(i_id);
            alert("Elem törölve!");
            onDelete?.(); // callback to refresh table
            isClose();
        } catch (err) {
            console.error(err);
            alert("Hiba az elem törlésekor!");
        }
    };

    return (
        <div className="modalContent">
            <h3>Elem törlése</h3>
            <p>Biztosan törölni szeretnéd ezt az elemet?</p>
            <div className="adminButtonGroup">
                <button className="btn btn-danger" onClick={handleDelete}>
                    Igen, törlés
                </button>
                <button className="btn btn-secondary" onClick={isClose}>
                    Mégse
                </button>
            </div>
        </div>
    );
}
