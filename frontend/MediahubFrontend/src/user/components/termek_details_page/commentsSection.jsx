import { Comment } from "./comment";

export function CommentsSection({ comments, itemId, onOpenReviewModal }) {
	// Format comments date if needed
	const formatDate = (date) => {
		if (!date) return "";
		if (typeof date === "string") return date;
		return new Date(date).toLocaleDateString("hu-HU");
	};

	return (
		<section className="commentsSection">
			<div className="container-lg">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h2 className="commentsTitle mb-0">Vélemények</h2>
					<button 
						className="btn btn-success"
						onClick={onOpenReviewModal}
					>
						+ Új vélemény
					</button>
				</div>

				{comments && comments.length > 0 ? (
					<div className="commentsList">
						{comments.map((comment) => (
							<Comment
								key={comment.review_id || Math.random()}
								commentAuthor={comment.user_name || "Ismeretlen"}
								commentDate={formatDate(comment.review_date)}
								commentText={comment.review_text || "Nincs szöveg"}
								commentRating={comment.review_rating || 0}
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
