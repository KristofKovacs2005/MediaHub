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
exports.getUsers = getUsers;
exports.getUsersById = getUsersById;
exports.insertUser = insertUser;
exports.login = login;
exports.modifyUser = modifyUser;
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("./user"));
const promise_1 = __importDefault(require("mysql2/promise"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUsers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.user.status != 5) {
            response.status(401).send({ message: "bad status" });
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query("select * from users");
            let res = [];
            for (let i = 0; i < results.length; i++) {
                res.push({
                    u_id: results[i].u_id,
                    username: results[i].username,
                    email: results[i].email,
                    status: results[i].status
                });
            }
            response.status(200).send(res);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getUsersById(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.user.status != 4 || request.user.status == 5) {
            response.status(401).send({ message: "bad status" });
        }
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
            return;
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query("select * from users where u_id = ?", [id]);
            let res = [];
            for (let i = 0; i < results.length; i++) {
                res.push({
                    u_id: results[i].u_id,
                    username: results[i].username,
                    email: results[i].email,
                    status: results[i].status
                });
            }
            if (results.affectedRows > 0) {
                response.status(200).send(res);
                return;
            }
            response.status(404).send({ message: "Item not found" });
        }
        catch (error) {
            console.log(error);
        }
    });
}
function insertUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!request.body) {
            response.status(400).send({ message: "Bad request" });
        }
        let user = new user_1.default(request.body);
        if (!user.username || !user.email || !user.password || !user.status) {
            return response.status(400).send({ error: "Missing data" });
        }
        if (user.username == "" || user.email == "" || user.password == "" || user.status == null) {
            return response.status(400).send({ error: "Missing data" });
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query("insert into users values (null, ?, ?, ?, ?)", [user.username, user.email, user.password, user.status]);
            if (results.affectedRows > 0) {
                response.status(201).send({ message: "Created" });
                return;
            }
            response.status(400).send({ message: "Error, probably some conflict, try with different input or whatever" });
        }
        catch (error) {
            console.log(error);
            response.status(409).send({ message: "Valszeg valami konfliktus, gitgud, próbáld újra más adatokkal, ha továbbra sem működik, akkor írj nekem. Remélem ez segít: " + error });
        }
        return;
    });
}
function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = request.body;
        if (!(email && password)) {
            response.status(400).send({ message: "Bad request" });
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query('SELECT login(?, ?) AS id', [email, password]);
            if (!results[0].id) {
                return response.status(401).send({ message: "email or password is incorrect" });
            }
            if (!config_1.default.jwtSecret) {
                return response.status(400).send({ message: "Secret key error" });
            }
            const [jobbresults] = yield connection.query("select * from users where u_id = ?", [results[0].id]);
            const token = jsonwebtoken_1.default.sign({ username: jobbresults[0].username, email: jobbresults[0].email, id: jobbresults[0].u_id, status: jobbresults[0].status }, config_1.default.jwtSecret, { expiresIn: "2h" });
            console.log(jobbresults[0]);
            return response.status(200).send({ token: token, status: jobbresults[0].status, username: jobbresults[0].username });
        }
        catch (error) {
            console.log(error);
        }
        return;
    });
}
function modifyUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.user.status != 5) {
            response.status(401).send({ message: "bad status" });
        }
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
            return;
        }
        if (!request.body) {
            response.status(400).send({ message: "Bad request" });
        }
        let user = new user_1.default(request.body);
        const allowedFields = ['username', 'email', 'password', 'status'];
        const keys = Object.keys(request.body).filter(key => allowedFields.includes(key));
        if (keys.length === 0) {
            response.status(400).send({ error: 103, messege: "Nothing to update" });
            return;
        }
        const updateString = keys.map(key => `${key} = ?`).join(', ');
        const values = keys.map(key => user[key]);
        values.push(id);
        const sql = `update users set ${updateString} where u_id = ?`;
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
