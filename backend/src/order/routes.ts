import { Router } from "express";
import { getOrders, insertOrders, getUserOrders, modifyOrder, getAllActiveOrders } from "./ordersController"
import verifyToken from "../middleware/auths";

const router: Router = Router();

router.get("/orders", verifyToken, getOrders); //könyvtáros
router.get("/order", verifyToken, getUserOrders) //user
router.post("/orders", verifyToken, insertOrders); //user
router.patch("/orders/:id", verifyToken, modifyOrder) //könyvtáros

router.get("/orders/active/", verifyToken, getAllActiveOrders) //user

export default router;