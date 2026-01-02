import { Request, Response } from "express";
import Items from "./items";
import config from "../config/config";
import mysql from "mysql2/promise";

export async function getItem(request: Request, response: Response) {

    const { name, tags } = request.query;

    let sql = "SELECT items.i_id, items.i_name, items.author, items.i_description, items.img_url ";
    let values = [];
    if (tags) {
        sql = sql + ", GROUP_CONCAT(tag.t_name ORDER BY t_name SEPARATOR ', ') AS tagek "
    }
    sql = sql + "FROM items ";
    if (tags) {
        sql = sql + "inner join item_tag on items.i_id = item_tag.i_id INNER JOIN tag on item_tag.t_id = tag.t_id GROUP BY items.i_id, items.i_name "
    }
    if (name || tags) {
        sql = sql + "HAVING "
    }
    if (name) {
        sql = sql + "items.i_name LIKE ? "
        values.push(name.toString())
    }
    if (name && tags) {
        sql = sql + "AND "
    }
    let tagList: Array<string>;
    if (tags) {
        tagList = (tags as string).split(',')
        for (let i = 0; i < tagList.length; i++) {
            if (i != 0) {
                sql = sql + "AND "
            }
            sql = sql + "tagek like ?";
            values.push("%" + tagList[i].toString() + "%")
        }
    }
    sql = sql + ";"


    const connection = await mysql.createConnection(config.database);
    try {
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        
        if (results.length == 0) {
            response.status(404).send({message:"Item not found"});
            return;
        }
        response.status(200).send(results)
    }
    catch (error) {
        console.log(error)
    }
}

export async function getOneItem(request: Request, response: Response) {
    let id:number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
        return;
    }
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "select * from items where i_id = ?", [id]
        ) as Array<any>
        if (results.length > 0) {
            response.status(200).send(results)
            return
        }
        response.status(404).send({message: "Item not found"})
    }
    catch (error) {
        console.log(error)
    }
}

export async function getReviewsOfItem(request:Request, response:Response) {
    
    let id:number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
        return;
    }
    
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
                `SELECT reviews.comment, reviews.stars, users.username
                FROM reviews 
                INNER JOIN items ON reviews.i_id = items.i_id 
                INNER JOIN users ON reviews.u_id = users.u_id
                WHERE items.i_id = ?;`, [id]
        ) as Array<any>
        if (results.affectedRows == 0) {
            response.status(404).send({message:"Item not found"})
            return
        }
        response.status(200).send(results)
    }
    catch (error) {
        console.log(error)
    }
}

export async function deleteItem(request:any, response:Response) {
    if (request.user.status != 4) {
        response.status(401).send({message:"bad status"})
    }
    let id:number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
        return;
    }
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "delete from items where i_id = ?", [id]
        ) as Array<any>
        if (results.affectedRows == 0) {
            response.status(404).send({message:"Item not found"})
            return
        }
        response.status(204).send()
    }
    catch (error) {
        console.log(error)
    }
}

export async function insertItem(request: any, response: Response) {
    
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
    }
    if (request.user.status != 4) {
        response.status(401).send({message:"bad status"})
    }
    // to-do: check if no missing data and if duplicates exists ? {message:"Bad request"}
    let item:Items = new Items(request.body)
    let tags;
    if (request.body.tags) {
        tags = request.body.tags.split(",")
    }
    
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "insert into items values (null, ?, ?, ?, ?)", [item.author, item.i_name, item.img_url, item.i_description]
        ) as Array<any>
        let _addTags;
        
        for (let i = 0; i < tags.length; i++) {
            let asd: Array<any> = []
            asd.push(results.insertId)
            asd.push(tags[i])
            _addTags = await connection.query(
            "insert into item_tag values(?, ?)", asd
        )
        }
        
        
        if (results.affectedRows > 0) {
            response.status(201).send({message:"Created"})
            return
        }
        response.status(400).send({message:"Error, probably some conflict, try with different inputs or whatever"})
    }
    catch (error) {
        console.log(error)
    }
}

export async function modifyItem(request:any, response:Response) {
    let id:number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
        return;
    }
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
    }
    if (request.user.status != 4) {
        response.status(401).send({message:"bad status"})
    }
    // to-do: check if no missing data and if duplicates exists ? {message:"Bad request"}
    let item:any = new Items(request.body)
    const allowedFields = ['author','i_name','img_url','i_description', 'tags'] 
    const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
    
    if (keys.length === 0 ) {
        response.status(400).send({ error: 103, messege: "Nothing to update" })
        return
    }

    let updateString = ""
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] != "tags") {
            updateString += keys[i] + " = ?"
        }
        if (keys[i] != keys[keys.length-1] && keys[i] != keys[keys.length-2]) {
            updateString += ", "
        }
    }

    const values = keys.map (key => item[key])
    let tags: any
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == "tags") {
            tags = values.pop()
        }
    }
    
    values.push(id)
    const sql = `update items set ${updateString} where i_id = ?`
    
    tags = tags.split(',')

    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        await connection.query(
            "delete from item_tag where i_id = ?", [id]
        )
        for (let i = 0; i < tags.length; i++) {
            let asd: Array<any> = [id]
            asd.push(tags[i])
            await connection.query(
                "insert into item_tag values (?, ?)", asd
            )
        }
        if (results.affectedRows > 0) {
            response.status(201).send({message:"Modified"})
            return
        }
        response.status(404).send({message:"Item not found"})

    } catch (err) {
        console.log(err);
    }
}