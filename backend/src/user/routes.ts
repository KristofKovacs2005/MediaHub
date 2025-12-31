import { Router } from "express";
import { getUsers, getUsersById, insertUser, login, modifyUser} from "./usersController";
import verifyToken from "../middleware/auths";

const router: Router = Router();
router.get("/users", verifyToken, getUsers) //moderátor
router.get("/users/:id", verifyToken, getUsersById) //moderátor v. könyvtáros
router.post("/users", insertUser)
router.post("/users/login", login)
router.patch("/users/:id", verifyToken, modifyUser) //moderátor

export default router