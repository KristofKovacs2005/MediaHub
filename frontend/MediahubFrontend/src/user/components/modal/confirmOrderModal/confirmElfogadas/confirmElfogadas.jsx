export default function ConfirmElfogadas({ isClose, onConfirm }) {
    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={isClose}>
                    X
                </button>
                <h2>Kölcsönzés elfogadása</h2>
                <p>
                    Biztosan elfogadja ezt a kölcsönzést?
                </p>
                <div className="modalActions">
                    <button className="btn btn-secondary" onClick={isClose}>
                        Mégse
                    </button>
                    <button className="btn btn-success" onClick={onConfirm}>
                        Elfogadás
                    </button>
                </div>
            </div>
        </div>
    );
}