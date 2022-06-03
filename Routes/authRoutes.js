import Router from "koa-router"
import {
  loginController,
  registerController,
} from "../Controllers/authController.js"
const router = new Router()

// @desc   Login a user
// @route  POST /api/login
// @access Public
router.get("/test", (ctx) => {
  ctx.status = 200
  ctx.body = "HI"
})

// @desc   Login a user
// @route  POST /api/login
// @access Public
router.post("/login", loginController)

// @desc   Register a user
// @route  POST /api/register
// @access Public
router.post("/register", registerController)

module.exports = router
