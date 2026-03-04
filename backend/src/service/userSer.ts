import { HttpException } from "../middleware/error"
import { UserRep } from "../repisotaries/userRep"
import jwt from "jsonwebtoken"
import config from "../config/config"

export class UserSer {
    private repository: UserRep
    constructor() {
        this.repository = new UserRep()
    }
    async getUsers() {
        const results = await this.repository.getUsers()
        if (results.length == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        let res: Array<any> = []
        for (let i = 0; i < results.length; i++) {
            res.push({
            u_id: results[i].u_id,
            username: results[i].username,
            email: results[i].email,
            status: results[i].status
        })
        }
        return res
    }
    async getUsersById(id: number) {
        const results = await this.repository.getUsersById(id)
        if (results.length == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        let res: Array<any> = []
        for (let i = 0; i < results.length; i++) {
            res.push({
            u_id: results[i].u_id,
            username: results[i].username,
            email: results[i].email,
            status: results[i].status
        })
        }
        return res
    }
    async insertUser(username: string, email: string, password: string, status: number) {
        const results = await this.repository.insertUser(username, email, password, status)
        if (results.affectedRows == 0) {
            throw new HttpException(400, "Sikertelen")
        }
        return results
    }
    async login(email: string, password: string) {
        const results = await this.repository.login(email, password)
        if (results[0].id == 0) {
            throw new HttpException(401, "Rossz email vagy jelszó")
        }
        const token = jwt.sign({username: results[0].username, email:results[0].email, id:results[0].u_id, status:results[0].status}, config.jwtSecret, {expiresIn: "2h"});
        return {token: token, status: results[0].status, username: results[0].username}
    }
    async modifyUser(sql: string, values: any[]) {
        const results = await this.repository.modifyUser(sql, values)
        if (results.affectedRows == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }
}