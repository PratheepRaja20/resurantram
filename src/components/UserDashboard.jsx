import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import UserNavbar from "../components/UserNavbar";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/menu/all")
      .then((res) => res.json())
      .then(setMenuItems)
      .catch((err) => console.error("Error fetching menu items:", err));
  }, []);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <UserNavbar />
      <Container className="ud-container">
        <Grid container spacing={4}>
          {/* Menu Items Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom className="ud-section-title">
              📋 Menu Items
            </Typography>
            <Grid container spacing={3}>
              {menuItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card className="ud-card">
                    {item.image && (
                      <CardMedia
                        component="img"
                        height="160"
                        image={`http://localhost:8080/uploads/${item.image}`}
                        alt={item.name}
                        className="ud-card-image"
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {item.category}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        ₹{item.price}
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => handleAddToCart(item)}
                        className="ud-add-btn"
                      >
                        ➕ Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Cart Section */}
          <Grid item xs={12} md={4}>
            <Paper className="ud-cart-box">
              <Typography variant="h6" gutterBottom>
                🛒 Cart
              </Typography>
              {cart.length === 0 ? (
                <Typography>Cart is empty.</Typography>
              ) : (
                <>
                  <List>
                    {cart.map((item) => (
                      <ListItem key={item.id} className="ud-cart-item">
                        <Box>
                          <Typography>
                            {item.name} — Qty: {item.quantity}
                          </Typography>
                          <Typography variant="body2">
                            ₹{item.price} × {item.quantity} = ₹
                            {(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">Total: ₹{totalPrice.toFixed(2)}</Typography>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleClearCart}
                    className="ud-clear-btn"
                  >
                    🧹 Clear Cart
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
