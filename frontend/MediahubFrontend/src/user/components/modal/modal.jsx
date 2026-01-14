import { createPortal } from "react-dom";
import "./modal.css";

export default function Modal({ isOpen, children, isClose }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" >
            <div className="portal-modal" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    );
}