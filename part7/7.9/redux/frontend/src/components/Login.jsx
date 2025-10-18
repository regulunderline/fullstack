import { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "../reducers/notificationReducer";
import { initializeLoggedInUser } from "../reducers/loggedInUserReducer";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(initializeLoggedInUser());
      setUsername("");
      setPassword("");
      navigate("/");
    } catch {
      dispatch(setNotification("wrong username or password", "error", 5));
    }
  };
  return (
    <div>
      <Typography variant="h3">log in to application</Typography>

      <form onSubmit={handleLogin}>
        <div>
          <TextField
            type="text"
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            label="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
