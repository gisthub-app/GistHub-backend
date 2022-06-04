import Router from "koa-router"
import {
  loginController,
  registerController,
} from "../Controllers/authController.js"
const router = new Router()

// @desc   Login a user
// @route  POST /login
// @access Public
router.post("/login", loginController)

// @desc   Register a user
// @route  POST /register
// @access Public
router.post("/register", registerController)

module.exports = router
