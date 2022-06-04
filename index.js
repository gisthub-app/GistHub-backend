import Koa from "koa"
import Router from "koa-router"
import koaLogger from "koa-logger"
import cors from "@koa/cors"
import bodyParser from "koa-bodyparser"
import session from "koa-session"
import mongo from "mongoose"
const colors = require("colors")
import connectDB from "./Config/db"
const morgan = require("morgan")
import { readdirSync } from "fs"

require("dotenv").config()

// connect to mongoDB
connectDB()

const { User } = require("./Models/UserModel")
const { Gist } = require("./Models/GistModel")

// initialize koa app
const app = new Koa()

// app.keys array of signed cookie keys
app.keys = [process.env.SECRET_KEY]

// app.proxy when true proxy header fields will be trusted
app.proxy = true

// A Koa Context encapsulates node's request and response objects into a single object which provides many helpful methods for writing web applications and APIs.

const CONFIG = {
  key: "koa.sess" /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: false /** (boolean) httpOnly or not (default true)        TODO:CHANGE TO TRUE AFTER DEVELEOPMENT*/,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: true /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  secure: false /** (boolean) secure cookie        TODO:CHANGE TO TRUE AFTER DEVELOPMENT*/,
  sameSite:
    null /** (string) session cookie sameSite options (default null, don't set it) */,
}

app.use(session(CONFIG, app))

// https://www.npmjs.com/package/koa-logger
app.use(koaLogger())

const corsOptions = {
  credentials: true,
}
app.use(cors(corsOptions))

// https://www.npmjs.com/package/koa-bodyparser
app.use(bodyParser())

const passport = require("koa-passport")

app.use(passport.initialize())
/*
The first time a browser makes a request to our server, express session

generates a unique session id
2. saves that session id in a session cookie and passes this back to the browser.

3. creates an empty session object, as req.session.

4. saves the session object to the database.

Now if the same browser makes another request, 
the browser sends the delicious cookie 
that contains our session id, and boom, 
that’s the caller id. 
Express session knows that browser has sent requests before.
*/
app.use(passport.session())

const auth = require("./controllers/auth")

const router = new Router()

// error middleware
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.status || 500
    ctx.type = "json"
    ctx.body = {
      message: error.message,
      type: error.type,
    }
    ctx.app.emit("error", error, ctx)
  }
})

// import all routes in one go
readdirSync("./Routes").map((route) => {
  // console.log(route)
  app.use(require(`./Routes/${route}`).routes()).use(router.allowedMethods())
})

const port = process.env.PORT || 8001
app.listen(port, () => console.log(`Server is running on port ${port}`.yellow))
