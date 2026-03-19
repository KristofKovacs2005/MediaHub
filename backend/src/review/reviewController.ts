import { Request, Response } from "express";
import Review from "./review";
import { ReviewSer } from "../service/reviewsSer";
import { HttpException } from "../middleware/error";

const service: ReviewSer = new ReviewSer()

export class ReviewController {
    async getReviews(_request: Request, response: Response) {
        try {
            const results = await service.getReviews()
            return response.status(200).send(results)
        }
        catch(error: any) {
            return response.status(error.status).send(error.message)
        }
    }

    async getFlaggedReviews(request: any, response: Response) {
        try {
            if (request.user.status != 5) {
                throw new HttpException(401, "Bad status")
            }
            const results = await service.getFlaggedReviews()
            return response.status(200).send(results)
        }
        catch(error: any) {
            return response.status(error.status).send(error.message)
        }
    }
    async deleteReview(request: any, response: Response) {
        try {
            if (request.user.status != 5) {
                throw new HttpException(401, "Bad status")
            }
            let id: number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Bad request")
            }
            const results = await service.deleteReview(id)
            return response.status(204).send(results)
        }
        catch(error: any) {
            return response.status(error.status).send(error.message)
        }
    }
    async insertReview(request: any, response: Response) {
        try {
            if (request.user.status == 3) {
                throw new HttpException(401, "Bad status")
            }
            if (!request.body) {
                throw new HttpException(400, "Bad request")
            }
            let review:Review = new Review(request.body)
            if (!review.i_id ||!review.stars ) {
                return response.status(400).send({error: "Missing data"})
            }
            if (review.stars > 5 || review.stars < 1) {
                return response.status(400).send("Bad stars")
            }
            const results = await service.insertReview(review.i_id, review.stars, review.comment, request.user.id)
            return response.status(201).send({message:"Created", id: results.insertId})
        }
        catch(error: any) {
            return response.status(error.status).send(error.message)
        }
    }
    async modifyReview(request: any, response: Response) {
        try {
            if (request.user.status == 3) {
                throw new HttpException(401, "Bad status")
            }
            let id: number = parseInt(request.params.id)
            if (isNaN(id)) {
                throw new HttpException(400, "Bad request")
            }
            if (!request.body) {
                throw new HttpException(400, "Bad request")
            }
            let review: any = new Review(request.body)
            const allowedFields = [`r_id`, `i_id`, `u_id`, `flagged`, `stars`, `comment`, `reason`] 
            const keys = Object.keys(request.body).filter(key => allowedFields.includes(key))
            
            if (keys.length === 0 ) {
                throw new HttpException(400, "Bad request")
            }
            if (review.stars) {
                if (review.stars > 5 || review.stars < 1) {
                    throw new HttpException(400, "Bad request")
                }
            }
            const updateString = keys.map(key => `${key} = ?`).join(', ')
            const values = keys.map (key => review[key])
            values.push(id)
            const sql = `update reviews set ${updateString} where r_id = ?`
            const results = await service.modifyReview(sql, values)
            return response.status(201).send({message:"Modified"})
        }
        catch(error: any) {
            return response.status(error.status).send(error.message)
        }
    }
}



