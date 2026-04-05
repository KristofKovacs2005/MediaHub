export default function ConfirmVissza({ isClose, onConfirm, isLate }) {
    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={isClose}>
                    X
                </button>
                <h2>Visszahozás rögzítése</h2>
                <p>
                    {isLate
                        ? "A kölcsönzés késve lett visszahozva. Rögzíted a visszahozást?"
                        : "Biztosan rögzíted, hogy a kölcsönzés visszahozás megtörtént?"}
                </p>
                <div className="modalActions">
                    <button className="btn btn-secondary" onClick={isClose}>
                        Mégse
                    </button>
                    <button className="btn btn-warning" onClick={onConfirm}>
                        Visszahozva
                    </button>
                </div>
            </div>
        </div>
    );
}
