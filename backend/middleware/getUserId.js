const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = await req.cookies.jwt;
  try {
    if (!token) {
      req.userId == false;
      next();
    } else {
      const userId = await jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (error, decodedToken) => {
          if (error) return res.status(400).send(error);
          return decodedToken.id;
        }
      );
      let user = await User.findByPk(userId);
      if (user) {
        req.userId = user.id;
        next();
      } else {
        req.userId == false;
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
