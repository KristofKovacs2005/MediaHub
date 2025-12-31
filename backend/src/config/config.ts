import dotenv from "dotenv";
dotenv.config();

class DBConfig {
    constructor() {
        return {host:process.env.DB_HOST, user:process.env.DB_USER,  database:process.env.DATABASE}
    }
}
//password:process.env.DB_PASS,

const config: any = {
    jwtSecret: process.env.JWT_SECRET,
    database: new DBConfig()
}

export default config;