import { useEffect, useState } from "react";
import "../modal.css";
import postUser from "./postUser";
import MediaHubTerms from "../EULA/EULA.JSX";
import Modal from "../modal.jsx";

export default function ModalContent({isClose}) {
    const [isOpenEula, setIsOpenEula] = useState(false);

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
            <h5>Felhasználónév</h5>
            <input type="text" id="username" placeholder="Felhasználónév" required />
            <h5>Email cím</h5>
            <input type="email" id="email" placeholder="Email cím" required />
            <h5>Jelszó</h5>
            <input type="password" id="password" placeholder="Jelszó" required />
            <h5>Jelszó megerősítése</h5>
            <input type="password" id="confirmPassword" placeholder="Jelszó megerősítése" required />
            <div>
            <input type="checkbox" id="terms" required style={{ marginRight: "8px" }}/>
            
            <label htmlFor="terms">Elolvastam és elfogadom a <a onClick={() => setIsOpenEula(true)} rel="noopener noreferrer">felhasználási feltételeket.</a></label>
            <Modal isOpen={isOpenEula} isClose={() => setIsOpenEula(false)}>
                <MediaHubTerms isClose={() => setIsOpenEula(false)} />
            </Modal>
            </div>
            <button type="submit">Felhasználó létrehozása</button>
        </form>
    </div>);
}