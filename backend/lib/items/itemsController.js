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
exports.getItem = getItem;
exports.getOneItem = getOneItem;
exports.getReviewsOfItem = getReviewsOfItem;
exports.deleteItem = deleteItem;
exports.insertItem = insertItem;
exports.modifyItem = modifyItem;
const items_1 = __importDefault(require("./items"));
const config_1 = __importDefault(require("../config/config"));
const promise_1 = __importDefault(require("mysql2/promise"));
const upload_1 = require("../middleware/upload");
function getItem(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, tags } = request.query;
        let sql = "SELECT items.i_id, items.i_name, items.author, items.i_description, items.img_url ";
        let values = [];
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
        let tagList;
        if (tags) {
            tagList = tags.split(',');
            for (let i = 0; i < tagList.length; i++) {
                if (i != 0) {
                    sql = sql + "AND ";
                }
                sql = sql + "tagek like ?";
                values.push("%" + tagList[i].toString() + "%");
            }
        }
        sql = sql + ";";
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query(sql, values);
            if (results.length == 0) {
                response.status(404).send({ message: "Item not found" });
                return;
            }
            response.status(200).send(results);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getOneItem(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
            return;
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query("select * from items where i_id = ?", [id]);
            if (results.length > 0) {
                response.status(200).send(results);
                return;
            }
            response.status(404).send({ message: "Item not found" });
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getReviewsOfItem(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
            return;
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            const [results] = yield connection.query(`SELECT reviews.comment, reviews.stars, users.username
                FROM reviews 
                INNER JOIN items ON reviews.i_id = items.i_id 
                INNER JOIN users ON reviews.u_id = users.u_id
                WHERE items.i_id = ?;`, [id]);
            if (results.affectedRows == 0) {
                response.status(404).send({ message: "Item not found" });
                return;
            }
            response.status(200).send(results);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function deleteItem(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.user.status != 4) {
            response.status(401).send({ message: "bad status" });
        }
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
            return;
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            yield connection.query("START TRANSACTION;");
            const [results] = yield connection.query("delete from items where i_id = ?", [id]);
            if (results.affectedRows == 0) {
                response.status(404).send({ message: "Item not found" });
                return;
            }
            yield connection.query("delete from item_tag where i_id = ?;", [id]);
            yield connection.query("COMMIT;");
            response.status(204).send();
        }
        catch (error) {
            console.log(error);
        }
    });
}
function insertItem(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, upload_1.uploadMiddleware)(request, response);
        if (!request.body) {
            return response.status(400).send({ message: "Bad request" });
        }
        if (!request.file) {
            return response.status(400).send({ message: "No picture found" });
        }
        if (request.user.status != 4) {
            return response.status(401).send({ message: "bad status" });
        }
        let item = new items_1.default(request.body);
        const img_url = "/uploads/" + request.file.filename;
        if (item.i_name == "" || !item.i_name || !item.author || item.author == "" || !item.i_description || item.i_description == "") {
            return response.status(400).send({ error: "Missing data" });
        }
        let tags;
        if (request.body.tags) {
            tags = request.body.tags.split(",");
        }
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            yield connection.query("START TRANSACTION;");
            const [results] = yield connection.query("insert into items values (null, ?, ?, ?, ?)", [item.author, item.i_name, img_url, item.i_description]);
            for (let i = 0; i < tags.length; i++) {
                let asd = [];
                asd.push(results.insertId);
                asd.push(tags[i]);
                yield connection.query("insert into item_tag values(?, ?)", asd);
            }
            yield connection.query("COMMIT;");
            if (results.affectedRows > 0) {
                response.status(201).send({ message: "Created" });
                return;
            }
            response.status(400).send({ message: "Error, probably some conflict, try with different inputs or whatever" });
        }
        catch (error) {
            console.log(error);
            return response.status(400).send(error);
        }
        return response.status(400).send({ error: "Something went wrong" });
    });
}
function modifyItem(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, upload_1.uploadMiddleware)(request, response);
        let id = parseInt(request.params.id);
        if (isNaN(id)) {
            response.status(400).send({ message: "Bad request" });
            return;
        }
        if (!request.body) {
            response.status(400).send({ message: "Bad request" });
        }
        if (request.user.status != 4) {
            response.status(401).send({ message: "bad status" });
        }
        // let item:any = new Items(request.body)
        // const allowedFields = ['author','i_name','img_url','i_description', 'tags'] 
        // const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
        // if (keys.length === 0 ) {
        //     response.status(400).send({ error: 103, messege: "Nothing to update" })
        //     return
        // }
        // let updateString = ""
        // for (let i = 0; i < keys.length; i++) {
        //     if (keys[i] != "tags") {
        //         updateString += keys[i] + " = ?"
        //     }
        //     if (keys[i] != keys[keys.length-1] && keys[i] != keys[keys.length-2]) {
        //         updateString += ", "
        //     }
        // }
        // const values = keys.map (key => item[key])
        // let tags: any
        // for (let i = 0; i < keys.length; i++) {
        //     if (keys[i] == "tags") {
        //         tags = values.pop()
        //     }
        // }
        // values.push(id)
        // const sql = `update items set ${updateString} where i_id = ?`
        // if (tags) tags = tags.split(',')
        let update = [];
        let values = [];
        let tags = [];
        if (request.body.i_name) {
            update.push("i_name = ?");
            values.push(request.body.i_name);
        }
        if (request.body.author) {
            update.push("author = ?");
            values.push(request.body.author);
        }
        if (request.body.i_description) {
            update.push("i_description = ?");
            values.push(request.body.i_description);
        }
        if (request.file) {
            update.push("img_url = ?");
            const img_url = "/uploads/" + request.file.filename;
            values.push(img_url);
        }
        if (request.body.tags) {
            const tagek = request.body.tags.split(',');
            for (let i = 0; i < tagek.length; i++) {
                tags.push(tagek[i]);
            }
        }
        values.push(id);
        const updateString = update.join(',');
        let sql = `UPDATE items set ${updateString} where i_id = ?;`;
        console.log(sql);
        console.log(values);
        const connection = yield promise_1.default.createConnection(config_1.default.database);
        try {
            yield connection.query("START TRANSACTION;");
            const [results] = yield connection.query(sql, values);
            if (tags) {
                yield connection.query("delete from item_tag where i_id = ?", [id]);
                for (let i = 0; i < tags.length; i++) {
                    let asd = [id];
                    asd.push(tags[i]);
                    yield connection.query("insert into item_tag values (?, ?)", asd);
                }
            }
            yield connection.query("COMMIT;");
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
