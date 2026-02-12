import { useState } from "react";
import three_dot from "../../../assets/dots.png"; // három pont ikon
import "./flaggedComments.css"
import AdminActionModal from "../modal/admin_action_on_review/admin_action_modal";
import Modal from "../modal/modal";

export function FlaggedComment({ r_id, username, comment, stars, u_id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(username)
    return (
        <tr className="flagged_cell-row">
            <td className="flagged_cell-cell">{username}</td>
            <td className="flagged_cell-cell">{comment}</td>
            <td className="flagged_cell-cell">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        className={`star ${star <= stars ? "active" : ""}`}
                    >
                        ★
                    </span>
                ))}
            </td>
            <td className="flagged_cell-cell flagged_cell-actions">
                <button
                    className="flagged_cell-button flagged_cell-button-danger"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                >
                    <img src={three_dot} alt="Műveletek" className="flagged_cell-icon" />
                </button>

                {isModalOpen && (
                    <div className="fc-modal">
                        <Modal isOpen={isModalOpen} isClose={() => setIsModalOpen(false)}>
                        <AdminActionModal
                            r_id={r_id}
                            u_id={u_id}
                            isClose={() => setIsModalOpen(false)}
                        /></Modal>
                    </div>
                )}
            </td>
        </tr>
    );
}
