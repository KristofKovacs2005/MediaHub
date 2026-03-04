import { Response } from "express";
import Order from "./order";
import config from "../config/config";
import mysql from "mysql2/promise";
import { OrderSer } from "../service/orderSer";
import { HttpException } from "../middleware/error";

const service: OrderSer = new OrderSer()

export class OrderController {
 async getOrders(request: any, response: Response) {
    try {
        if (request.user.status < 4) {
            throw new HttpException(401, "Bad status")
        }
        const results = await service.getOrders()
        return response.status(200).send(results)
    }
    catch(error: any) {
        return response.status(error.status || 500).send(error.message || "Hiba történt")
    }
 }
 async getUserOrders(request: any, response: Response) {
    try {
        if (request.user.status >= 3) {
            throw new HttpException(401, "Bad status")
        }
        let id: number = request.user.id
        
        const results = await service.getUserOrders(id)
        return response.status(200).send(results)
    }
    catch(error: any) {
        return response.status(error.status || 500).send(error.message || "hiba történt")
    }
 }

 async getAllActiveOrders(request: any, response: Response) {
    try {
        if (request.user.status >= 3) {
            throw new HttpException(401, "Bad status")
        }
        let id: number = request.user.id
        
        const results = await service.getAllActiveOrders(id)
        return response.status(200).send(results)
    }
    catch(error: any) {
        return response.status(error.status || 500).send(error.message || "hiba történt")
    }
 }

 async insertOrder(request: any, response: Response) {
    try {
        if (request.user.status > 2) {
            throw new HttpException(401, "Bad status")
        }
        if (!request.body) {
            throw new HttpException(400, "Bad request")
        }
        let order:Order = new Order(request.body);
        if (!order.p_id) {
            throw new HttpException(400, "Bad request, missing data")
        }
        if ( order.p_id == null || !order.date || !order.return_date) {
             throw new HttpException(400, "Bad request, missing data")
        }
        if (order.date > order.return_date) {
            throw new HttpException(400, "Bad request, date")
        }
        const results = await service.insertOrder(request.user.id, order.p_id, order.date, order.return_date)
        return response.status(201).send({message:"Created", id: results.insertId})
    }
    catch(error: any) {
        return response.status(error.status || 500).send(error.message || "hiba történt")
    }

 }

 async modifyOrder(request: any, response: Response) {
    try {
        let id: number = parseInt(request.params.id)
        if (isNaN(id)) {
            throw new HttpException(400, "Bad Request")
        }
        if (request.user.status != 4) {
            throw new HttpException(401, "Bad status")
        }
        if (!request.body) {
            throw new HttpException(400, "Bad request")
        }
        let order:any = new Order(request.body)
        const allowedFields = ['o_id','s_id','u_id','p_id', 'date', 'return_date']
        const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
   
        if (keys.length === 0 ) {
            throw new HttpException(400, "Nothing to update")
        }
        const updateString = keys.map(key => `${key} = ?`).join(', ')
        const values = keys.map (key => order[key])
        values.push(id)
        const sql = `update orders set ${updateString} where o_id = ?`
        const results = await service.modifyOrder(sql, values, id, order.s_id)
        return response.status(201).send({message:"Modified"})
    }
    catch(error: any) {
        return response.status(error.status || 500).send(error.message || "hiba történt")
    }
 }


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