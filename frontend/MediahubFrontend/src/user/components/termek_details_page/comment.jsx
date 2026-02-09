export function Comment({ commentAuthor, commentDate, commentText, commentRating }) {
    return (
        <div className="comment">
            <div className="commentHeader">
                <span className="commentAuthor">{commentAuthor}</span>
                <span className="commentDate">{commentDate}</span>
            </div>
            <div className="commentBody">
                <p>{commentText}</p>
                <span className="commentRating">Értékelés: {commentRating}/5</span>
            </div>
        </div>
    );
}
