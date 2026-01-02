import "./navbar.css";
import userIcon from '../../../assets/circle-user-pic.png';
import Modal from "../modal/modal";
import { useState } from "react";
import  ModalContent  from "../modal/regisztralas/modalContent";
import ModalBejelentkezesContent from "../modal/bejelentekezes/modalBejelentkezesContent";

export function Navbar(){
    const [isOpenRegisztralas, setIsOpenRegisztralas] = useState(false);
    const [isOpenBejelentkezes, setIsOpenBejelentkezes] = useState(false);
    return(
        <nav className="appNavbar">
            <section className="navbarSection1">
                <h3>MediaHub</h3>
            </section>
            <section className="navbarSection2">
                <button onClick={() => setIsOpenBejelentkezes(true)}><p>Bejelentkezés</p></button>
                <Modal isOpen={isOpenBejelentkezes} isClose={() => setIsOpenBejelentkezes(false)}>
                    <ModalBejelentkezesContent isClose={() => setIsOpenBejelentkezes(false)} />
                </Modal>

                <button onClick={() => setIsOpenRegisztralas(true)}><p>Regisztráció</p></button>
                <Modal isOpen={isOpenRegisztralas} isClose={() => setIsOpenRegisztralas(false)}>
                    <ModalContent isClose={() => setIsOpenRegisztralas(false)} />
                </Modal>
                <p><img className="userIcon" src={userIcon} alt="user"/></p>
            </section>
        </nav>
    )
}