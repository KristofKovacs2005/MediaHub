import { Request, Response } from "express";
import Items from "./items";
import config from "../config/config";
import mysql from "mysql2/promise";
import { uploadMiddleware } from "../middleware/upload";
import { ItemSer } from "../service/itemSer";
import { HttpException } from "../middleware/error";

const service: ItemSer = new ItemSer()

export class ItemController {
    async getItem(request: Request, response: Response) {
        try {
            const name = typeof request.query.name === "string" ? request.query.name : null;
            const tags = typeof request.query.tags === "string" ? request.query.tags : null;
            const author = typeof request.query.author === "string" ? request.query.author : null;
            const results = await service.getItems(name, tags, author)
            return response.status(200).send(results)
        }
        catch(error: any) {
            return response.status(error.status || 500).send(error.message || "Váratlan hiba")
        }
    }

    async getOneItem(request: Request, response: Response) {
        try {
            let id: number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Rossz formátumú id")
            }
            const results = await service.getOneItem(id)
            return response.status(200).send(results)
        }
        catch (error: any) {
            return response.status(error.status || 500).send(error.message || "Váratlan hiba")
        }
    }

    async getReviewsOfItem(request: Request, response: Response) {
        try {
            let id: number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Rossz formátumú id")
            }
            const results = await service.getReviewsOfItem(id)
            return response.status(200).send(results)
        }
        catch (error: any) {
            return response.status(error.status || 500).send(error.message || "Váratlan hiba")
        }
    }

    async getTagsOfItem(request: Request, response: Response) {
        try {
            let id: number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Rossz formátumú id")
            }
            const results = await service.getTagsOfItem(id)
            return response.status(200).send(results)
        }
        catch (error: any) {
            return response.status(error.status || 500).send(error.message || "Váratlan hiba")
        }
    }

    async deleteItem(request: any, response: Response) {
        try {
            let id: number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Rossz formátumú id")
            }
            if (request.user.status < 4) {
                throw new HttpException(401, "Bad Status")
            }
            const results = await service.deleteItem(id)
            return response.status(204).send(results)
        }
        catch (error: any) {
            return response.status(error.status || 500).send(error.message || "Váratlan hiba")
        }
    }

     async insertItem(request: any, response: Response) {
        try {
            await uploadMiddleware(request, response)
            if (!request.body) {
                throw new HttpException(400, "Bad request")
            }
            if (!request.file) {

                throw new HttpException(400, "No Image")
            }
            if (request.user.status < 4) {
                throw new HttpException(401, "Bad Status")
            }


            let item:Items = new Items(request.body)
            let imgName
            if (request.file.filename) {
                imgName = request.file.filename 
            }else {
                imgName = "images.jpeg"
            }
            

            const img_url = "/uploads/" + imgName
        
            if (item.i_name == "" || !item.i_name || !item.author || item.author == "" || !item.i_description || item.i_description == "") {
                throw new HttpException(400, "Missing data")
            }
            let tags;
            if (request.body.tags) {
                tags = request.body.tags.split(",")
            }
            else {
                throw new HttpException(400, "No tags")
            }
            let amount = item.amount || 1
            const results = await service.insertItem(item.i_name, item.author, item.i_description, img_url, amount, tags)
            return response.status(201).send({id: results.insertId})
        }
        catch (error: any) {
            return response.status(error.status || 500).send(error.message || "Váratlan hiba")
        }
    }

    async modifyItem(request: any, response: Response) {
        try {
            await uploadMiddleware(request, response)
            let id: number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Rossz formátumú id")
            }
            if (!request.body) {
                throw new HttpException(400, "Bad request")
            }
            if (request.user.status < 4) {
                throw new HttpException(401, "Bad Status")
            }
            let update: string[] = []
            let values: any[] = []
            let tags: string[] = []
            if (request.body.i_name) {
                update.push("i_name = ?")
                values.push(request.body.i_name)
            }
            if (request.body.author) {
                update.push("author = ?")
                values.push(request.body.author)
            }
            if (request.body.i_description) {
                update.push("i_description = ?")
                values.push(request.body.i_description)
            }
            if (request.file) {
                update.push("img_url = ?")
                const img_url = "/uploads/" + request.file.filename
                values.push(img_url)
            }
            if (request.body.amount) {
                update.push("amount = ?")
                values.push(request.body.amount)
            }
            if (request.body.tags) {
                const tagek = request.body.tags.split(',')
                for (let i = 0; i < tagek.length; i++) {
                    tags.push(tagek[i])
                }
            }
            values.push(id)
            const updateString = update.join(',');
            const results = await service.modifyItem(updateString, values, tags)
            return response.status(201).send({message:"Modified"})
        }
        catch(error: any) {
            console.log(error)
            return response.status(error.status || 500).send(error.message || "Váratlan hiba")
        }
    }
}


