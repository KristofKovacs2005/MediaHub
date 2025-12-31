import { Router } from "express";
import { getReviews, getFlaggedReviews, deleteReviews, insertReview } from "./reviewController"
import verifyToken from "../middleware/auths";

const router: Router = Router();

router.get("/reviews", getReviews); //ez annyira nem is kell
router.get("/reviews/flagged", verifyToken, getFlaggedReviews); //moderátor
router.delete("/reviews/:id", verifyToken, deleteReviews) //moderátor
router.post("/reviews", verifyToken, insertReview) // user

export default router;