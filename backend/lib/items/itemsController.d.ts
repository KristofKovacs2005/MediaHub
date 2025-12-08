import { Request, Response } from "express";
export declare function getItem(request: Request, response: Response): Promise<void>;
export declare function getReviewsOfItem(request: Request, response: Response): Promise<void>;
export declare function deleteItem(request: Request, response: Response): Promise<void>;
export declare function insertItem(request: Request, response: Response): Promise<void>;
export declare function modifyItem(request: Request, response: Response): Promise<void>;
