import "./navbar.css";
import userIcon from '../../../assets/circle-user-pic.png';
import Modal from "../modal/modal";
import { useState } from "react";

export function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <nav className="appNavbar">
            <section className="navbarSection1">
                <h3>MediaHub</h3>
            </section>
            <section className="navbarSection2">
                <a><p>Bejelentkezés</p></a>
                <a onClick={() => setIsOpen(true)}><p>Regisztráció</p></a>
                <Modal open={isOpen} isClose={() => setIsOpen(false)}/>
                <p><img className="userIcon" src={userIcon} alt="user"/></p>
            </section>
        </nav>
    )
}