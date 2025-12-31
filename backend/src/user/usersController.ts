import { Request, Response } from "express";
import config from "../config/config";
import User from "./user";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken"

export async function getUsers(request:any, response:Response) {
    if (request.user.status != 5) {
        response.status(401).send({message:"bad status"})
    }
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "select * from users"
        ) as Array<any>
        let res: Array<any> = []
        for (let i = 0; i < results.length; i++) {
            res.push({
            u_id: results[i].u_id,
            username: results[i].username,
            email: results[i].email,
            status: results[i].status
        })
        }
        response.status(200).send(res)
    }
    catch (error) {
        console.log(error)
    }
}

export async function getUsersById(request:any, response:Response) {
    if (request.user.status != 4 || request.user.status == 5) {
        response.status(401).send({message:"bad status"})
    }
    let id:number = parseInt(request.params.id)
    if (isNaN(id)) {
        response.status(400).send({message:"Bad request"})
        return;
    }
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "select * from users where u_id = ?", [id]
        ) as Array<any>
        let res: Array<any> = []
        for (let i = 0; i < results.length; i++) {
            res.push({
            u_id: results[i].u_id,
            username: results[i].username,
            email: results[i].email,
            status: results[i].status
        })
        }
        if (results.affectedRows > 0) {
            response.status(200).send(res)
            return
        }
        response.status(404).send({message: "Item not found"})
        
    }
    catch (error) {
        console.log(error)
    }
}



export async function insertUser(request: Request, response: Response) {
    if (!request.body) {
        response.status(400).send({message:"Bad request"})
    }
    
    // to-do: check if no missing data and if duplicates exists ? {message:"Bad request"}
    let user:User = new User(request.body)
    const connection = await mysql.createConnection(config.database)
    try {
        const [results] = await connection.query(
            "insert into users values (null, ?, ?, ?, ?)", [user.username, user.email, user.password, user.status]
        ) as Array<any>
        if (results.affectedRows > 0) {
            response.status(201).send({message:"Created"})
            return
        }
        response.status(400).send({message:"Error, probably some conflict, try with different input or whatever"})
    }
    catch (error) {
        console.log(error)
        response.status(409).send({message:"Valszeg valami konfliktus, gitgud, próbáld újra más adatokkal, ha továbbra sem működik, akkor írj nekem. Remélem ez segít: " + error})
    }
}

export async function login(request: Request, response: Response) {
    const {email, password} = request.body;
    if (!(email && password)) {
        response.status(400).send({message:"Bad request"})
    }
    
    const connection = await mysql.createConnection(config.database)

    try {
        const [results] = await connection.query(
            'SELECT login(?, ?) AS id',
            [email, password]
        ) as Array<any>;
        if (!results[0].id) {
            return response.status(401).send({message:"email or password is incorrect"})
        }
        if (!config.jwtSecret) {
            return response.status(400).send({message:"Secret key error"})
        }
        const [jobbresults] = await connection.query (
            "select * from users where u_id = ?", [results[0].id]
        ) as Array<any>

        const token = jwt.sign({email:jobbresults[0].email, jelszo:jobbresults[0].username, id:jobbresults[0].u_id, status:jobbresults[0].status}, config.jwtSecret, {expiresIn: "2h"});

        console.log(jobbresults[0])

        return response.status(200).send({token: token, email:jobbresults[0].email, jelszo:jobbresults[0].username, id:jobbresults[0].u_id, status:jobbresults[0].status});
    }
    catch(error) {
        console.log(error)
    }
    return
    
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
    // to-do: check if no missing data and if duplicates exists ? {message:"Bad request"}
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
    }
}