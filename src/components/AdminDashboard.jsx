import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Avatar,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [menuItemCount, setMenuItemCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/count")
      .then((res) => res.json())
      .then(setUserCount)
      .catch((err) => console.error("Error fetching users:", err));

    fetch("http://localhost:8080/api/menu/count")
      .then((res) => res.json())
      .then(setMenuItemCount)
      .catch((err) => console.error("Error fetching menu items:", err));
  }, []);

  return (
    <Box className="admin-dashboard">
      <AdminNavbar />

      <Container className="admin-content">
        <Typography variant="h4" className="dashboard-title">
          ☕ Welcome Admin
        </Typography>

        <Grid container spacing={4} className="dashboard-cards">
          <Grid item xs={12} md={6}>
            <Card className="dashboard-card user-card">
              <CardContent className="dashboard-card-content">
                <Avatar className="dashboard-icon user-icon">
                  <PeopleAltIcon />
                </Avatar>
                <div>
                  <Typography variant="subtitle1">Total Users</Typography>
                  <Typography variant="h4">{userCount}</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="dashboard-card menu-card">
              <CardContent className="dashboard-card-content">
                <Avatar className="dashboard-icon menu-icon">
                  <RestaurantMenuIcon />
                </Avatar>
                <div>
                  <Typography variant="subtitle1">Menu Items</Typography>
                  <Typography variant="h4">{menuItemCount}</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
