import modifyReviewToFlagged from "./modifyReviewToFlagged";

export default function ReportReviewModal({ isClose, r_id }) {

	const handleConfirm = async () => {
		await modifyReviewToFlagged(r_id);
		isClose();
	};

	return (
		<div className="modalContent">

			<h2>Vélemény jelentése</h2>
			<p>Biztos jelenteni szeretnéd ezt a véleményt?</p>

			<div className="modalActions">

				<button onClick={isClose}>
					Mégsem
				</button>

				<button onClick={handleConfirm}>
					Igen
				</button>

			</div>

		</div>
	);
}