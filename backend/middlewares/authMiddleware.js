const jwt = require("jsonwebtoken");
const User = require("../models/user");




//check admin
const checkAdmin = async (req, res, next) =>{
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token,"secret key",(err,successToken)=>{
      if(err){
        console.log(err.message);
        res.redirect('/login');
      }else {
        let user = await User.findByPk(successToken.id);
        if(user.admin === 1){
          next();
        }else{
          console.log("不好意思你不是管理員");
        }
      }
    })

  }else{
    res.redirect("/login")
  }
}

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

module.exports = { requireAuth,checkAdmin };
