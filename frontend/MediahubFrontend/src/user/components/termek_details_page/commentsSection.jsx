import { Comment } from "./comment";
export function CommentsSection({ comments, itemName, userHasCommented, onOpenReviewModal }) {
	// Format comments date if needed
	return (
		<section className="commentsSection">
			<div className="container-lg">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h2 className="commentsTitle mb-0">Vélemények</h2>
					<button
						className="btn btn-success"
						onClick={onOpenReviewModal}
						disabled={userHasCommented} // Disable if user has already commented
						title={userHasCommented ? "Már írtál véleményt erre az elemre" : "Írj véleményt"}
					>
						+ Új vélemény
					</button>
				</div>

				{comments && comments.length > 0 ? (
					<div className="commentsList">
						{console.log(comments)}
						{comments.map(comment => (
							<Comment
								key={comment.r_id}
								r_id={comment.r_id}
								u_id={comment.u_id}
								itemName={itemName}
								commentAuthor={comment.username || "Ismeretlen"}
								commentText={comment.comment || "Nincs szöveg"}
								commentRating={comment.stars || 0}
							/>
						))}

					</div>

				) : (
					<p className="noComments alert alert-info">Még nincsenek vélemények erre az elemre.</p>
				)}
			</div>
		</section>
	);
}
