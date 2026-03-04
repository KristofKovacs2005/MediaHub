import config from "../config/config";
import mysql from "mysql2/promise"
import { HttpException } from "../middleware/error";

export class OrderRep {
    async getOrders() {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select * from orders"
        ) as any[]
        await connection.end()
        return results
    }

    async getUserOrders(id: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select * from orders where u_id = ?", [id]
        )as any[]
        await connection.end()
        return results
    }

    async getAllActiveOrders(id: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            `select * from orders 
            inner join order_status on orders.s_id = order_status.os_id 
            where u_id = ? 
            and (os_name like 'awaiting acceptance' or os_name like 'accepted' or os_name like 'late');`, [id]
        )as any[]
        await connection.end()
        return results
    }

    async insertOrder(user_id: number, product_id: number, date: Date, r_date: Date) {
        const connection = await mysql.createConnection(config.database)
        await connection.query("START TRANSACTION;")
        const [item] = await connection.query("select amount from items where i_id = ?", [product_id]) as any[]
        if (item.length == 0) {
            await connection.query("ROLLBACK;")
            await connection.end()
            throw new HttpException(404, "Nem létező termék")
        }
        if (item[0].amount == 0) {
            await connection.query("ROLLBACK;")
            await connection.end()
            throw new HttpException(400, "Nincs raktáron")
        }
        const [results] = await connection.query(
            "insert into orders values (null, 1, ?, ?, ?, ?);", [ user_id, product_id, new Date(date), new Date(r_date)]
        ) as Array<any>
        await connection.query("update items set amount = ? where i_id = ?", [item[0].amount - 1, product_id])
        if (results.affectedRows == 0) {
            await connection.query("ROLLBACK;")
        }else {
            await connection.query("COMMIT;")
        }
        
        await connection.end()
        return results
        
    }

    async modifyOrder(sql: string, values: any[], order_id: number, order_status: number) {
        const connection = await mysql.createConnection(config.database)
        await connection.query("START TRANSACTION;")
        const [orders] = await connection.query("select p_id from orders where o_id = ?", [order_id]) as any[]
        if (orders.length == 0) {
            await connection.query("ROLLBACK;")
            await connection.end()
            throw new HttpException(404, "Nincs ilyen elem")
        }
        const [item] = await connection.query("select amount from items where i_id = ?", [orders[0].p_id]) as any[]
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        
        if (order_status == 4 || order_status == 5) {
            
            await connection.query("update items set amount = ? where i_id = ?", [item[0].amount + 1, orders[0].p_id])
        }
        if (results.affectedRows == 0) {
            await connection.query("ROLLBACK;")
        }
        await connection.query("COMMIT;")
        await connection.end()
        return results
       
        
    }
}