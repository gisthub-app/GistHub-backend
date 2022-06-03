const bcrypt = require("bcrypt")
const passport = require("koa-passport")
const LocalStrategy = require("passport-local").Strategy
import User from "../Models/UserModel"

/*
These lines of code run on every request. 
They call functions in the passport/index.js 
called serializeUser and deserializeUser. 
serializeUser stores the user id to 
req.session.passport.user = {id:’..’}.

deserializeUser will check to see if this 
user is saved in the database, and if it is 
found it assigns it to the request as 
req.user = {user object}.
*/
passport.serializeUser((user, done) => {
  console.log("SERIALIZING USER", user.id)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    console.log("DESERIALIZING USER", id)
    let user = null
    //Find User ID in mongo
    user = await User.findById(id)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (err) {
    done(err)
  }
})

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      let user = null
      user = await User.findOne({ username })
      if (!user) {
        done({ type: "email", message: "No such user found" }, false)
        return
      }
      console.log("LOGGING IN", user.id)
      if (bcrypt.compareSync(password, user.password)) {
        console.log("LOGGED IN")
        done(null, {
          id: user.id,
          email: user.email,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
        })
        // done(null, {id: user.id, confusedFace: user.confusedFace});
      } else {
        done(
          { type: "password", message: "Password or Email is incorrect" },
          false
        )
      }
    }
  )
)

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, userName, password, done) => {
      let user = null
      user = await User.findOne({ userName })
      if (user) {
        done({ type: "email", message: "Email already exists" }, false)
        return
      }
      const { firstName, lastName, email } = req.body

      const salt = await bcrypt.genSalt(10)
      const encryptedPassword = await bcrypt.hash(password, salt)

      console.log(firstName)

      user = new User({
        email,
        password: encryptedPassword,
        userName,
        firstName,
        lastName,
      })

      await user.save()

      done(null, {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        userName: user.userName,
        lastName: user.lastName,
      })
    }
  )
)

exports.getLoggedUser = async (ctx) => {
  if (ctx.isAuthenticated()) {
    const reqUserId = ctx.state.user.id
    let user = null
    user = await User.findById(reqUserId)
    if (user) {
      delete user.password
      ctx.response.body = user
    } else {
      const statusCode = 500
      ctx.throw(statusCode, "User doesn't exist")
    }
  } else {
    ctx.redirect("/")
  }
}
