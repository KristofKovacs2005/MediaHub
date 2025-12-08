"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ordersController_1 = require("./ordersController");
var router = (0, express_1.Router)();
router.get("/orders", ordersController_1.getOrders);
router.post("/orders", ordersController_1.insertOrders);
router.patch("/orders/:id", ordersController_1.modifyOrder);
exports.default = router;
