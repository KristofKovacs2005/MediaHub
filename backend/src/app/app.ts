import express from "express";
import router from "../routes/routes";
import itemRouter from "../items/routes"
import orderRouter from "../order/routes";
import reviewRouter from "../review/routes";
import tagRouter from "../tag/routes"
import userRouter from "../user/routes";
import cors from "cors";
import bodyParser from "body-parser";


const app = express()
app.use(cors({origin:'*'}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/',router)
app.use('/', itemRouter)
app.use('/', orderRouter)
app.use('/', reviewRouter)
app.use('/', userRouter)
app.use('/', tagRouter)

export default app;