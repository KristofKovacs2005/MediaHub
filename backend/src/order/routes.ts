import { Router } from "express";
import { getOrders, insertOrders, modifyOrder } from "./ordersController"

const router: Router = Router();

router.get("/orders", getOrders);
router.post("/orders", insertOrders);
router.patch("/orders/:id", modifyOrder)

export default router;