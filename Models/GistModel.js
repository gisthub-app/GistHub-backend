import mongoose from "mongoose"

// Schema is an object(class) in mongoose
const GistSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  permissions: [{ type: String }],
  content: [new mongoose.Schema({ type: String, payload: String })],
  isPrivate: { type: Boolean, default: true },
})

const Gist = mongoose.model("Gist", GistSchema)
// to activate schema, we use mongoose.model function with params
// reference of schema and the schema object itself
export default Gist
