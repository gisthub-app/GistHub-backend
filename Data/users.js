import bcrypt from "bcrypt"
const users = [
  {
    username: "john",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    gists: [],
    password: bcrypt.hashSync("123456", 10),
  },
  {
    username: "jane",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Doe",
    gists: [],
    password: bcrypt.hashSync("123456", 10),
  },
  {
    username: "Gaurang",
    email: "gaurang@example.com",
    firstName: "Gaurang",
    lastName: "Ruparelia",
    gists: [
      "629b5c96255645ef32c48368",
      "629b5c96255645ef32c48363",
      "629b5c96255645ef32c4835e",
    ],
    password: bcrypt.hashSync("123456", 10),
  },
]

export default users
