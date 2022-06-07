import Router from "koa-router"
import {
  testController,
  myGistsController,
  createGistController,
  viewGistController,
  updateGistController,
  deleteGistController,
} from "../Controllers/GistController.js"
const router = new Router()

router.post("/test", testController)

router.post("/myGists", myGistsController)

router.post("/createGist", createGistController)

router.post("/viewGist", viewGistController)
router.post("/updateGist", updateGistController)

router.post("/deleteGist", deleteGistController)

module.exports = router
