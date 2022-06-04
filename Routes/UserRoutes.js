import Router from "koa-router"
import { getAllUsersController } from "../Controllers/UserController.js"
const router = new Router()

router.post("/getAllUsers", getAllUsersController)

module.exports = router
