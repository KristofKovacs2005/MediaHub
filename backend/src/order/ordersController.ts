import { Response } from "express";
import Order from "./order";
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
        console.log(results)
        return response.status(201).send({message:"Modified"})
    }
    catch(error: any) {
        return response.status(error.status || 500).send(error.message || "hiba történt")
    }
 }


}

 