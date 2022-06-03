import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {})
    console.log(`MongoDB Connected ${conn.connection.host}`.blue)
  } catch (err) {
    console.log(`Error: ${err.message}`.red)
    process.exit(1)
  }
}

export default connectDB
