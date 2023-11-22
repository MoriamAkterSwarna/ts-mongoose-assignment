import express from "express"
import { UserController } from "./user.controller"
const router = express.Router()

router.post("/POST/api/users", UserController.createUser)
router.get("/GET/api/users", UserController.getAllUser)
export const UserRoutes = router
