export function Comment({ commentAuthor, commentDate, commentText, commentRating }) {
    return (
        <div className="comment">
            <div className="commentHeader">
                <span className="commentAuthor">{commentAuthor}</span>
                <span className="commentDate">{commentDate}</span>
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
        </div>
    );
}
