// FlaggedComment.jsx
import { useState } from "react";
import three_dot from "../../../assets/dots.png";
import Modal from "../modal/modal";
import AdminActionModal from "../modal/admin_action_on_review/admin_action_modal";

export function FlaggedComment({ r_id, u_id, comment, reason, stars, onActionCompleted }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <tr className="flagged_cell-row">
            <td className="flagged_cell-cell">{u_id}</td>
            <td className="flagged_cell-cell">{comment}</td>
            <td className="flagged_cell-cell">
                {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`star ${s <= stars ? "active" : ""}`}>★</span>
                ))}
            </td>
            <td className="flagged_cell-cell">{reason}</td>
            <td className="flagged_cell-cell">
                <button
                    className="flagged_cell-button flagged_cell-button-danger"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img src={three_dot} alt="Műveletek" className="flagged_cell-icon" />
                </button>

                {isModalOpen && (
                    <Modal isOpen={isModalOpen} isClose={() => setIsModalOpen(false)}>
                        <AdminActionModal
                            r_id={r_id}
                            u_id={u_id}
                            isClose={() => {
                                setIsModalOpen(false);
                                if (onActionCompleted) onActionCompleted(); // trigger refresh
                            }}
                        />
                    </Modal>
                )}
            </td>
        </tr>
    );
}