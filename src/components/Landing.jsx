import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CoffeeIcon from "@mui/icons-material/Coffee";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "./Landing.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <body id="font">
      <div className="landing">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">☕ Cafe</div>
          <div className="nav-buttons">
            <Button
              variant="outlined"
              className="nav-btn"
              onClick={() => navigate("/userLogin")}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              className="nav-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </nav>

        {/* HEADER SECTION */}
        <header className="landing-header">
          <div className="overlay"></div>
          <div className="header-content">
            <h1>Welcome to Restaurant</h1>
            <p>Your favorite dishes, just a click away.</p>
            <Button
              variant="contained"
              className="btn-light"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </div>
        </header>

        {/* FEATURES SECTION */}
        <section className="features">
          <div className="container text-center">
            <h2>What We Offer</h2>
            <div className="row mt-4">
              <div className="col-md-4">
                <CoffeeIcon
                  sx={{ fontSize: 40 }}
                  className="text-warning"
                />
                <h4 className="mt-2">Delicious Menu</h4>
                <br />
                <p>
                  View and order from our diverse selection of hot & cold
                  beverages.
                </p>
              </div>
              <div className="col-md-4">
                <VerifiedUserIcon
                  sx={{ fontSize: 40 }}
                  className="text-info"
                />
                <h4 className="mt-2">Easy Login</h4>
                <br />
                <p>
                  Quick and secure user login and registration for everyone.
                </p>
              </div>
              <div className="col-md-4">
                <TrendingUpIcon
                  sx={{ fontSize: 40 }}
                  className="text-success"
                />
                <h4 className="mt-2">Our Services</h4>
                <br />
                <p>Order your dishes in a minute</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-light py-3">
          Crafted with ☕ and ❤️.
        </footer>
      </div>
    </body>
  );
}
