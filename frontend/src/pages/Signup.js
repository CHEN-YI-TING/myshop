import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//password
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const usernameError = document.querySelector(".username.error");
  const emailError = document.querySelector(".email.error");
  const passwordError = document.querySelector(".password.error");
  let navigate = useNavigate();

  //password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      if (data.errors) {
        usernameError.textContent = data.errors.username;
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      } else {
        console.log(data);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login_container">
      <form className="login_form" onSubmit={handleSubmit}>
        <h2>請註冊會員</h2>
        <div className="login_content">
          <PersonIcon className="icon" />
          <div className="username error"></div>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            label="使用者名稱"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            className="textField"
          />
        </div>

        <div className="login_content">
          <EmailIcon className="icon" />
          <div className="email error"></div>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            className="textField"
          />
        </div>

        <div className="login_content">
          <LockIcon className="icon" />
          <div className="password error"></div>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="密碼"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            className="textField"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="signup_btn">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ fontSize: 25 }}
          >
            註冊
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
