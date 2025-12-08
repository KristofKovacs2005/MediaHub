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
exports.getItem = getItem;
exports.getReviewsOfItem = getReviewsOfItem;
exports.deleteItem = deleteItem;
exports.insertItem = insertItem;
exports.modifyItem = modifyItem;
var items_1 = __importDefault(require("./items"));
var config_1 = __importDefault(require("../config/config"));
var promise_1 = __importDefault(require("mysql2/promise"));
function getItem(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, tags, sql, values, tagList, i, connection, _b, results, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = request.query, name = _a.name, tags = _a.tags;
                    sql = "SELECT items.i_id, items.i_name, items.author, items.i_description, items.img_url ";
                    values = [];
                    if (tags) {
                        sql = sql + ", GROUP_CONCAT(tag.t_name ORDER BY t_name SEPARATOR ', ') AS tagek ";
                    }
                    sql = sql + "FROM items ";
                    if (tags) {
                        sql = sql + "inner join item_tag on items.i_id = item_tag.i_id INNER JOIN tag on item_tag.t_id = tag.t_id GROUP BY items.i_id, items.i_name ";
                    }
                    if (name || tags) {
                        sql = sql + "HAVING ";
                    }
                    if (name) {
                        sql = sql + "items.i_name LIKE ? ";
                        values.push(name.toString());
                    }
                    if (name && tags) {
                        sql = sql + "AND ";
                    }
                    if (tags) {
                        tagList = tags.split(',');
                        for (i = 0; i < tagList.length; i++) {
                            if (i != 0) {
                                sql = sql + "AND ";
                            }
                            sql = sql + "tagek like ?";
                            values.push("%" + tagList[i].toString() + "%");
                        }
                    }
                    sql = sql + ";";
                    return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
                case 1:
                    connection = _c.sent();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.query(sql, values)];
                case 3:
                    _b = __read.apply(void 0, [_c.sent(), 1]), results = _b[0];
                    if (results.length == 0) {
                        response.status(404).send({ message: "Item not found" });
                        return [2 /*return*/];
                    }
                    response.status(200).send(results);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getReviewsOfItem(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, connection, _a, results, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
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
                    return [4 /*yield*/, connection.query("SELECT reviews.comment, reviews.stars, users.username\n                FROM reviews \n                INNER JOIN items ON reviews.i_id = items.i_id \n                INNER JOIN users ON reviews.u_id = users.u_id\n                WHERE items.i_id = ?;", [id])];
                case 3:
                    _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                    if (results.affectedRows == 0) {
                        response.status(404).send({ message: "Item not found" });
                        return [2 /*return*/];
                    }
                    response.status(200).send(results);
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
function deleteItem(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, connection, _a, results, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
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
                    return [4 /*yield*/, connection.query("delete from items where i_id = ?", [id])];
                case 3:
                    _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                    if (results.affectedRows == 0) {
                        response.status(404).send({ message: "Item not found" });
                        return [2 /*return*/];
                    }
                    response.status(204).send();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _b.sent();
                    console.log(error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function insertItem(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var item, tags, connection, _a, results, _addTags, i, asd, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!request.body) {
                        response.status(400).send({ message: "Bad request" });
                    }
                    item = new items_1.default(request.body);
                    if (request.body.tags) {
                        tags = request.body.tags.split(",");
                    }
                    return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
                case 1:
                    connection = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, , 9]);
                    return [4 /*yield*/, connection.query("insert into items values (null, ?, ?, ?, ?)", [item.author, item.i_name, item.img_url, item.i_description])];
                case 3:
                    _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                    _addTags = void 0;
                    i = 0;
                    _b.label = 4;
                case 4:
                    if (!(i < tags.length)) return [3 /*break*/, 7];
                    asd = [];
                    asd.push(results.insertId);
                    asd.push(tags[i]);
                    return [4 /*yield*/, connection.query("insert into item_tag values(?, ?)", asd)];
                case 5:
                    _addTags = _b.sent();
                    _b.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7:
                    if (results.affectedRows > 0) {
                        response.status(201).send({ message: "Created" });
                        return [2 /*return*/];
                    }
                    response.status(400).send({ message: "Error, probably some conflict, try with different inputs or whatever" });
                    return [3 /*break*/, 9];
                case 8:
                    error_4 = _b.sent();
                    console.log(error_4);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function modifyItem(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, item, allowedFields, keys, updateString, i, values, tags, i, sql, connection, _a, results, i, asd, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = parseInt(request.params.id);
                    if (isNaN(id)) {
                        response.status(400).send({ message: "Bad request" });
                        return [2 /*return*/];
                    }
                    if (!request.body) {
                        response.status(400).send({ message: "Bad request" });
                    }
                    item = new items_1.default(request.body);
                    allowedFields = ['author', 'i_name', 'img_url', 'i_description', 'tags'];
                    keys = Object.keys(request.body).filter(function (key) { return allowedFields.includes(key); });
                    if (keys.length === 0) {
                        response.status(400).send({ error: 103, messege: "Nothing to update" });
                        return [2 /*return*/];
                    }
                    updateString = "";
                    for (i = 0; i < keys.length; i++) {
                        if (keys[i] != "tags") {
                            updateString += keys[i] + " = ?";
                        }
                        if (keys[i] != keys[keys.length - 1] && keys[i] != keys[keys.length - 2]) {
                            updateString += ", ";
                        }
                    }
                    values = keys.map(function (key) { return item[key]; });
                    for (i = 0; i < keys.length; i++) {
                        if (keys[i] == "tags") {
                            tags = values.pop();
                        }
                    }
                    values.push(id);
                    sql = "update items set ".concat(updateString, " where i_id = ?");
                    tags = tags.split(',');
                    return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
                case 1:
                    connection = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 9, , 10]);
                    return [4 /*yield*/, connection.query(sql, values)];
                case 3:
                    _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                    return [4 /*yield*/, connection.query("delete from item_tag where i_id = ?", [id])];
                case 4:
                    _b.sent();
                    i = 0;
                    _b.label = 5;
                case 5:
                    if (!(i < tags.length)) return [3 /*break*/, 8];
                    asd = [id];
                    asd.push(tags[i]);
                    return [4 /*yield*/, connection.query("insert into item_tag values (?, ?)", asd)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (results.affectedRows > 0) {
                        response.status(201).send({ message: "Modified" });
                        return [2 /*return*/];
                    }
                    response.status(404).send({ message: "Item not found" });
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _b.sent();
                    console.log(err_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
