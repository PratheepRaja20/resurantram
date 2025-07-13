import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack
} from "@mui/material";
import "./Login.css";

export default function AdminLogin() {
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

      if (data.role === "ADMIN") {
        navigate("/admin"); // Admin dashboard
      } else {
        setErrorMsg("Access denied. Only ADMIN users are allowed.");
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
        <Button className="nav-home" onClick={() => navigate("/userLogin")}>
          User
        </Button>
      </div>

      <Paper elevation={10} className="login-container">
        <Typography variant="h4" className="login-title">
          Admin Login
        </Typography>

        <form onSubmit={handleLogin} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Username"
              type="text"
              id="username"
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

            <Button
              type="submit"
              variant="contained"
              className="submit-btn"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
