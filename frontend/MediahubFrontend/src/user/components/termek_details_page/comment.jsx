import { checkStatus } from "../../util/auth";
import { useState } from "react";
import Modal from "../modal/modal";
import ReportReviewModal from "../modal/reportReviewConfirmModal/reportReviewConfirmModal";
import AdminActionModal from "../modal/admin_action_on_review/admin_action_modal";
import three_dot from "../../../assets/dots.png"

export function Comment({ commentAuthor, commentText, commentRating, r_id, u_id }) {

	const isItAdmin = checkStatus() == 5;
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<div className="comment">

			<div className="commentHeader">
				<span className="commentAuthor">{commentAuthor}</span>

				{isItAdmin ? (
					<button
						className="btn btn-danger"
						onClick={() => setIsModalOpen(true)}
					>
						<img src={three_dot} alt="Műveletek" className="flagged_cell-icon" />
					</button>
				) : (
					<button
						className="commentReport"
						onClick={() => setIsModalOpen(true)}
					>
						🏴
					</button>
				)}
			</div>

			<div className="commentBody">
				<p>{commentText}</p>

				<div className="commentStars">
					{[1,2,3,4,5].map(star => (
						<span
							key={star}
							className={`star ${star <= commentRating ? "active" : ""}`}
						>
							★
						</span>
					))}
				</div>
			</div>

			{/* Modal tied to THIS comment */}
			<Modal
				isOpen={isModalOpen}
				isClose={() => setIsModalOpen(false)}
			>
                {isItAdmin ? (
					<AdminActionModal
						r_id={r_id}
						u_id={u_id} // user ID for banning
						isClose={() => setIsModalOpen(false)}
					/>
				) : (
				<ReportReviewModal
					r_id={r_id}
					isClose={() => setIsModalOpen(false)}
				/>)}
			</Modal>

		</div>
	);
}
