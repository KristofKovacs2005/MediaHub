import { Router } from "express";
import { deleteItem, getItem, getReviewsOfItem, insertItem, modifyItem } from "./itemsController";

const router: Router = Router();

router.get("/items{/:name}{/:tags}", getItem);
router.get("/item/:id/reviews", getReviewsOfItem);
router.post("/items", insertItem);
router.delete("/items/:id", deleteItem);
router.patch("/items/:id", modifyItem)


export default router;