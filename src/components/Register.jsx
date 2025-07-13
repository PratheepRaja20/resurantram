import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegx = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const passwordRegx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegx.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegx.test(formData.phone.trim())) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegx.test(formData.password)) {
      newErrors.password =
        "Password must be strong (8+ chars, upper, lower, digit, symbol)";
    }

    if (!formData.cpassword) {
      newErrors.cpassword = "Confirm your password";
    } else if (formData.cpassword !== formData.password) {
      newErrors.cpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const message = await res.text();
      alert(message);

      if (message === "User registered successfully") {
        setSubmitted(true);
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        });
        setErrors({});
      }
    } catch (err) {
      console.error(err);
      alert("Network or server error");
    }
  };

  return (
    <Box className="register-page">
      <Button
        variant="text"
        className="nav-home-btn"
        onClick={() => navigate("/")}
      >
        Home
      </Button>

      <Paper elevation={10} className="register-container">
        <Typography variant="h4" className="register-title">
          Register
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            {["username", "email", "phone", "password", "cpassword"].map(
              (field) => (
                <TextField
                  key={field}
                  id={field}
                  label={
                    field === "cpassword"
                      ? "Confirm Password"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  type={field.includes("password") ? "password" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  error={Boolean(errors[field])}
                  helperText={errors[field]}
                  fullWidth
                />
              )
            )}

            <Button
              type="submit"
              variant="contained"
              className="submit-btn"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
