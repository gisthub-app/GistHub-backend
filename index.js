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
require("dotenv").config()

connectDB()
const { User } = require("./Models/UserModel")
const { Gist } = require("./Models/GistModel")
const app = new Koa()

app.keys = [process.env.SECRET_KEY]
const port = process.env.PORT || 8001

app.listen(port, () => console.log(`Server is running on port ${port}`.yellow))
