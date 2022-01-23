const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
  if (token) {
    jwt.verify(token, "secret key", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check current user
const checkUser = async (req, res, next) => {
  const token = req.cookie.jwt;

  if (token) {
    jwt.verify(token, "secret key", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.body.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findByPk(decodedToken.id);
        res.body.user = user;
        next();
      }
    });
  } else {
    res.body.user = null;
    next();
  }
};

module.exports = { requireAuth };
