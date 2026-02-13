import { Request, Response } from "express";

export default function root(_request: Request, response: Response) {
    response.send("A szerver fut.")
}