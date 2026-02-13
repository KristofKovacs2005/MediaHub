import dotenv from "dotenv";
import path from "path";
dotenv.config();

class DBConfig {
    constructor() {
        return {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        }
    }
}
//password:process.env.DB_PASS,

const config: any = {
    jwtSecret: process.env.JWT_SECRET,
    database: new DBConfig(),
    maxSize: parseInt(process.env.MAX_FILE_SIZE ?? "2097152"),
    baseDir: path.resolve(__dirname, "../../"),
    uploadDir: process.env.UPLOAD_DIR_NAME ?? "uploads"
}

export default config;