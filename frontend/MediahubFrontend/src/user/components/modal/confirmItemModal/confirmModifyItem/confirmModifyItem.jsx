export default function ConfirmModifyItem({ isClose, termek, onConfirm }) {
    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={isClose}>
                    X
                </button>
                <h2>Új Termék Hozzáadása</h2>
                <p>
                    Biztosan hozzá szeretnéd adni a(z) <strong>{termek?.i_name ||'Új'}</strong> terméket?
                </p>
                <div className="modalActions">
                    <button className="btn btn-secondary" onClick={isClose}>
                        Mégse
                    </button>
                    <button className="btn btn-success" onClick={onConfirm}>
                        Hozzáadás
                    </button>
                </div>
            </div>
        </div>
    );
}