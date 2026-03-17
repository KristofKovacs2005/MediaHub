import { Request, Response } from "express";
import User from "./user";
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

