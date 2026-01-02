import "./navbar.css";
import userIcon from '../../../assets/circle-user-pic.png';
import Modal from "../modal/modal";
import { useState } from "react";
import  ModalContent  from "../modal/regisztralas/modalContent";

export function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <nav className="appNavbar">
            <section className="navbarSection1">
                <h3>MediaHub</h3>
            </section>
            <section className="navbarSection2">
                <button><p>Bejelentkezés</p></button>
                <button onClick={() => setIsOpen(true)}><p>Regisztráció</p></button>
                <Modal isOpen={isOpen} isClose={() => setIsOpen(false)}>
                    <ModalContent isClose={() => setIsOpen(false)} />
                </Modal>
                <p><img className="userIcon" src={userIcon} alt="user"/></p>
            </section>
        </nav>
    )
}