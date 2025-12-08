interface IReview {
    r_id: number;
    i_id: number;
    u_id: number;
    flagged: number;
    stars: number;
    comment: string;
}
declare class Review implements IReview {
    r_id: number;
    i_id: number;
    u_id: number;
    flagged: number;
    stars: number;
    comment: string;
    constructor(init: IReview);
}
export default Review;
