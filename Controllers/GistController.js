import Gist from "../Models/GistModel.js"

// @desc   Test route
// @route  POST /test
// @access Public
export const testController = (ctx) => {
  ctx.status = 200
  ctx.body = "Test works succesfully"
}

export const myGistsController = async (ctx) => {}
