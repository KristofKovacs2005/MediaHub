import { Router } from "express";
import verifyToken from "../middleware/auths";
import { OrderController } from "../order/ordersController";

const router: Router = Router()
const controller: OrderController = new OrderController()

router.get("/orders", verifyToken, controller.getOrders.bind(controller)); //könyvtáros
router.get("/order", verifyToken, controller.getUserOrders.bind(controller)) //user
router.get("/orders/active/", verifyToken, controller.getAllActiveOrders.bind(controller)) //user
router.post("/orders", verifyToken, controller.insertOrder.bind(controller)); //user
router.patch("/orders/:id", verifyToken, controller.modifyOrder.bind(controller)) //könyvtáros


export default router