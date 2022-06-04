import mongoose from "mongoose"
import dotenv from "dotenv"
import colors from "colors"
import users from "./data/users.js"
import gists from "./data/gists.js"
import User from "./models/UserModel.js"
import Gist from "./models/GistModel.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany({})
    await Gist.deleteMany({})
    const createdUsers = await User.insertMany(users)

    // const mainOwner = "62086ca7fedfdb1ad22b220d"
    const sampleGists = gists.map((gist) => {
      return { ...gist, owner: createdUsers[2] }
    })
    // console.log(sampleGists)

    await Gist.insertMany(sampleGists)
    console.log("Data Imported Successfully".green.inverse)
    process.exit()
  } catch (err) {
    console.log(`error: ${err}`.red)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany({})
    await Gist.deleteMany({})

    console.log("Data Destroyed Successfully".red.inverse)
    process.exit()
  } catch (err) {
    console.log(`error: ${err}`.red)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
