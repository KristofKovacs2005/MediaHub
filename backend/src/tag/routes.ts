import { Router } from "express";
import { getTags } from "./tagController"

const router: Router = Router();

router.get("/tags", getTags);


export default router;