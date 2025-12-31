import { Router } from "express";
import { deleteItem, getOneItem, getItem, getReviewsOfItem, insertItem, modifyItem } from "./itemsController";
import verifyToken from "../middleware/auths";

const router: Router = Router();

router.get("/items{/:name}{/:tags}", getItem);
router.get("/item/:id", getOneItem)
router.get("/item/:id/reviews", getReviewsOfItem);
router.post("/items",verifyToken, insertItem); //könyvtáros
router.delete("/items/:id", verifyToken, deleteItem); //Könyvtáros
router.patch("/items/:id", verifyToken, modifyItem) //könyvtáros


export default router;