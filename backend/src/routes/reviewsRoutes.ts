import { Router } from "express";
import verifyToken from "../middleware/auths";
import { ReviewController } from "../review/reviewController";

const router: Router = Router()
const controller: ReviewController = new ReviewController()

router.get("/reviews", controller.getReviews.bind(controller)); 
router.get("/reviews/flagged", verifyToken, controller.getFlaggedReviews.bind(controller)); //moderátor
router.delete("/reviews/:id", verifyToken, controller.deleteReview.bind(controller)) //moderátor
router.patch("/reviews/:id", verifyToken, controller.modifyReview.bind(controller))
router.post("/reviews", verifyToken, controller.insertReview.bind(controller)) // user

export default router