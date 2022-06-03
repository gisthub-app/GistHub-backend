const mongoose = require("mongoose")

// Schema is an object(class) in mongoose
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,

    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  gists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gist" }],
  hash: String,
  salt: String,
})

const User = mongoose.model("User", UserSchema)
// to activate schema, we use mongoose.model function with params
// reference of schema and the schema object itself
module.exports = {
  User,
}
