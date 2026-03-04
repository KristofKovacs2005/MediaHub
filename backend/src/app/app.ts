import express from "express";
import itemRouter from "../routes/itemRoutes"
import orderRouter from "../routes/orderRoutes";
import reviewRouter from "../routes/reviewsRoutes";
import tagRouter from "../routes/tagRoutes"
import userRouter from "../routes/userRoutes";
import cors from "cors";
import bodyParser from "body-parser";
import config from "../config/config";
import path from "path";


const app = express()
app.use(cors({origin:'*'}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', itemRouter)
app.use('/', orderRouter)
app.use('/', reviewRouter)
app.use('/', userRouter)
app.use('/', tagRouter)

app.use('/uploads', express.static(config.baseDir + config.uploadDir))
app.use('/uploads', express.static(path.join(config.baseDir, config.uploadDir)))

export default app;
