import "./navbar.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useAddDeposit from "../../hooks/useAddDeposit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Divider, TextField, Tooltip } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Logout as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";

type NavbarPropsType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};
const Navbar = ({ isDarkMode, toggleTheme }: NavbarPropsType) => {
  const { user, logout } = useAuth();
  const [depositAmount, setDepositAmount] = useState<number | "">("");
  const { mutate: handleDeposit, isPending } = useAddDeposit();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:900px)");

  const handleDepositClick = () => {
    if (depositAmount === "" || depositAmount <= 0) {
      toast("Please enter a valid deposit amount.");
      return;
    }
    handleDeposit({ userId: user?.id, deposit: depositAmount });
    setDepositAmount("");
    setDrawerOpen((prev) => !prev);
    toast.success(
      `Deposit successful! You've added $${depositAmount} to your account.`
    );
  };
  useEffect(() => {
    if (isLargeScreen && isDrawerOpen) {
      setDrawerOpen(false);
    }
  }, [isLargeScreen, isDrawerOpen]);

  return (
    <AppBar
      position="sticky"
      className={`navbar ${isDarkMode ? "dark-theme" : "light-theme"}`}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src="logo.svg"
            alt="logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? "#fefefe" : "#161616",
            }}
          >
            CryptoPall
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "20px" }}
          >
            <Tooltip
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              arrow
            >
              <IconButton
                edge="end"
                color="inherit"
                aria-label="theme"
                sx={{ display: { xs: "block" } }}
                onClick={toggleTheme}
              >
                <Box sx={{ marginRight: "16px" }}>
                  {isDarkMode ? <LightModeIcon /> : <NightlightIcon />}
                </Box>
              </IconButton>
            </Tooltip>
            <TextField
              label="Enter deposit"
              type="number"
              variant="outlined"
              size="small"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              InputLabelProps={{
                style: { color: isDarkMode ? "#fefefe" : "#161616" },
              }}
              InputProps={{
                style: {
                  color: isDarkMode ? "#fefefe" : "#161616",
                  borderColor: "#8884d8",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8884d8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8884d8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8884d8",
                  },
                },
                marginRight: "10px",
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8884d8",
                "&:hover": {
                  backgroundColor: "#8884d8",
                },
              }}
              onClick={handleDepositClick}
              disableTouchRipple={isPending}
            >
              {isPending ? "Depositing..." : "Deposit"}
            </Button>
          </Box>

          <Typography
            component="span"
            sx={{ marginRight: "20px", color: "#fff" }}
          >
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: isDarkMode ? "#fefefe" : "#161616",
              }}
            >
              {user?.username}
            </Link>
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}

        <IconButton
          edge="end"
          color="inherit"
          aria-label="theme"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Box sx={{ marginRight: "8px" }}>
            {isDarkMode ? (
              <LightModeIcon onClick={toggleTheme} />
            ) : (
              <NightlightIcon onClick={toggleTheme} />
            )}
          </Box>
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 250,
            backgroundColor: "#2a3447",
            height: "100%",
            color: "#fff",
          }}
          role="presentation"
        >
          <List>
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/profile">
                <ListItemText primary={user?.username} />
              </Link>
              <IconButton title="logout" color="inherit" onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </ListItem>
            <ListItem>
              <TextField
                label="Enter deposit"
                type="number"
                variant="outlined"
                size="small"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                InputProps={{
                  style: {
                    color: "#fff",
                    borderColor: "#8884d8",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#8884d8",
                    },
                    "&:hover fieldset": {
                      borderColor: "#8884d8",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#8884d8",
                    },
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#8884d8",
                  "&:hover": {
                    backgroundColor: "#8884d8",
                  },
                }}
                onClick={handleDepositClick}
                disableTouchRipple={isPending}
              >
                {isPending ? "Depositing..." : "Deposit"}
              </Button>
            </ListItem>
          </List>
          <Divider />
          <List
            sx={{
              display: { xs: "block" },
              alignItems: "center",

              "@media (min-width: 768px)": {
                display: "none",
              },
            }}
          >
            <ListItem onClick={() => setDrawerOpen((prev) => !prev)}>
              <Link style={{ display: "block", width: "100%" }} to="/">
                Home
              </Link>
            </ListItem>
            <ListItem onClick={() => setDrawerOpen((prev) => !prev)}>
              <Link style={{ display: "block", width: "100%" }} to="/portfolio">
                Portfolio
              </Link>
            </ListItem>
            <ListItem onClick={() => setDrawerOpen((prev) => !prev)}>
              <Link style={{ display: "block", width: "100%" }} to="/coins">
                Market
              </Link>
            </ListItem>
            <ListItem onClick={() => setDrawerOpen((prev) => !prev)}>
              <Link style={{ display: "block", width: "100%" }} to="/profile">
                Profile
              </Link>
            </ListItem>
            <ListItem onClick={() => setDrawerOpen((prev) => !prev)}>
              <Link style={{ display: "block", width: "100%" }} to="/about">
                About
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
