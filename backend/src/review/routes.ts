import { Router } from "express";
import { getReviews, getFlaggedReviews, deleteReviews, insertReview } from "./reviewController"

const router: Router = Router();

router.get("/reviews", getReviews);
router.get("/reviews/flagged", getFlaggedReviews);
router.delete("/reviews/:id", deleteReviews)
router.post("/reviews", insertReview)

export default router;