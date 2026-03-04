import { Request, Response } from "express";
import config from "../config/config";
import User from "./user";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken"
import { UserSer } from "../service/userSer";
import { HttpException } from "../middleware/error";

const service: UserSer = new UserSer()

export class UserController {
    async getUsers(request: any, response: Response) {
        try {
            if (request.user.status != 5) {
                throw new HttpException(401, "Bad status")
            }
            const results = await service.getUsers()
            return response.status(200).send(results)
        }
        catch(error: any) {
            return response.status(error.status || 500).send(error.message || "hiba történt")
        }
    }

    async getUsersById(request: any, response: Response) {
        try {
            if (request.user.status < 4) {
                throw new HttpException(401, "Bad status")
            }
            let id:number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Bad request")
            }
            const results = await service.getUsersById(id)
            return response.status(200).send(results)
        }
        catch(error: any) {
            return response.status(error.status || 500).send(error.message || "hiba történt")
        }
    }
    async insertUser(request: any, response: Response) {
        try {
            if (!request.body) {
                throw new HttpException(400, "Bad request")
            }
            let user:User = new User(request.body)
            if (!user.username || !user.email || !user.password || !user.status ) {
                throw new HttpException(400, "Bad request")
            }
            if (user.username == "" || user.email == "" || user.password == "" || user.status == null) {
                throw new HttpException(400, "Bad request")
            }
            const results = await service.insertUser(user.username, user.email, user.password, user.status)
            return response.status(201).send({message:"Created", id: results.insertId})
        }
        catch(error: any) {
            return response.status(error.status || 500).send(error.message || "hiba történt")
        }
    }
    async login(request: any, response: Response) {
        try {
            if (!request.body) {
                throw new HttpException(400, "Bad request")
            }
            const {email, password} = request.body;
            if (!(email && password)) {
                throw new HttpException(400, "Bad request")
            }
            
            const results = await service.login(email, password)
            return response.status(200).send({token: results.token, status: results.status, username: results.username});
        }
        catch(error: any) {
            return response.status(error.status || 500).send(error.message || "hiba történt")
        }
    }
    async modifyUser(request: any, response: Response) {
        try {
            if (request.user.status != 5) {
                throw new HttpException(401, "Bad status")
            }
            let id:number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Bad request")
            }
            if (!request.body) {
                throw new HttpException(400, "Bad request")
            }
            
            let user:any = new User(request.body)
            const allowedFields = ['username','email','password','status'] 
            const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
            
            if (keys.length === 0 ) {
                throw new HttpException(400, "Bad request")
            }
        
            const updateString = keys.map(key => `${key} = ?`).join(', ')
            const values = keys.map (key => user[key])
            values.push(id)
            const sql = `update users set ${updateString} where u_id = ?`
            
            const results = await service.modifyUser(sql, values)
            return response.status(201).send({message:"Modified"})
        }
        catch(error: any) {
            return response.status(error.status || 500).send(error.message || "hiba történt")
        }
    }
}



export async function modifyUser(request:any, response:Response) {
    if (request.user.status != 5) {
            response.status(401).send({message:"bad status"})
    }
    let id:number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
        return;
    }
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
    }
    
    let user:any = new User(request.body)
    const allowedFields = ['username','email','password','status'] 
    const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
    
    if (keys.length === 0 ) {
        response.status(400).send({ error: 103, messege: "Nothing to update" })
        return
    }
   
    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map (key => user[key])
    values.push(id)
    const sql = `update users set ${updateString} where u_id = ?`
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        if (results.affectedRows > 0) {
            response.status(201).send({message:"Modified"})
            return
        }
        response.status(404).send({message:"Item not found"})

    } catch (err) {
        console.log(err);
    }finally {
        connection.end()
    }
}