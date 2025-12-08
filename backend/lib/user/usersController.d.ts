import { Request, Response } from "express";
export declare function getUsers(_request: Request, response: Response): Promise<void>;
export declare function getUsersById(request: Request, response: Response): Promise<void>;
export declare function insertUser(request: Request, response: Response): Promise<void>;
export declare function login(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function modifyUser(request: Request, response: Response): Promise<void>;
