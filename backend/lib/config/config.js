"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
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
    database: new DBConfig(),
    maxSize: parseInt((_a = process.env.MAX_FILE_SIZE) !== null && _a !== void 0 ? _a : "2097152"),
    baseDir: path_1.default.win32.resolve(__dirname, "../../"),
    uploadDir: (_b = process.env.UPLOAD_DIR_NAME) !== null && _b !== void 0 ? _b : "/uploads/"
};
exports.default = config;
