import { Request, Response } from "express";
export declare function getReviews(_request: Request, response: Response): Promise<void>;
export declare function getFlaggedReviews(request: any, response: Response): Promise<void>;
export declare function deleteReviews(request: any, response: Response): Promise<void>;
export declare function insertReview(request: any, response: Response): Promise<void>;
export declare function modifyReview(request: any, response: Response): Promise<void>;
