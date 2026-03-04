import { Router } from "express";
import verifyToken from "../middleware/auths";
import { ItemController } from "../items/itemsController";

const router: Router = Router();
const controller: ItemController = new ItemController

router.get("/items{/:name}{/:tags}{/:author}", controller.getItem.bind(controller));
router.get("/item/:id", controller.getOneItem.bind(controller))
router.get("/item/:id/reviews", controller.getReviewsOfItem.bind(controller));
router.get("/item/:id/tags", controller.getTagsOfItem.bind(controller));
router.post("/items", verifyToken, controller.insertItem.bind(controller));
router.delete("/items/:id", verifyToken, controller.deleteItem.bind(controller)); //Könyvtáros
router.patch("/items/:id", verifyToken, controller.modifyItem.bind(controller)) //könyvtáros


export default router