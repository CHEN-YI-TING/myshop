const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//handleErrors
const handleErrors = (err) => {
  console.log(err);
  let errors = { username: "", email: "", password: "" };

  if (err.message === "username or email error") {
    errors.email = "請輸入正確email";
    errors.username = "請輸入正確姓名";
  }
  if (err.message === "password error") {
    errors.password = "請輸入正確密碼";
  }

  if (err.message.includes("Validation error")) {
    for (let i = 0; i < err.errors.length; i++) {
      errors[err.errors[i].path] = err.errors[i].message;
      console.log(errors);
    }
  }

  return errors;
};

//createToken
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret key", { expiresIn: maxAge });
};

const signup_post = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

const login_post = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.login(username, email, password);
    const token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user.id, admin: user.isAdmin });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const logout_get = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ 成功: "你已經成功登出" });
  } catch (err) {
    res.status(400).send(err);
  }
};

const checkUser = async (req, res, next) => {
  const token = await req.cookies.jwt;
  if (!token) return res.status(401).send({ error: "401錯誤:未授權" });

  try {
    const userId = await jwt.verify(
      token,
      "secret key",
      (error, decodedToken) => {
        if (error) return res.status(400).send(error);
        return decodedToken.id;
      }
    );
    let user = await User.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send({ error: "404錯誤:沒有此使用者" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (req, res, next) => {
  const token = await req.cookies.jwt;
  const userId = await jwt.verify(
    token,
    "secret key",
    (error, decodedToken) => {
      if (error) return res.status(400).send(error);
      return decodedToken.id;
    }
  );
  const user = await User.findByPk(userId);
  const { oldPassword, password } = req.body;
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(409).send({ error: "舊密碼輸入錯誤" });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const success = await User.update(
      {
        password: hashedPassword,
      },
      { where: { id: userId } }
    );
    if (success) {
      return res.status(201).send({ success: "你已經成功修改密碼" });
    } else {
      return new Error("未修改成功");
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

/* const checkAdmin = async (req, res, next) => {
  const token = await req.cookies.jwt;
  if (!token) res.status(401).send(null);

  const adminId = await jwt.verify(
    token,
    "secret key",
    (error, decodedToken) => {
      if (error) res.status(400).send(error);
      return decodedToken.id;
    }
  );

  let admin = await User.findAll({ where: { id: adminId, isAdmin: true } });
  if (admin) {
    res.status(200).json(admin);
  } else {
    res.status(404).send(null);
  }
}; */

module.exports = {
  signup_post,
  login_post,
  logout_get,
  checkUser,
  updatePassword,
  // checkAdmin,
};
