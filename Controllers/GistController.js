import Gist from "../Models/GistModel.js"
import User from "../Models/UserModel.js"

export const testController = (ctx) => {
  ctx.status = 200
  ctx.body = "Test works succesfully"
}

export const myGistsController = async (ctx) => {
  const { user } = ctx.request.body
  console.log(user.username)
  if (user) {
    const newUser = await User.findById(user.id).populate("gists")
    const sharedWithMe = await Gist.find({ permissions: user.username })
    // console.log(newUser)
    ctx.body = {
      gists: newUser.gists,
      sharedWithMe: sharedWithMe,
    }
  } else {
    ctx.throw(401, "You are not authenticated")
  }
}

export const createGistController = async (ctx) => {
  const { user } = ctx.request.body
  if (user) {
    let newGist = new Gist({ owner: user.id })
    await newGist.save()
    await User.findByIdAndUpdate(user.id, { $push: { gists: newGist.id } })
    ctx.body = {
      message: "Gist created succesfully",
      id: newGist._id,
    }
  } else {
    ctx.throw(401, "You are not authenticated")
  }
}
