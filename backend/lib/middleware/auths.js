"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
function verifyToken(req, res, next) {
    var _a, _b, _c;
    var token = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.query) === null || _b === void 0 ? void 0 : _b.token) || ((_c = req.headers) === null || _c === void 0 ? void 0 : _c['x-access-token']);
    if (!token) {
        return res.status(403).send("Token kell");
    }
    try {
        if (!config_1.default.jwtSecret) {
            return res.status(403).send("Hiba van a titkos kulccsal");
        }
        var decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.user = decodedToken;
        return next();
    }
    catch (error) {
        console.log(error);
    }
    res.status(401).send("Nem sikerült az autentikáció.");
}
exports.default = verifyToken;
