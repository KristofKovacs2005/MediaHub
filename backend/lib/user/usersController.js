"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUsersById = getUsersById;
exports.insertUser = insertUser;
exports.login = login;
exports.modifyUser = modifyUser;
var config_1 = __importDefault(require("../config/config"));
var user_1 = __importDefault(require("./user"));
var promise_1 = __importDefault(require("mysql2/promise"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUsers(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, results, res, i, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (request.user.status != 5) {
                        response.status(401).send({ message: "bad status" });
                    }
                    return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
                case 1:
                    connection = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.query("select * from users")];
                case 3:
                    _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                    res = [];
                    for (i = 0; i < results.length; i++) {
                        res.push({
                            u_id: results[i].u_id,
                            username: results[i].username,
                            email: results[i].email,
                            status: results[i].status
                        });
                    }
                    response.status(200).send(res);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getUsersById(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, connection, _a, results, res, i, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (request.user.status != 4 || request.user.status == 5) {
                        response.status(401).send({ message: "bad status" });
                    }
                    id = parseInt(request.params.id);
                    if (isNaN(id)) {
                        response.status(400).send({ message: "Bad request" });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
                case 1:
                    connection = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.query("select * from users where u_id = ?", [id])];
                case 3:
                    _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                    res = [];
                    for (i = 0; i < results.length; i++) {
                        res.push({
                            u_id: results[i].u_id,
                            username: results[i].username,
                            email: results[i].email,
                            status: results[i].status
                        });
                    }
                    if (results.affectedRows > 0) {
                        response.status(200).send(res);
                        return [2 /*return*/];
                    }
                    response.status(404).send({ message: "Item not found" });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.log(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function insertUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var user, connection, _a, results, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!request.body) {
                        response.status(400).send({ message: "Bad request" });
                    }
                    user = new user_1.default(request.body);
                    return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
                case 1:
                    connection = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.query("insert into users values (null, ?, ?, ?, ?)", [user.username, user.email, user.password, user.status])];
                case 3:
                    _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                    if (results.affectedRows > 0) {
                        response.status(201).send({ message: "Created" });
                        return [2 /*return*/];
                    }
                    response.status(400).send({ message: "Error, probably some conflict, try with different input or whatever" });
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _b.sent();
                    console.log(error_3);
                    response.status(409).send({ message: "Valszeg valami konfliktus, gitgud, próbáld újra más adatokkal, ha továbbra sem működik, akkor írj nekem. Remélem ez segít: " + error_3 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function login(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, connection, _b, results, _c, jobbresults, token, error_4;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = request.body, email = _a.email, password = _a.password;
                    if (!(email && password)) {
                        response.status(400).send({ message: "Bad request" });
                    }
                    return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
                case 1:
                    connection = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, connection.query('SELECT login(?, ?) AS id', [email, password])];
                case 3:
                    _b = __read.apply(void 0, [_d.sent(), 1]), results = _b[0];
                    if (!results[0].id) {
                        return [2 /*return*/, response.status(401).send({ message: "email or password is incorrect" })];
                    }
                    if (!config_1.default.jwtSecret) {
                        return [2 /*return*/, response.status(400).send({ message: "Secret key error" })];
                    }
                    return [4 /*yield*/, connection.query("select * from users where u_id = ?", [results[0].id])];
                case 4:
                    _c = __read.apply(void 0, [_d.sent(), 1]), jobbresults = _c[0];
                    token = jsonwebtoken_1.default.sign({ email: jobbresults[0].email, jelszo: jobbresults[0].username, id: jobbresults[0].u_id, status: jobbresults[0].status }, config_1.default.jwtSecret, { expiresIn: "2h" });
                    console.log(jobbresults[0]);
                    return [2 /*return*/, response.status(200).send({ token: token, email: jobbresults[0].email, jelszo: jobbresults[0].username, id: jobbresults[0].u_id, status: jobbresults[0].status })];
                case 5:
                    error_4 = _d.sent();
                    console.log(error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function modifyUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, allowedFields, keys, updateString, values, sql, connection, _a, results, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (request.user.status != 5) {
                        response.status(401).send({ message: "bad status" });
                    }
                    id = parseInt(request.params.id);
                    if (isNaN(id)) {
                        response.status(400).send({ message: "Bad request" });
                        return [2 /*return*/];
                    }
                    if (!request.body) {
                        response.status(400).send({ message: "Bad request" });
                    }
                    user = new user_1.default(request.body);
                    allowedFields = ['username', 'email', 'password', 'status'];
                    keys = Object.keys(request.body).filter(function (key) { return allowedFields.includes(key); });
                    if (keys.length === 0) {
                        response.status(400).send({ error: 103, messege: "Nothing to update" });
                        return [2 /*return*/];
                    }
                    updateString = keys.map(function (key) { return "".concat(key, " = ?"); }).join(', ');
                    values = keys.map(function (key) { return user[key]; });
                    values.push(id);
                    sql = "update users set ".concat(updateString, " where u_id = ?");
                    return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
                case 1:
                    connection = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.query(sql, values)];
                case 3:
                    _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                    if (results.affectedRows > 0) {
                        response.status(201).send({ message: "Modified" });
                        return [2 /*return*/];
                    }
                    response.status(404).send({ message: "Item not found" });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _b.sent();
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
