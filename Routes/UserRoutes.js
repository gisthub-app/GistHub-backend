import Router from "koa-router"
import {
  getAllUsersController,
  getUserByIdController,
} from "../Controllers/UserController.js"
const router = new Router()

router.post("/getAllUsers", getAllUsersController)

router.post("/getUser", getUserByIdController)

module.exports = router
