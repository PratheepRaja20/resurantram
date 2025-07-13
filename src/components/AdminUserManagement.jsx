import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import "./Adminusermanagement.css";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8080/api/users/all")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Fetch error", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `http://localhost:8080/api/users/${formData.id}`
      : "http://localhost:8080/api/users/register";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        fetchUsers();
        setFormData({
          id: "",
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        setEditing(false);
      })
      .catch(() => alert("Failed to save user"));
  };

  const handleEdit = (user) => {
    setFormData({ ...user, password: "" });
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;

    fetch(`http://localhost:8080/api/users/${id}`, { method: "DELETE" })
      .then(() => {
        fetchUsers();
        alert("User deleted");
      })
      .catch(() => alert("Delete failed"));
  };

  const filteredUsers = users
    .filter((user) => user.role === "USER")
    .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <AdminNavbar />
      <Container className="aum-container">
        <Paper elevation={3} className="aum-paper">
          <Typography variant="h5" className="aum-heading">
            {editing ? "✏️ Edit User" : "➕ Add User"}
          </Typography>

          <form className="aum-form" onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required={!editing}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="aum-submit"
            >
              {editing ? "Update" : "Create"}
            </Button>
          </form>

          <Typography variant="h6" className="aum-heading">👥 User List</Typography>

          <TextField
            fullWidth
            label="Search by Username"
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="aum-search"
          />

          <TableContainer className="aum-table-container">
            <Table className="aum-table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        className="aum-edit-btn"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
