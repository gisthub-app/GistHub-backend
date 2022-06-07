import User from "../Models/UserModel.js"

export const getAllUsersController = async (ctx) => {
  const users = await User.find({})
  ctx.body = {
    users: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
      username: user.username,
    })),
  }
}

export const getUserByIdController = async (ctx) => {
  console.log()
  const { _id } = ctx.request.body
  console.log(_id)
  const user = await User.findById({ _id: _id })
  ctx.body = {
    user: user,
  }
}
