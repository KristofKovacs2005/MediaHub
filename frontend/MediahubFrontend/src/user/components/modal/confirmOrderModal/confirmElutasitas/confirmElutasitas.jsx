export default function ConfirmElutasitas({ isClose, onConfirm }) {
    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={isClose}>
                    X
                </button>
                <h2>Kölcsönzés Elutasítása</h2>
                <p>
                    Elutasítja ezt a kölcsönzést?
                </p>
                <div className="modalActions">
                    <button className="btn btn-secondary" onClick={isClose}>
                        Mégse
                    </button>
                    <button className="btn btn-success" onClick={onConfirm}>
                        Elutasítás
                    </button>
                </div>
            </div>
        </div>
    );
}