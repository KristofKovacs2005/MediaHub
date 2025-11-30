import { Router } from "express";
import { getUsers, getUsersById, insertUser, login, modifyUser} from "./usersController";

const router: Router = Router();
router.get("/users", getUsers)
router.get("/users/:id", getUsersById)
router.post("/users", insertUser)
router.post("/users/login", login)
router.patch("/users/:id", modifyUser)

export default router