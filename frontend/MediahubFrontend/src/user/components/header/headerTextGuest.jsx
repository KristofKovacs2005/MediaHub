import "./headerCss.css"
import { useState } from "react";
import Modal from "../modal/modal";
import ModalContent from "../modal/regisztralas/modalContent";

export default function HeaderText() {
    const [isOpenRegisztralas, setIsOpenRegisztralas] = useState(false);
    return (
        <div
            className="header-hero"
        >
            <div className="header-content">
                <h1 className="header-title">
                    Üdvözlünk a MediaHubon!
                </h1>

                <p className="header-subtitle">
                    Fedezd fel könyveink, filmjeink és egyéb médiatartalmaink széles választékát.
                    Kölcsönözz, értékelj és oszd meg véleményed a közösséggel!
                </p>

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
        </div>
    );
}