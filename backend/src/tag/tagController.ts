import { Request, Response } from "express";
import mysql from "mysql2/promise"
import config from "../config/config";

export async function getTags(_request: Request, response: Response) {
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "select * from tag"
        ) as Array<any>
        response.status(200).send(results)
    }
    catch (error) {
        console.log(error)
    }
}