import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./AdminNavbar";
import "./AdminMenu.css"; // ✅ renamed CSS file

export default function AdminMenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    fetch("http://localhost:8080/api/menu")
      .then((res) => res.json())
      .then(setMenuItems)
      .catch((err) => console.error("Fetch error", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `http://localhost:8080/api/menu/${formData.id}`
      : "http://localhost:8080/api/menu";

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    if (formData.image) {
      data.append("image", formData.image);
    }

    fetch(url, {
      method,
      body: data,
    })
      .then(() => {
        fetchMenuItems();
        toast.success(editing ? "Item updated!" : "Item added!");
        setFormData({
          id: "",
          name: "",
          category: "",
          price: "",
          image: null,
        });
        setImagePreview(null);
        setEditing(false);
      })
      .catch(() => toast.error("Failed to save item"));
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      image: null,
    });
    setImagePreview(null);
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    fetch(`http://localhost:8080/api/menu/${id}`, { method: "DELETE" })
      .then(() => {
        fetchMenuItems();
        toast.success("Item deleted");
      })
      .catch(() => toast.error("Delete failed"));
  };

  const filteredItems =
    filter === "All"
      ? menuItems
      : menuItems.filter((item) =>
          item.category.toLowerCase() === filter.toLowerCase()
        );

  return (
    <Box className="admin-menu-dashboard">
      <AdminNavbar />
      <ToastContainer />
      <Box className="admin-menu-content">
        <Typography variant="h5" className="admin-menu-title">
          {editing ? "✏️ Edit Menu Item" : "➕ Add Menu Item"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className="admin-menu-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Item Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="Drinks">Drinks</MenuItem>
                  <MenuItem value="Snacks">Snacks</MenuItem>
                  <MenuItem value="Meals">Meals</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price (₹)"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                  required={!editing}
                />
              </Button>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="admin-menu-preview-img"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {editing ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h5" className="admin-menu-title">
          🍽️ Menu Items
        </Typography>

        <FormControl className="admin-menu-filter">
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Drinks">Drinks</MenuItem>
            <MenuItem value="Snacks">Snacks</MenuItem>
            <MenuItem value="Meals">Meals</MenuItem>
          </Select>
        </FormControl>

        <Paper className="admin-menu-table-wrapper">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:8080/uploads/${item.image}`}
                      alt={item.name}
                      className="admin-menu-table-img"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(item)}>✏️</Button>
                    <Button onClick={() => handleDelete(item.id)} color="error">
                      ❌
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">No items found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}
