import config from "../config/config";
import mysql from "mysql2/promise"
import { HttpException } from "../middleware/error";

export class ItemRep {
    async getItem(name: string | null, tags: string | null, author: string | null) {
    
        let sql = "SELECT items.i_id, items.i_name, items.author, items.i_description, items.img_url, items.amount ";
        let values = [];
        if (tags) {
            sql = sql + ", GROUP_CONCAT(tag.t_name ORDER BY t_name SEPARATOR ', ') AS tagek "
        }
        sql = sql + "FROM items ";
        if (tags) {
            sql = sql + "inner join item_tag on items.i_id = item_tag.i_id INNER JOIN tag on item_tag.t_id = tag.t_id GROUP BY items.i_id, items.i_name "
        }
        if (name || tags) {
            sql = sql + "HAVING "
        }
        if (name) {
            sql = sql + "items.i_name LIKE ? "
            values.push( "%"+ name + "%")
        }
        if (name && tags) {
            sql = sql + "AND "
        }
        let tagList: Array<string>;
        if (tags) {
            tagList = (tags as string).split(',')
            for (let i = 0; i < tagList.length; i++) {
                if (i != 0) {
                    sql = sql + "AND "
                }
                sql = sql + " tagek like ? ";
                values.push("%" + tagList[i].toString() + "%")
            }
        }

        if ( (name || tags) && author) {
            sql = sql + "AND items.author like ?";
            values.push("%" + author + "%")
        }
        else if (author) {
            sql = sql + "HAVING items.author like ?";
            values.push("%" + author + "%")
        }

        sql = sql + ";"
        const connection = await mysql.createConnection(config.database);

        const [results] = await connection.query(
            sql, values
        ) as Array<any>
            
        await connection.end()

        return results
            
    }

    async getOneItem(id: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
            "select * from items where i_id = ?", [id]
        ) as Array<any>
        await connection.end()
        return results
    }

    async getReviewsOfItem(id: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
                `SELECT reviews.comment, reviews.stars, users.username, reviews.r_id
                FROM reviews 
                INNER JOIN items ON reviews.i_id = items.i_id 
                INNER JOIN users ON reviews.u_id = users.u_id
                WHERE items.i_id = ?;`, [id]
        ) as Array<any>
        await connection.end()
        return results
    }

    async getTagsOfItem(id: number) {
        const connection = await mysql.createConnection(config.database)
        const [results] = await connection.query(
                `SELECT tag.t_id, tag.t_name
                from tag
                inner join item_tag on tag.t_id = item_tag.t_id
                inner join items on item_tag.i_id = items.i_id
                WHERE items.i_id = ?;`, [id]
        ) as Array<any>
        await connection.end()
        return results
    }

    async deleteItem(id: number) {
        const connection = await mysql.createConnection(config.database)
        await connection.query("START TRANSACTION;")
        const [results] = await connection.query(
                "delete from items where i_id = ?", [id]
        ) as Array<any>
        if (results.affectedRows == 0) {
            await connection.query("ROLLBACK;")
            throw new HttpException(404, "Nem létezik ilyen elem")
        }
        await connection.query("delete from item_tag where i_id = ?;", [id])
        await connection.query("COMMIT;")
        await connection.end()
        return results
    }

    async insertItem(name: string, author: string, description: string, img_url: string, amount: number, tags: string[]) {
        const connection = await mysql.createConnection(config.database)
        await connection.query("START TRANSACTION;")
        const [results] = await connection.query(
            "insert into items values (null, ?, ?, ?, ?, ?)", [author, name, img_url, description, amount]
        ) as Array<any>
        if (results.affectedRows === 0) {
            await connection.query("ROLLBACK;")
            throw new HttpException(400, "Sikertelen")
        }
        for (let i = 0; i < tags.length; i++) {
            let asd: Array<any> = []
            asd.push(results.insertId)
            asd.push(tags[i])
            await connection.query(
            "insert into item_tag values(?, ?)", asd
        )
        }
        await connection.query("COMMIT;")
        await connection.end()
        return results
    }

    async modifyItem(updateString: string, values: any[], tags: string[]) {
        const connection = await mysql.createConnection(config.database)
        await connection.query("START TRANSACTION;")
        const [results] = await connection.query(
            `UPDATE items set ${updateString} where i_id = ?;`, values
        ) as Array<any>
        if (results.affectedRows == 0) {
            await connection.query("ROLLBACK;")
            throw new HttpException(400, "Sikertelen")
        }
        if (tags) {
            await connection.query(
                "delete from item_tag where i_id = ?", [values[values.length-1]]
            )
            for (let i = 0; i < tags.length; i++) {
                let asd: Array<any> = [values[values.length-1]]
                asd.push(tags[i])
                await connection.query(
                    "insert into item_tag values (?, ?)", asd
                )
            }
        }
        await connection.query("COMMIT;")
        await connection.end()
        return results

    }
}