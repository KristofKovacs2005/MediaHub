"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usersController_1 = require("./usersController");
var auths_1 = __importDefault(require("../middleware/auths"));
var router = (0, express_1.Router)();
router.get("/users", auths_1.default, usersController_1.getUsers); //moderátor
router.get("/users/:id", auths_1.default, usersController_1.getUsersById); //moderátor v. könyvtáros
router.post("/users", usersController_1.insertUser);
router.post("/users/login", usersController_1.login);
router.patch("/users/:id", auths_1.default, usersController_1.modifyUser); //moderátor
exports.default = router;
