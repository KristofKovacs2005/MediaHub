import { useState } from "react";
import { sendEmailForReporting } from "../../emailJS/sendEmail";
import modifyReviewToFlagged from "./modifyReviewToFlagged";

export default function ReportReviewModal({ isClose, r_id, itemName, commentAuthor, commentText, commentRating }) {
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

	const handleConfirm = async () => {
		const trimmedReason = reason.trim();

		if (!trimmedReason) {
			alert("Adj meg egy indokot a jelentéshez.");
			return;
		}

		setIsSubmitting(true);
		const wasUpdated = await modifyReviewToFlagged(r_id, trimmedReason);

		if (wasUpdated) {
			await sendEmailForReporting({
				user_name: commentAuthor,
				item_name: itemName,
				stars: commentRating,
				comment: commentText,
				reason: trimmedReason,
			});
		}

		setIsSubmitting(false);
		if (!wasUpdated) {
			return;
		}
		isClose();
	};

	return (
		<div className="modalContent">

			<h2>Vélemény jelentése</h2>
			<p>Biztos jelenteni szeretnéd ezt a véleményt?</p>
			<textarea
				className="form-control mb-3"
				rows={4}
				placeholder="Miért jelenteted ezt a véleményt?"
				value={reason}
				onChange={(e) => setReason(e.target.value)}
			/>

			<div className="modalActions">

				<button onClick={isClose}>
					Mégsem
				</button>

				<button onClick={handleConfirm} disabled={isSubmitting}>
					Igen
				</button>

			</div>

		</div>
	);
}