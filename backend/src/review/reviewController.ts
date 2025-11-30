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

export async function getFlaggedReviews(_request:Request, response:Response) {
    const connection = await mysql.createConnection(config.database)
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

export async function deleteReviews(request:Request, response:Response) {
    let id: number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
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

export async function insertReview(request: Request, response: Response) {
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
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