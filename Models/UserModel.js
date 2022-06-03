import mongoose from "mongoose"

// Schema is an object(class) in mongoose
const UserSchema = new mongoose.Schema({
  username: {
    type: String,

    required: true,
  },
  email: {
    type: String,

    required: true,
  },
  firstName: {
    type: String,
    required: true,
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
export default User
