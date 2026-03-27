import "./navbar.css";
import Modal from "../../modal/modal";
import { useState } from "react";
import ModalContent from "../../modal/regisztralas/modalContent";
import ModalBejelentkezesContent from "../../modal/bejelentekezes/modalBejelentkezesContent";
import { Link } from "react-router-dom";

export function Navbar() {
    const [isOpenRegisztralas, setIsOpenRegisztralas] = useState(false);
    const [isOpenBejelentkezes, setIsOpenBejelentkezes] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <nav className={`appNavbar ${isMobileMenuOpen ? "mobileNavOpen" : ""}`}>
            <section className="navbarSection1">
                <Link to="/" className="navLink">
                    <h3>MediaHub</h3>
                </Link>
                <button
                    className="navbarMenuToggle"
                    type="button"
                    aria-label="Menü megnyitása"
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((open) => !open)}
                >
                    <span className="navbarMenuIcon" />
                    <span className="navbarMenuIcon" />
                    <span className="navbarMenuIcon" />
                </button>
            </section>
            <section className="navbarSection2">
                <button onClick={() => {
                    setIsOpenBejelentkezes(true);
                    setIsMobileMenuOpen(false);
                }}><p>Bejelentkezés</p></button>
                <Modal isOpen={isOpenBejelentkezes} isClose={() => setIsOpenBejelentkezes(false)}>
                    <ModalBejelentkezesContent isClose={() => setIsOpenBejelentkezes(false)} />
                </Modal>

                <button onClick={() => {
                    setIsOpenRegisztralas(true);
                    setIsMobileMenuOpen(false);
                }}><p>Regisztráció</p></button>
                <Modal isOpen={isOpenRegisztralas} isClose={() => setIsOpenRegisztralas(false)}>
                    <ModalContent isClose={() => setIsOpenRegisztralas(false)} />
                </Modal>
            </section>
        </nav>
    )
}