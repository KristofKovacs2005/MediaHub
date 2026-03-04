import config from "../config/config";
import mysql from "mysql2/promise"

export class ReviewRep {
    async getReviews() {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select * from reviews"
        ) as Array<any>
        await connection.end()
        return results
    }

    async getFlaggedReviews() {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select * from reviews where flagged = 1"
        ) as Array<any>
        await connection.end()
        return results
    }
    async deleteReview(id: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
             "delete from reviews where r_id = ?", [id]
        ) as Array<any>
        await connection.end()
        return results
    }
    async insertReview(id: number, stars: number, comment: string | null, user_id: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
             "insert into reviews values (null, ?, ?, ?, ?, ?, null)", [id, user_id, false, stars, comment]
        ) as Array<any>
        await connection.end()
        return results
    }
    async modifyReview(sql: string, values: any[]) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
             sql, values
        ) as Array<any>
        await connection.end()
        return results
    }
}