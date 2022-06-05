import Router from "koa-router"
import {
  testController,
  myGistsController,
  createGistController,
} from "../Controllers/GistController.js"
const router = new Router()

router.post("/test", testController)

router.post("/myGists", myGistsController)

router.post("/createGist", createGistController)

// router.post("/updateGist", updateGistController)

module.exports = router
