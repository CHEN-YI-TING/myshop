const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const User = require("../models/user");

//建立驗政策略
passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_PWD}`,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      // default db user
      const defaultUser = {
        username: `${profile.displayName}`,
        email: profile.emails[0].value,
        password: "default_password",
        isAdmin: false,
        googleId: profile.id,
        picture: profile.photos[0].value,
      };
      //check user existed?
      const user = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err) => {
        console.log("未註冊成功", err);
        cb(err, null);
      });
      if (user && user[0]) {
        return cb(null, user && user[0]);
      }
    }
  )
);

//save user data id in session
passport.serializeUser((user, cb) => {
  console.log("serializeUser", user);
  console.log("這是序列化前的id", user.id);
  //encode
  cb(null, user.id);
});

//decode ==> we already have user id  in session token
passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.log("error deserializing", err);
    cb(err, null);
  });
  //user object existed?
  console.log("deserialized user", user);
  if (user) cb(null, user);
});
