import dotenv from "dotenv"
import multer from "multer"
import util from "util"
import config from "../config/config"
import path from "path"
dotenv.config()

const storage = multer.diskStorage({
    destination: (_req,_file,cb) => {
        cb(null, path.join(config.baseDir, config.uploadDir))
    }
})

const uploadFile = multer ({
    storage: storage,
    limits:{fileSize: config.maxSize},
    fileFilter: (_req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        }
        else {
            return cb(new Error("Helytelen file típus."))
        }
    }
}).single("file")

export const uploadMiddleware = util.promisify(uploadFile)