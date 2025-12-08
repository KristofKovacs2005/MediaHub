import { Request, Response } from "express";
export declare function getReviews(_request: Request, response: Response): Promise<void>;
export declare function getFlaggedReviews(_request: Request, response: Response): Promise<void>;
export declare function deleteReviews(request: Request, response: Response): Promise<void>;
export declare function insertReview(request: Request, response: Response): Promise<void>;
