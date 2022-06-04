import Router from "koa-router"
import {
  testController,
  myGistsController,
} from "../Controllers/GistController.js"
const router = new Router()

router.post("/test", testController)

router.post("/myGists", myGistsController)

module.exports = router
