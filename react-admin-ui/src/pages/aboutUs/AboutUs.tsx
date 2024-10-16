import React from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LockIcon from "@mui/icons-material/Lock";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import "./about.scss"; // Optional: Add custom styles if needed

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ color: "#fff", paddingTop: "2rem" }}>
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#f0f0f0" }}
        >
          About Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "#c0c0c0" }}>
          Welcome to our crypto app! Our platform offers an intuitive and
          seamless experience to explore, manage, and invest in
          cryptocurrencies. Designed for both newcomers and experienced
          investors, we aim to make financial management accessible and simple.
        </Typography>
      </Box>
      <Grid container spacing={4} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", padding: "1rem" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#f0f0f0" }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="body2"
              paragraph
              sx={{ color: "#c0c0c0", maxWidth: "600px" }}
            >
              We empower individuals to make informed financial decisions by
              providing real-time data, investment tools, and a supportive
              community. Our mission is to bring the benefits of digital
              currencies to a wider audience.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", padding: "1rem" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#f0f0f0" }}
            >
              Features
            </Typography>
            <Grid container spacing={2} direction="row" alignItems="center">
              <Grid item>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <ShoppingCartIcon
                    sx={{ fontSize: "2.5rem", color: "#ff9800" }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#f0f0f0" }}
                  >
                    Buy Cryptocurrencies
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#c0c0c0",
                    maxWidth: "400px",
                    marginTop: "0.5rem",
                  }}
                >
                  Easily purchase popular cryptocurrencies with a few clicks.
                  Our app provides a simple and secure buying experience.
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <TrendingUpIcon
                    sx={{ fontSize: "2.5rem", color: "#4caf50" }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#f0f0f0" }}
                  >
                    Sell and Manage Portfolio
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#c0c0c0",
                    maxWidth: "400px",
                    marginTop: "0.5rem",
                  }}
                >
                  Monitor your portfolio and sell cryptocurrencies when the time
                  is right. Keep track of your profits and losses.
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <LockIcon sx={{ fontSize: "2.5rem", color: "#f44336" }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#f0f0f0" }}
                  >
                    Secure Transactions
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#c0c0c0",
                    maxWidth: "400px",
                    marginTop: "0.5rem",
                  }}
                >
                  Your data and transactions are protected with the latest
                  security measures to ensure peace of mind.
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <AttachMoneyIcon
                    sx={{ fontSize: "2.5rem", color: "#2196f3" }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#f0f0f0" }}
                  >
                    Real-Time Market Data
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#c0c0c0",
                    maxWidth: "400px",
                    marginTop: "0.5rem",
                  }}
                >
                  Stay updated with the latest prices and trends in the crypto
                  market, allowing you to make informed decisions.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
