"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tagController_1 = require("./tagController");
var router = (0, express_1.Router)();
router.get("/tags", tagController_1.getTags);
exports.default = router;
