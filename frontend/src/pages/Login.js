import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//css
import "./login.css";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import GoogleButton from "react-google-button";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  //login state
  const { setUser, setAdmin } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const logErr = document.querySelector(".logErr");

  let navigate = useNavigate();

  //password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  //login
  const Login = async (e) => {
    e.preventDefault();

    try {
      fetch("http://localhost:5000/auth/login", {
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
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.admin && data.user) {
            //auth state
            setAdmin(true);
            navigate("/");
          } else if (data.user) {
            setUser(true);
            navigate("/");
          } else {
            console.log(data.error);
            logErr.textContent = data.error;
            setUsername("");
            setEmail("");
            setPassword("");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const google = async () => {
    const newWindow = window.open(
      "http://localhost:5000/auth/google",
      "_blank",
      "width=500,height=600"
    );
  };

  return (
    <div className="login_container">
      <form className="login_form" onSubmit={Login}>
        <h2>請登入會員</h2>
        <div className="logErr"></div>
        <div className="login_content">
          <PersonIcon className="icon" />
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="使用者名稱"
            variant="outlined"
            color="secondary"
            required
            fullWidth
            className="textField"
          />
        </div>

        <div className="login_content">
          <EmailIcon className="icon" />

          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            color="secondary"
            required
            fullWidth
            className="textField"
          />
        </div>

        <div className="login_content">
          <LockIcon className="icon" />

          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="密碼"
            variant="outlined"
            color="secondary"
            required
            fullWidth
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
        <div className="btn_group">
          <button type="submit" className="login_btn">
            登入
          </button>
          <GoogleButton onClick={google} />
        </div>
      </form>
    </div>
  );
}

export default Login;
