import { getAuthStatus } from "../../util/auth";
import { useState } from "react";
import Modal from "../modal/modal";
import ReportReviewModal from "../modal/reportReviewConfirmModal/reportReviewConfirmModal";
import AdminActionModal from "../modal/admin_action_on_review/admin_action_modal";
import three_dot from "../../../assets/dots.png";

export function Comment({ commentAuthor, commentText, commentRating, r_id, u_id, itemName, isOwnComment }) {
	const status = getAuthStatus();
	const isLoggedIn = status !== null;
	const isItAdmin = status === 5;
	const canReportComment = !isItAdmin && isLoggedIn && !isOwnComment;
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
				) : canReportComment ? (
					<button
						className="commentReport"
						onClick={() => setIsModalOpen(true)}
						title="Vélemény jelentése"
					>
						🏴
					</button>
				) : null}
			</div>

			<div className="commentBody">
				<p>{commentText}</p>

				<div className="commentStars">
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							className={`star ${star <= commentRating ? "active" : ""}`}
						>
							★
						</span>
					))}
				</div>
			</div>

			<Modal isOpen={isModalOpen} isClose={() => setIsModalOpen(false)}>
				{isItAdmin ? (
					<AdminActionModal
						r_id={r_id}
						u_id={u_id}
						isClose={() => setIsModalOpen(false)}
					/>
				) : canReportComment ? (
					<ReportReviewModal
						r_id={r_id}
						itemName={itemName}
						commentAuthor={commentAuthor}
						commentText={commentText}
						commentRating={commentRating}
						isClose={() => setIsModalOpen(false)}
					/>
				) : null}
			</Modal>
		</div>
	);
}
