import { Request, Response } from "express";
import Order from "./order";
import config from "../config/config";
import mysql from "mysql2/promise";

export async function getOrders(_request: Request, response: Response) {
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            "select * from orders"
        ) as Array<any>
        response.status(200).send(results)
    }
    catch (error) {
        console.log(error);
    }
}

export async function insertOrders(request: Request, response: Response) {
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
    }
    let order:Order = new Order(request.body);
    // to chech if order valid
     const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "insert into orders values (null, ?, ?, ?, ?, ?)", [order.s_id, order.u_id, order.p_id, new Date(order.date), new Date(order.return_date)]
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

export async function modifyOrder(request: Request, response: Response) {
    let id: number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
    }
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
    }
    let order:any = new Order(request.body)
    const allowedFields = ['o_id','s_id','u_id','p_id', 'date', 'return_date'] 
    const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
    
    if (keys.length === 0 ) {
        response.status(400).send({ error: 103, messege: "Nothing to update" })
        return
    }
   
    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map (key => order[key])
    values.push(id)
    const sql = `update orders set ${updateString} where o_id = ?`
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