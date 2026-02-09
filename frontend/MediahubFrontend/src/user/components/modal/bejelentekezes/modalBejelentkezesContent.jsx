import { useEffect } from "react";
import { handleLogIn } from "./loginUser";

export default function ModalBejelentkezesContent({isClose}) {
    useEffect(() => {
        const handler = () => isClose && isClose();
        document.addEventListener('user-loged-in', handler);
        return () => document.removeEventListener('user-loged-in', handler);
    }, [isClose]);
    return(
    <div className="modalContent">
        <button className="closeButton" onClick={isClose}>X</button>
        <h2>Bejelentkezés</h2>
        <form className="modalForm" onSubmit={handleLogIn}>
            <p>Jelentkezzen be a felhasználói fiókjába!</p>
            <input type="text" id="logInUser" placeholder="Email cím" required />
            <input type="password" id="logInPassword" placeholder="Jelszó" required />
            <button type="submit">Bejelentkezés</button>
        </form>
    </div>);
}