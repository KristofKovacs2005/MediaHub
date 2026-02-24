import { Response } from "express";
import Order from "./order";
import config from "../config/config";
import mysql from "mysql2/promise";

export async function getOrders(request: any, response: Response) {
    const connection = await mysql.createConnection(config.database);
    if (request.user.status < 4) {
        return response.status(401).send({message:"bad status"})
    }
    try {
        const [results] = await connection.query(
            "select * from orders"
        ) as Array<any>
        return response.status(200).send(results)
    }
    catch (error) {
        return response.status(400).send(error)
    } finally {
        connection.end()
    }
}
export async function getUserOrders(request: any, response: Response) {
    const connection = await mysql.createConnection(config.database);
    if (request.user.status >= 3) {
        return response.status(401).send({message:"bad status"})
    }
    try {
        const [results] = await connection.query(
            "select * from orders where u_id = ?", [request.user.id]
        ) as Array<any>
        if (results.length == 0) {
            return response.status(404).send("Nincsenek a felhasználónak rendelései.")
        }
        return response.status(200).send(results)
    }
    catch (error) {
        return response.status(400).send(error)
    }finally {
        connection.end()
    }
}

export async function getAllActiveOrders(request: any, response: Response) {
    
    const connection = await mysql.createConnection(config.database);
    if (request.user.status >= 3) {
        return response.status(401).send({message:"bad status"})
    }
    try {
        const [results] = await connection.query(
            "select * from orders inner join order_status on orders.s_id = order_status.os_id where u_id = ? and (os_name like 'awaiting acceptance' or os_name like 'accepted' or os_name like 'late');", [request.user.id]
        ) as Array<any>
        if (results.length == 0) {
            return response.status(404).send("A felhasználónak nincs aktív rendelése")
        }
        return response.status(200).send(results)
    }
    catch (error) {
        return response.status(400).send(error)
    }finally {
        connection.end()
    }
}
 
export async function insertOrders(request: any, response: Response) {
    if (!request.body) {
        return response.status(400).send({message:"Bad request"})
    }
    if (request.user.status > 2) {
        return response.status(401).send({message:"bad status"})
    }
    let order:Order = new Order(request.body);
    if ( !order.p_id) {
        return response.status(400).send({error: "Missing data"})
    }
    if ( order.p_id == null || !order.date || !order.return_date) {
        return response.status(400).send({error: "Missing data"})
    }
    if (order.date > order.return_date) {
        return response.status(400).send("A dátumok nem jók")
    }
     const connection = await mysql.createConnection(config.database)
    try {
        await connection.query("START TRANSACTION;")
        const [item] = await connection.query("select amount from items where i_id = ?", [order.p_id]) as any[]
        if (item.length == 0) {
            return response.status(400).send("Nem létező termék")
        }
        if (item[0].amount == 0) {
            return response.status(400).send({message: "Nem elérhető az adott termék."})
        }
        const [results] = await connection.query(
            "insert into orders values (null, 1, ?, ?, ?, ?);", [ request.user.id, order.p_id, new Date(order.date), new Date(order.return_date)]
        ) as Array<any>
        await connection.query("update items set amount = ? where i_id = ?", [item[0].amount - 1, order.p_id])
        if (results.affectedRows > 0) {
            await connection.query("COMMIT;")
            response.status(201).send({message:"Created", id: results.insertId})
            return
        }
        await connection.query("ROLLBACK;")
        response.status(400).send({message:"Error, probably some conflict, try with different input or whatever"})
    }
    catch (error) {
        console.log(error)
        return response.status(400).send(error)
    }finally {
        connection.end()
    }
    return;
}
 
export async function modifyOrder(request: any, response: Response) {
    let id: number = parseInt(request.params.id)
    if (isNaN(id)) {
        return response.status(400).send({message:"Bad request"})
    }
    if (!request.body) {
        return response.status(400).send({message:"Bad request"})
    }
    if (request.user.status != 4) {
        return response.status(401).send({message:"bad status"})
    }
    let order:any = new Order(request.body)
    const allowedFields = ['o_id','s_id','u_id','p_id', 'date', 'return_date']
    const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
   
    if (keys.length === 0 ) {
        return response.status(400).send({ error: 103, messege: "Nothing to update" })
        
    }
   
    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map (key => order[key])
    values.push(id)
    const sql = `update orders set ${updateString} where o_id = ?`
    const connection = await mysql.createConnection(config.database);
 
    try {
        await connection.query("START TRANSACTION;")
        const [orders] = await connection.query("select p_id from orders where o_id = ?", [id]) as any[]
        if (orders.length == 0) return response.status(404).send("Nincs ilyen elem")
        const [item] = await connection.query("select amount from items where i_id = ?", [orders[0].p_id]) as any[]
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
       
        if (order.s_id == 4 || order.s_id == 5) {
           
            await connection.query("update items set amount = ? where i_id = ?", [item[0].amount + 1, orders[0].p_id])
        }
        if (results.affectedRows > 0) {
           
            await connection.query("COMMIT;")
            response.status(201).send({message:"Modified"})
            return
        }
       
        await connection.query("ROLLBACK;")
        return response.status(404).send({message:"Item not found"})
    } catch (err) {
        
        return response.status(400).send(err)
    }finally {
        connection.end()
    }
}