"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ordersController_1 = require("./ordersController");
var auths_1 = __importDefault(require("../middleware/auths"));
var router = (0, express_1.Router)();
router.get("/orders", auths_1.default, ordersController_1.getOrders); //könyvtáros
router.get("/order", auths_1.default, ordersController_1.getUserOrders); //user
router.post("/orders", auths_1.default, ordersController_1.insertOrders); //user
router.patch("/orders/:id", auths_1.default, ordersController_1.modifyOrder); //könyvtáros
exports.default = router;
