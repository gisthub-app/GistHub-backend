import User from "../Models/UserModel.js"
import passport from "koa-passport"

export const loginController = (ctx) =>
  passport.authenticate("local", (err, user) => {
    if (!user) {
      ctx.throw(401, err)
    } else {
      ctx.body = user
      return ctx.login(user)
    }
  })(ctx)

export const registerController = (ctx) =>
  passport.authenticate("local.signup", (err, user) => {
    if (!user) {
      ctx.throw(401, err)
    } else {
      ctx.body = user
      return ctx.login(user)
    }
  })(ctx)
