const jwt = require("jsonwebtoken");

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

module.exports = { requireAuth };
