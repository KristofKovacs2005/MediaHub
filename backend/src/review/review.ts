interface IReview {
    r_id: number,
    i_id: number,
    u_id: number,
    flagged: number,
    stars: number,
    comment: string,
    reason: string
}

class Review implements IReview {
    r_id: number
    i_id: number
    u_id: number
    flagged: number
    stars: number
    comment: string
    reason: string

    constructor(init:IReview) {
        this.r_id = init.r_id
        this.i_id = init.i_id
        this.u_id = init.u_id
        this.flagged = init.flagged
        this.stars = init.stars
        this.comment = init.comment
        this.reason = init.reason
    }
}

export default Review;