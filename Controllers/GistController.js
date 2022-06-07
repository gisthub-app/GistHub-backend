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
      _id: newGist._id,
    }
  } else {
    ctx.throw(401, "You are not authenticated")
  }
}
export const deleteGistController = async (ctx) => {
  const { user, _id } = ctx.request.body
  if (user) {
    await Gist.deleteOne({ _id: _id })
    await User.findByIdAndUpdate(user.id, { $pull: { gists: _id } })
    ctx.body = {
      message: "Gist deleted succesfully",
    }
  } else {
    ctx.throw(401, "You are not authenticated")
  }
}

export const updateGistController = async (ctx) => {
  const { user } = ctx.request.body
  if (user) {
    const { gistId } = ctx.request.body
    const gist = await Gist.findById(gistId)
    // console.log(user.id)
    // console.log(gist.owner.toString())
    if (gist.owner.toString() !== user.id) {
      ctx.throw(403, "You do not own this gist")
    }

    delete ctx.request.body["gistId"]

    await Gist.updateOne({ _id: gistId }, { $set: ctx.request.body })

    ctx.body = {
      message: "Successfully updated",
    }
  } else {
    ctx.throw(401, "You are not authenticated")
  }
}

export const viewGistController = async (ctx) => {
  const { gistId, user } = ctx.request.body
  // console.log(gistId, user)
  const gist = await Gist.findById(gistId)
  // console.log(gist)

  if (!gist) {
    ctx.throw(404, "Gist not found")
  }
  // check if gist is public
  if (!gist.isPrivate) {
    ctx.body = {
      gist: gist,
    }
    return
  } else {
    if (user) {
      // gist is private
      // check if user owns the gist

      if (
        user.id === gist.owner._id.toString() ||
        gist.permissions.includes(user.username)
      ) {
        ctx.body = {
          gist: gist,
        }
        return
      } else {
        ctx.throw(403, "You do not have permission to view this")
      }
    } else {
      ctx.throw(401, "You are not authenticated")
    }
  }
}
