import "./navbar.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useAddDeposit from "../../hooks/useAddDeposit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, TextField } from "@mui/material";
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

const Navbar = () => {
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
  };
  useEffect(() => {
    // Automatically close the drawer if the screen is large
    if (isLargeScreen && isDrawerOpen) {
      setDrawerOpen(false);
    }
  }, [isLargeScreen, isDrawerOpen]);
  console.log(isLargeScreen);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#2a3447", marginBottom: "20px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src="logo.svg"
            alt="logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            CryptoPall
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "20px" }}
          >
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
                style: { color: "#fff", borderColor: "#8884d8" },
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
            <a
              href="/profile"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              {user?.username}
            </a>
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
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
            <ListItem>
              <Link to="/profile">
                <ListItemText primary={user?.username} />
              </Link>
              <IconButton color="inherit" onClick={logout}>
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
                  style: { color: "#fff", borderColor: "#8884d8" },
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
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
