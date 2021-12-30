const User = require("../../models/user");
const signup_get = (req, res) => {
  res.send("signup request");
};

//handleErrors
const handleErrors = (err) => {
  console.log(err);
  let errors = { username: "", email: "", password: "" };

  if (err.message.includes("Validation error")) {
    for (let i = 0; i < err.errors.length; i++) {
      errors[err.errors[i].path] = err.errors[i].message;
      console.log(errors);
    }
  }

  return errors;
};

const signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send("bad request");
  }
};

const login_get = (req, res) => {
  res.send("login request");
};

const login_post = (req, res) => {
  res.send("login successful");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
