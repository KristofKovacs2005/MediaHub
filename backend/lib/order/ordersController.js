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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = getOrders;
exports.getUserOrders = getUserOrders;
exports.insertOrders = insertOrders;
exports.modifyOrder = modifyOrder;
const order_1 = __importDefault(require("./order"));
const config_1 = __importDefault(require("../config/config"));
const promise_1 = __importDefault(require("mysql2/promise"));
function getOrders(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        if (request.user.status != 4) {
            response.status(401).send({ message: "bad status" });
        }
        try {
            const [results] = yield connection.query("select * from orders");
            response.status(200).send(results);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getUserOrders(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        if (request.user.status != 1) {
            response.status(401).send({ message: "bad status" });
        }
        try {
            const [results] = yield connection.query("select * from orders where u_id = ?", [request.user.id]);
            response.status(200).send(results);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function insertOrders(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!request.body) {
            response.status(400).send({ message: "Bad request" });
        }
        if (request.user.status != 1) {
            response.status(401).send({ message: "bad status" });
        }
        let order = new order_1.default(request.body);
        if (!order.s_id || !order.u_id || !order.p_id) {
            return response.status(400).send({ error: "Missing data" });
        }
        if (order.s_id == null || order.u_id == null || order.p_id == null || !order.date || !order.return_date) {
            return response.status(400).send({ error: "Missing data" });
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query("insert into orders values (null, ?, ?, ?, ?, ?)", [order.s_id, order.u_id, order.p_id, new Date(order.date), new Date(order.return_date)]);
            if (results.affectedRows > 0) {
                response.status(201).send({ message: "Created" });
                return;
            }
            response.status(400).send({ message: "Error, probably some conflict, try with different input or whatever" });
        }
        catch (error) {
            console.log(error);
            return response.status(400).send(error);
        }
        return;
    });
}
function modifyOrder(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
        }
        if (!request.body) {
            response.status(400).send({ message: "Bad request" });
        }
        if (request.user.status != 4) {
            response.status(401).send({ message: "bad status" });
        }
        let order = new order_1.default(request.body);
        const allowedFields = ['o_id', 's_id', 'u_id', 'p_id', 'date', 'return_date'];
        const keys = Object.keys(request.body).filter(key => allowedFields.includes(key));
        if (keys.length === 0) {
            response.status(400).send({ error: 103, messege: "Nothing to update" });
            return;
        }
        const updateString = keys.map(key => `${key} = ?`).join(', ');
        const values = keys.map(key => order[key]);
        values.push(id);
        const sql = `update orders set ${updateString} where o_id = ?`;
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query(sql, values);
            if (results.affectedRows > 0) {
                response.status(201).send({ message: "Modified" });
                return;
            }
            response.status(404).send({ message: "Item not found" });
        }
        catch (err) {
            console.log(err);
        }
    });
}
