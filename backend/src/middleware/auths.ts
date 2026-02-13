import jwt from "jsonwebtoken";
import config from "../config/config";

function verifyToken(req:any, res:any, next: any) {
    const token = req.body?.token || req.query?.token || req.headers?.['x-access-token']
    if (!token) {
        return res.status(403).send("Token kell")
    }
    try {
        if (!config.jwtSecret) {
            return res.status(403).send("Hiba van a titkos kulccsal")
        }
        const decodedToken = jwt.verify(token, config.jwtSecret)
        req.user = decodedToken
        return next();
    }
    catch (error) {
        console.log(error)
    }
    res.status(401).send("Nem sikerült az autentikáció.")
}

export default verifyToken;