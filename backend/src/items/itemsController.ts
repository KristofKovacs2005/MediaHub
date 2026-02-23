import { Request, Response } from "express";
import Items from "./items";
import config from "../config/config";
import mysql from "mysql2/promise";
import { uploadMiddleware } from "../middleware/upload";

export async function getItem(request: Request, response: Response) {

    const { name, tags, author } = request.query;

    

    let sql = "SELECT items.i_id, items.i_name, items.author, items.i_description, items.img_url, items.amount ";
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
        values.push( "%"+ name + "%")
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
            sql = sql + " tagek like ? ";
            values.push("%" + tagList[i].toString() + "%")
        }
    }

    if ( (name || tags) && author) {
        sql = sql + "AND items.author like ?";
        values.push("%" + author + "%")
    }
    else if (author) {
        sql = sql + "HAVING items.author like ?";
        values.push("%" + author + "%")
    }

    sql = sql + ";"
    console.log(sql)

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
                `SELECT reviews.comment, reviews.stars, users.username, reviews.r_id
                FROM reviews 
                INNER JOIN items ON reviews.i_id = items.i_id 
                INNER JOIN users ON reviews.u_id = users.u_id
                WHERE items.i_id = ?;`, [id]
        ) as Array<any>
        if (results.length == 0) {
            response.status(404).send({message:"Item not found"})
            return
        }
        response.status(200).send(results)
    }
    catch (error) {
        console.log(error)
    }
}

export async function getTagsOfItem(request:Request, response:Response) {
    
    let id:number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
        return;
    }
    
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
                `SELECT tag.t_id, tag.t_name
                from tag
                inner join item_tag on tag.t_id = item_tag.t_id
                inner join items on item_tag.i_id = items.i_id
                WHERE items.i_id = ?;`, [id]
        ) as Array<any>
        if (results.length == 0) {
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
    if (request.user.status < 4) {
        response.status(401).send({message:"bad status"})
    }
    let id:number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
        return;
    }
    const connection = await mysql.createConnection(config.database)
    try {
        await connection.query("START TRANSACTION;")
        const [results] = await connection.query(
            "delete from items where i_id = ?", [id]
        ) as Array<any>
        if (results.affectedRows == 0) {
            response.status(404).send({message:"Item not found"})
            return
        }
        await connection.query("delete from item_tag where i_id = ?;", [id])
        await connection.query("COMMIT;")
        response.status(204).send()
    }
    catch (error) {
        console.log(error)
    }
}
export async function insertItem(request: any, response: Response) {
   
    await uploadMiddleware(request, response)
 
    if (!request.body) {
        return response.status(400).send({message:"Bad request"})
    }
    if (request.user.status != 4) {
        return response.status(401).send({message:"bad status"})
    }
   
    let item:Items = new Items(request.body)
    let imgName
    if (request.file.filename) {
        imgName = request.file.filename 
    }
    imgName = "images.jpeg"

    const img_url = "/uploads/" + imgName
   
    if (item.i_name == "" || !item.i_name || !item.author || item.author == "" || !item.i_description || item.i_description == "") {
        return response.status(400).send({error: "Missing data"})
    }
    let tags;
    if (request.body.tags) {
        tags = request.body.tags.split(",")
    }
    else {
        return response.status(400).send("Nincsenek tagek")
    }
    let amount = item.amount || 1
    const connection = await mysql.createConnection(config.database)
    try {
        await connection.query("START TRANSACTION;")
        const [results] = await connection.query(
            "insert into items values (null, ?, ?, ?, ?, ?)", [item.author, item.i_name, img_url, item.i_description, amount]
        ) as Array<any>
       
        for (let i = 0; i < tags.length; i++) {
            let asd: Array<any> = []
            asd.push(results.insertId)
            asd.push(tags[i])
            await connection.query(
            "insert into item_tag values(?, ?)", asd
        )
        }
        await connection.query("COMMIT;")
        if (results.affectedRows > 0) {
            response.status(201).send({id: results.insertId})
            return
        }
        response.status(400).send({message:"Error, probably some conflict, try with different inputs or whatever"})
    }
    catch (error) {
        console.log(error)
        return response.status(400).send(error)
    }
    return response.status(400).send({error:"Something went wrong"});
}
 
export async function modifyItem(request:any, response:Response) {
    await uploadMiddleware(request, response)
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
 
    let update: string[] = []
    let values: any[] = []
    let tags: string[] = []
   
    if (request.body.i_name) {
        update.push("i_name = ?")
        values.push(request.body.i_name)
    }
    if (request.body.author) {
        update.push("author = ?")
        values.push(request.body.author)
    }
    if (request.body.i_description) {
        update.push("i_description = ?")
        values.push(request.body.i_description)
    }
    if (request.file) {
        update.push("img_url = ?")
        const img_url = "/uploads/" + request.file.filename
        values.push(img_url)
    }
    if (request.body.amount) {
        update.push("amount = ?")
        values.push(request.body.amount)
    }
    if (request.body.tags) {
        const tagek = request.body.tags.split(',')
        for (let i = 0; i < tagek.length; i++) {
            tags.push(tagek[i])
        }
    }
    values.push(id)
    const updateString = update.join(',');
 
    let sql = `UPDATE items set ${updateString} where i_id = ?;`
 
    console.log(sql)
    console.log(values)
 
    const connection = await mysql.createConnection(config.database);
 
    try {
        await connection.query("START TRANSACTION;")
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        if (tags) {
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
        }
        await connection.query("COMMIT;")
        if (results.affectedRows > 0) {
            response.status(201).send({message:"Modified"})
            return
        }
        response.status(404).send({message:"Item not found"})
 
    } catch (err) {
        console.log(err);
    }
}
 