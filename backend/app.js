const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const passport = require("passport");
//const session = require("express-session");
const cookieSession = require("cookie-session");
const api = require("./api/v1");
require("dotenv").config;
require("./config/passportGoogleSSO");

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
/* app.use(
  session({
    secret: [process.env.COOKIE_KEY],
    resave: false,
    saveUninitialized: false,
  })
); */

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

//google auth
app.use(passport.initialize());
app.use(passport.session());

app.use("/", api);

const PORT = process.env.DB_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
