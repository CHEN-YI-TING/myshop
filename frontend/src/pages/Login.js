import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//css
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//password css
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

//auth state
import { useAuth } from "../contexts/AuthContext";

function Login() {
  //login state
  const { setUser, setAdmin } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
            console.log(data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  //css
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
          請登入會員
        </Typography>
      </Box>
      <Box sx={signup}>
        <div>
          <Typography variant="h4" align="center">
            登入會員
          </Typography>
        </div>
        <form noValidate autoComplete="off" onSubmit={Login}>
          <PersonIcon sx={{ fontSize: 40 }} />

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
            登入
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
