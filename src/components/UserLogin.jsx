import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username || !password) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      if (data.role === "USER") {
        navigate("/users");
      } else {
        setErrorMsg("Access denied");
      }
    } catch (error) {
      setErrorMsg("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <Box className="login-page">
      <div className="top-right-global">
        <Button className="nav-home" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button className="nav-home" onClick={() => navigate("/adminLogin")}>
          Admin
        </Button>
      </div>

      <Paper elevation={10} className="login-container">
        <Typography variant="h4" className="login-title">
          User Login
        </Typography>

        <form onSubmit={handleLogin} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Username"
              type="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />

            {errorMsg && <p className="error">{errorMsg}</p>}

            <Button type="submit" variant="contained" className="submit-btn">
              Login
            </Button>

            <Typography variant="body2" className="register-link">
              Don&apos;t have an account?{" "}
              <span onClick={() => navigate("/register")}>Register now</span>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
