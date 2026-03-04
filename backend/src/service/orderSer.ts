import { HttpException } from "../middleware/error"
import { OrderRep } from "../repisotaries/orderRep"

export class OrderSer {
    private repository: OrderRep

    constructor() {
        this.repository = new OrderRep()
    }

    async getOrders() {
        const results = await this.repository.getOrders()
        if (results.length == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }
    async getUserOrders(id: number) {
        const results = await this.repository.getUserOrders(id)
        if (results.length == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }

    async getAllActiveOrders(id: number) {
        const results = await this.repository.getAllActiveOrders(id)
        if (results.length == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }

    async insertOrder(u_id: number, id: number, date: Date, r_date: Date) {
        const results = await this.repository.insertOrder(u_id, id, date, r_date)
        if (results.affectedRows == 0) {
            throw new HttpException(400, "Sikertelen")
        }
        return results
    }
    async modifyOrder(sql: string, values: any[], id: number, status: number) {
        const results = await this.repository.modifyOrder(sql, values, id, status)
        if (results.affectedRows == 0) {
            throw new HttpException(400, "Sikertelen")
        }
        return results
    }
}