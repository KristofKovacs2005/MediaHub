import { Comment } from './Comment.jsx';

export function CommentsSection({ comments, onOpenReviewModal }) {
  return (
    <section className="commentsSection">
      <div className="container-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="commentsTitle mb-0">Vélemények</h2>
          {onOpenReviewModal && (
            <button className="btn btn-success" onClick={onOpenReviewModal}>
              + Új vélemény
            </button>
          )}
        </div>

        {comments && comments.length > 0 ? (
          <div className="commentsList">
            {comments.map(comment => (
              <Comment
                key={comment.r_id}
                r_id={comment.r_id}
                u_id={comment.u_id}
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
