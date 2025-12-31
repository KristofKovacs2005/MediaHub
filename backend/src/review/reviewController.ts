import { Request, Response } from "express";
import config from "../config/config";
import Review from "./review";
import mysql from "mysql2/promise";

export async function getReviews(_request:Request, response:Response) {
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "select * from reviews"
        ) as Array<any>
        
        response.status(200).send(results)
    }
    catch (error) {
        console.log(error)
    }
}

export async function getFlaggedReviews(request:any, response:Response) {
    const connection = await mysql.createConnection(config.database)
    if (request.user.status != 5) {
        response.status(401).send({message:"bad status"})
    }
    try {
        const [results] = await connection.query(
            "select * from reviews where flagged = 1"
        ) as Array<any>
        response.status(200).send(results)
    }
    catch (error) {
        console.log(error)
    }
}

export async function deleteReviews(request:any, response:Response) {
    let id: number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
    }
    if (request.user.status != 5) {
        response.status(401).send({message:"bad status"})
    }
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "delete from reviews where r_id = ?", [id]
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

export async function insertReview(request: any, response: Response) {
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
    }
    if (request.user.status != 1) {
        response.status(401).send({message:"bad status"})
    }
    // to-do: check if no missing data and if duplicates exists ? {message:"Bad request"}
    let review:Review = new Review(request.body)
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "insert into reviews values (null, ?, ?, ?, ?, ?)", [review.i_id, review.u_id, review.flagged, review.stars, review.comment]
        ) as Array<any>
        if (results.affectedRows > 0) {
            response.status(201).send({message:"Created"})
            return
        }
        response.status(400).send({message:"Error, probably some conflict, try with different input or whatever"})
    }
    catch (error) {
        console.log(error)
    }
}

export async function modifyReview(request: any, response: Response) {
    if (request.user.status != 5) {
        response.status(401).send({message:"bad status"})
    }
    let id: number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
    }
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
    }
    let review: any = new Review(request.body)
    const allowedFields = [`r_id`, `i_id`, `u_id`, `flagged`, `stars`, `comment`] 
    const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
    
    if (keys.length === 0 ) {
        response.status(400).send({ error: 103, messege: "Nothing to update" })
        return
    }
   
    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map (key => review[key])
    values.push(id)
    const sql = `update reviews set ${updateString} where r_id = ?`
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        if (results.affectedRows > 0) {
            response.status(201).send({message:"Modified"})
            return
        }
        response.status(404).send({message:"Item not found"})

    } catch (err) {
        console.log(err);
    }
}