import { Router } from "express";
import root from "./controller";

const router: Router = Router();
router.get("/", root)

export default router