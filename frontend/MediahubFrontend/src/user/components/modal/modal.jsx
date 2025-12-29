import {createPortal} from "react-dom";
import "./modal.css";

export default function modal({isOpen, isClose}) {
    if (!isOpen) return null;
    return createPortal(
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="modalCloseButton" onClick={isClose}>X</button>
                <h2>Regisztráció</h2>
                <form className="modalForm">
                    <label>
                        Felhasználónév:
                        <input type="text" name="username" />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" />
                    </label>
                    <label>
                        Jelszó:
                        <input type="password" name="password" />
                    </label>
                    <button type="submit">Regisztráció</button>
                </form>
            </div>
        </div>, document.getElementById("portal")
    );
}