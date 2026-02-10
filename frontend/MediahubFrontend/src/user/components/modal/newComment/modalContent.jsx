import { useState } from "react";
import "../modal.css";
import postReview from "./postReview";

export default function NewCommentModal({ isClose, itemId }) {
	const [stars, setStars] = useState(5);
	const [comment, setComment] = useState("");
	const [hoverStars, setHoverStars] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		postReview(itemId, stars, comment, isClose);
	};

	return (
		<div className="modalContent">
			<button className="closeButton" onClick={isClose}>X</button>
			<h2>Új vélemény</h2>
			<form className="modalForm" onSubmit={handleSubmit}>
				<h5>Értékelés (csillagok)</h5>
				<div className="starRating">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							className={`star ${star <= (hoverStars || stars) ? 'active' : ''}`}
							onClick={() => setStars(star)}
							onMouseEnter={() => setHoverStars(star)}
							onMouseLeave={() => setHoverStars(0)}
						>
							★
						</button>
					))}
					<span className="ratingText">{stars}/5</span>
				</div>

				<h5>Hozzászólás (nem kötelező)</h5>
				<textarea
					id="comment"
					placeholder="Írd meg véleményed..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					rows="4"
					maxLength="500"
				/>
				<span className="charCount">{comment.length}/500</span>

				<button type="submit">Vélemény beküldése</button>
			</form>
		</div>
	);
}
