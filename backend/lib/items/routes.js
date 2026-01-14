"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var itemsController_1 = require("./itemsController");
var auths_1 = __importDefault(require("../middleware/auths"));
var router = (0, express_1.Router)();
router.get("/items{/:name}{/:tags}", itemsController_1.getItem);
router.get("/item/:id", itemsController_1.getOneItem);
router.get("/item/:id/reviews", itemsController_1.getReviewsOfItem);
router.post("/items", auths_1.default, itemsController_1.insertItem); //könyvtáros
router.delete("/items/:id", auths_1.default, itemsController_1.deleteItem); //Könyvtáros
router.patch("/items/:id", auths_1.default, itemsController_1.modifyItem); //könyvtáros
exports.default = router;
