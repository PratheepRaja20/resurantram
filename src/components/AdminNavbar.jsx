import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" className="admin-navbar">
      <Toolbar className="admin-toolbar">
        <Typography variant="h6" className="admin-title">
          Cafe Admin
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => navigate("/admin")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/admin/users")}>
            Users
          </Button>
          <Button color="inherit" onClick={() => navigate("/admin/menu")}>
            Menu
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
