"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsController_1 = require("./itemsController");
const auths_1 = __importDefault(require("../middleware/auths"));
const router = (0, express_1.Router)();
router.get("/items{/:name}{/:tags}", itemsController_1.getItem);
router.get("/item/:id", itemsController_1.getOneItem);
router.get("/item/:id/reviews", itemsController_1.getReviewsOfItem);
router.get("/item/:id/tags", itemsController_1.getTagsOfItem);
router.post("/items", auths_1.default, itemsController_1.insertItem); //könyvtáros
router.delete("/items/:id", auths_1.default, itemsController_1.deleteItem); //Könyvtáros
router.patch("/items/:id", auths_1.default, itemsController_1.modifyItem); //könyvtáros
exports.default = router;
