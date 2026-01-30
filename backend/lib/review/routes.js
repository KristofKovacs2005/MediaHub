"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var reviewController_1 = require("./reviewController");
var auths_1 = __importDefault(require("../middleware/auths"));
var router = (0, express_1.Router)();
router.get("/reviews", reviewController_1.getReviews);
router.get("/reviews/flagged", auths_1.default, reviewController_1.getFlaggedReviews); //moderátor
router.delete("/reviews/:id", auths_1.default, reviewController_1.deleteReviews); //moderátor
router.patch("/reviews/:id", auths_1.default, reviewController_1.modifyReview);
router.post("/reviews", auths_1.default, reviewController_1.insertReview); // user
exports.default = router;
