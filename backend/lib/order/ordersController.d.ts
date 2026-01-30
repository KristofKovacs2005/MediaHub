import { Response } from "express";
export declare function getOrders(request: any, response: Response): Promise<void>;
export declare function getUserOrders(request: any, response: Response): Promise<void>;
export declare function insertOrders(request: any, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function modifyOrder(request: any, response: Response): Promise<void>;
