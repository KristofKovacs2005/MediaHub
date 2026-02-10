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
exports.getReviews = getReviews;
exports.getFlaggedReviews = getFlaggedReviews;
exports.deleteReviews = deleteReviews;
exports.insertReview = insertReview;
exports.modifyReview = modifyReview;
const config_1 = __importDefault(require("../config/config"));
const review_1 = __importDefault(require("./review"));
const promise_1 = __importDefault(require("mysql2/promise"));
function getReviews(_request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query("select * from reviews");
            response.status(200).send(results);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getFlaggedReviews(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        if (request.user.status != 5) {
            response.status(401).send({ message: "bad status" });
        }
        try {
            const [results] = yield connection.query("select * from reviews where flagged = 1");
            response.status(200).send(results);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function deleteReviews(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
        }
        if (request.user.status != 5) {
            response.status(401).send({ message: "bad status" });
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query("delete from reviews where r_id = ?", [id]);
            if (results.affectedRows == 0) {
                response.status(404).send({ message: "Item not found" });
                return;
            }
            response.status(204).send();
        }
        catch (error) {
            console.log(error);
        }
    });
}
function insertReview(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!request.body) {
            response.status(400).send({ message: "Bad request" });
        }
        if (request.user.status != 1) {
            response.status(401).send({ message: "bad status" });
        }
        let review = new review_1.default(request.body);
        if (!review.i_id || !review.stars) {
            return response.status(400).send({ error: "Missing data" });
        }
        if (review.i_id == null || review.stars == null) {
            return response.status(400).send({ error: "Missing data" });
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query("insert into reviews values (null, ?, ?, ?, ?, ?)", [review.i_id, request.user.id, false, review.stars, review.comment]);
            if (results.affectedRows > 0) {
                response.status(201).send({ message: "Created" });
                return;
            }
            return response.status(400).send({ message: "Error, probably some conflict, try with different input or whatever" });
        }
        catch (error) {
            console.log(error);
            return response.status(400).send(error);
        }
    });
}
function modifyReview(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.user.status != 5) {
            response.status(401).send({ message: "bad status" });
        }
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
        }
        if (!request.body) {
            response.status(400).send({ message: "Bad request" });
        }
        let review = new review_1.default(request.body);
        const allowedFields = [`r_id`, `i_id`, `u_id`, `flagged`, `stars`, `comment`];
        const keys = Object.keys(request.body).filter(key => allowedFields.includes(key));
        if (keys.length === 0) {
            response.status(400).send({ error: 103, messege: "Nothing to update" });
            return;
        }
        const updateString = keys.map(key => `${key} = ?`).join(', ');
        const values = keys.map(key => review[key]);
        values.push(id);
        const sql = `update reviews set ${updateString} where r_id = ?`;
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
