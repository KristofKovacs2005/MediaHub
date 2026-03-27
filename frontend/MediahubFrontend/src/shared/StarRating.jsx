import "./shared.css";

/**
 * StarRating
 *
 * Displays a read-only star rating. Currently used in FlaggedComment rows.
 * Extracted so any other component (item details, reviews) can reuse it.
 *
 * Props:
 *   stars {number} - Number of filled stars (e.g. 3)
 *   max   {number} - Total stars to render (default 5)
 *
 * Usage:
 *   <StarRating stars={review.stars} />
 *   <StarRating stars={4} max={10} />
 */
export default function StarRating({ stars, max = 5 }) {
    return (
        <span>
            {Array.from({ length: max }, (_, i) => (
                <span key={i} className={`shared-star ${i < stars ? "active" : ""}`}>
                    ★
                </span>
            ))}
        </span>
    );
}
