import config from "../config/config";
import mysql from "mysql2/promise"
import { HttpException } from "../middleware/error";

export class UserRep {
    async getUsers() {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select * from users"
        ) as any[]
        await connection.end()
        return results
    }
    async getUsersById(id: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select * from users where u_id = ?", [id]
        ) as any[]
        await connection.end()
        return results
    }
    async insertUser(username: string, email: string, password: string, status: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "insert into users values (null, ?, ?, ?, ?)", [username, email, password, status]
        ) as any[]
        await connection.end()
        return results
    }

    async login(email: string, password: string) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select login(?, ?) as id", [email, password]
        ) as any[]
        if (results[0].id == 0) {
            throw new HttpException(401, "email or password is incorrect")
        }
        const [data] = await connection.query(
            "select * from users where u_id = ?", [results[0].id]
        ) as any[]
        await connection.end()
        return data
    }

    async modifyUser(sql: string, values: any[]) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
           sql, values
        ) as any[]
        await connection.end()
        return results
    }
}