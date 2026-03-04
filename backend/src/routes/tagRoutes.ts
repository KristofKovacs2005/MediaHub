import { Router } from "express";
import { TagController } from "../tag/tagController";

const router: Router = Router()
const controller: TagController = new TagController()

router.get("/tags", controller.getTags.bind(controller));

export default router