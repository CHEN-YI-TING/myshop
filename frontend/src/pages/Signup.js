import React, { useState } from "react";
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
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  const signup = {
    padding: "15px",
    margin: "25px",
    border: "1px solid gray",
    backgroundColor: "white",
    fontSize: "25px",
    borderRadius: "15px",
  };

  const textField = {
    marginTop: "20px",
    marginBottom: "20px",
    display: "block",
    size: "large",
    fontSize: 20,
    label: 90,
  };

  const title = {
    height: "100px",
    fontSize: "50px",
    paddingTop: 7,
  };
  return (
    <Container>
      <Box sx={title}>
        <Typography variant="h2" align="center">
          請註冊會員
        </Typography>
      </Box>
      <Box sx={signup}>
        <div>
          <Typography variant="h4" align="center">
            註冊會員帳號
          </Typography>
        </div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <PersonIcon sx={{ fontSize: 40 }} />

          <div className="username error"></div>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            label="使用者名稱"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            sx={textField}
          />

          <EmailIcon sx={{ fontSize: 40 }} />
          <div className="email error"></div>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            sx={textField}
          />

          <LockIcon sx={{ fontSize: 40 }} />
          <div className="password error"></div>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="密碼"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            sx={textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ fontSize: 25 }}
          >
            註冊
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;
