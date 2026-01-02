import { useEffect } from "react";
import "../modal.css";
import postUser from "./postUser";

export default function ModalContent({isClose}) {
    useEffect(() => {
        const handler = () => isClose && isClose();
        document.addEventListener('user-created', handler);
        return () => document.removeEventListener('user-created', handler);
    }, [isClose]);

    return(
    <div className="modalContent">
        <button className="closeButton" onClick={isClose}>X</button>
        <h2>Regisztráció</h2>
        <form className="modalForm" onSubmit={postUser}>
            <p>Hozzon létre egy új felhasználói fiókot!</p>
            <input type="text" id="username" placeholder="Felhasználónév" required />
            <input type="email" id="email" placeholder="Email cím" required />
            <input type="password" id="password" placeholder="Jelszó" required />
            <input type="password" id="confirmPassword" placeholder="Jelszó megerősítése" required />
            <button type="submit">Felhasználó létrehozása</button>
        </form>
    </div>);
}