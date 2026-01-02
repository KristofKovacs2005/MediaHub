"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var DBConfig = /** @class */ (function () {
    function DBConfig() {
        return { host: process.env.DB_HOST, user: process.env.DB_USER, database: process.env.DATABASE };
    }
    return DBConfig;
}());
//password:process.env.DB_PASS,
var config = {
    jwtSecret: process.env.JWT_SECRET,
    database: new DBConfig()
};
exports.default = config;
