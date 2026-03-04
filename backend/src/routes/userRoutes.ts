import { Router } from "express";
import verifyToken from "../middleware/auths";
import { UserController } from "../user/usersController";

const router: Router = Router()
const controller: UserController = new UserController()

router.get("/users", verifyToken, controller.getUsers.bind(controller)) //moderátor
router.get("/users/:id", verifyToken, controller.getUsersById.bind(controller)) //moderátor v. könyvtáros
router.post("/users", controller.insertUser.bind(controller))
router.post("/users/login", controller.login.bind(controller))
router.patch("/users/:id", verifyToken, controller.modifyUser.bind(controller)) //moderátor

export default router