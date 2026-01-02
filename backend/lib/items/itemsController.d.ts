import { Request, Response } from "express";
export declare function getItem(request: Request, response: Response): Promise<void>;
export declare function getOneItem(request: Request, response: Response): Promise<void>;
export declare function getReviewsOfItem(request: Request, response: Response): Promise<void>;
export declare function deleteItem(request: any, response: Response): Promise<void>;
export declare function insertItem(request: any, response: Response): Promise<void>;
export declare function modifyItem(request: any, response: Response): Promise<void>;
