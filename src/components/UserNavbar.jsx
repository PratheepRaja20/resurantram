import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"; // External CSS for additional styles

export default function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar position="static" className="user-navbar" color="success" elevation={1}>
      <Toolbar className="user-navbar-toolbar">
        <Typography variant="h6" className="user-navbar-title">
          ☕ Cafe User
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
