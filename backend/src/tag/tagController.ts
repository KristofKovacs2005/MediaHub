import { Request, Response } from "express";
import { TagSer } from "../service/tagSer";

const service: TagSer = new TagSer()

export class TagController {
    async getTags(_request: Request, response: Response) {
        try {
            const results = await service.getTags()
            return response.status(200).send(results)
        }
        catch(error: any) {
            return response.status(error.status || 500).send(error.message || "hiba történt")
        }
    }
}
