import config from "../config/config";
import mysql from "mysql2/promise"

export class TagRep {
    async getTags() {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select * from tag"
        ) as Array<any>
        await connection.end()
        return results
    }
}