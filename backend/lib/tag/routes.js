"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagController_1 = require("./tagController");
const router = (0, express_1.Router)();
router.get("/tags", tagController_1.getTags);
exports.default = router;
