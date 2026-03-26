import { useState } from "react";
import Modal from "../modal/modal";
import ModalContent from "../modal/regisztralas/modalContent";
import headerImage from "../../../assets/ELTE-konyvtar.png";
import "./headerCss.css";

export function Header({ title, subtitle }) {
    const [isOpenRegisztralas, setIsOpenRegisztralas] = useState(false);
    return (
        <header
            className="header-hero"
            style={{ backgroundImage: `url(${headerImage})` }}
        >
            <div className="header-content">
                {title}

                {subtitle && (
                    <p className="header-subtitle">{subtitle}</p>
                )}
                <button
                    className="register-btn"
                    onClick={() => setIsOpenRegisztralas(true)}
                >
                    Regisztrálás
                </button>

                <Modal
                    isOpen={isOpenRegisztralas}
                    isClose={() => setIsOpenRegisztralas(false)}
                >
                    <ModalContent
                        isClose={() => setIsOpenRegisztralas(false)}
                    />
                </Modal>
            </div>
        </header>
    );
}