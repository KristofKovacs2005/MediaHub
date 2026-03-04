import { HttpException } from "../middleware/error"
import { ReviewRep } from "../repisotaries/reviewsRep"

export class ReviewSer {
    private repository: ReviewRep
    constructor() {
        this.repository = new ReviewRep()
    }
    async getReviews() {
        const results = await this.repository.getReviews()
        if (results.length == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }

    async getFlaggedReviews() {
        const results = await this.repository.getFlaggedReviews()
        if (results.length == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }

    async deleteReview(id: number) {
        const results = await this.repository.deleteReview(id)
        if (results.affectedRows == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }

    async insertReview(id: number, stars: number, comment: string | null, user_id: number) {
        const results = await this.repository.insertReview(id, stars, comment, user_id)
        if (results.affectedRows == 0) {
            throw new HttpException(400, "Sikertelen")
        }
        return results
    }
    async modifyReview(sql: string, values: any[]) {
        const results = await this.repository.modifyReview(sql, values)
        if (results.affectedRows == 0) {
            throw new HttpException(404, "Nincs ilyen elem")
        }
        return results
    }
}