import { handleDeleteItem } from "../../../functions/items";

export default function ConfirmDeleteItem({i_id, isClose, onConfirm}){
    const handleDelete = async () => {
        try {
            await handleDeleteItem(i_id);
            alert("Item törölve!");
            isClose();
        } catch (err) {
            console.error(err);
            alert("Hiba a vélemény törlésekor!");
        }
    };
    return (
        <div className="modalContent">
            <button className="closeButton" onClick={isClose}>
                    X
            </button>
            <h3>Biztosan tőrli a terméket?</h3>
            <div className="adminButtonGroup">
                <button className="btn btn-danger" onClick={()=>{handleDelete, onConfirm}}>
                    Termék törlése
                </button>
                <button className="btn btn-secondary" onClick={isClose}>
                    Mégse
                </button>
            </div>
        </div>
    );
}