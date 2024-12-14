import "./profile.scss";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContet";

type UserInfoProps = {
  username: string;
  email: string;
};
const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    username: user?.username || "",
    email: user?.email || "",
  });
  const { isDarkMode } = useTheme();
  const handleInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEdit = async () => {
    if (open) {
      const updatedInfo = {
        username: userInfo.username,
        email: userInfo.email,
      };
      await updateUser(updatedInfo);
    } else {
      setUserInfo({
        username: user?.username || "",
        email: user?.email || "",
      });
    }
    setOpen((prev) => !prev);
  };

  return (
    <Box>
      <h2>My profile</h2>
      <div className="profile">
        <div className="profile-info">
          <h3>Username: {user?.username}</h3>
          <h3>Email: {user?.email}</h3>

          <Button
            disabled={user?.username === "Guest" ? true : false}
            variant="text"
            onClick={handleEdit}
          >
            {open ? "Save" : "Edit"}
          </Button>
        </div>
        {user?.username === "Guest" ? (
          <Alert severity="warning">
            You can not edit guest account. Create account to see full version
          </Alert>
        ) : null}
        {open && (
          <div className="edit-profile">
            <div className="username">
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                value={userInfo.username}
                defaultValue={user?.username}
                onChange={handleInfo}
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
                }}
              />
            </div>
            <div className="email">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={userInfo.email}
                defaultValue={user?.email}
                onChange={handleInfo}
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
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};
export default Profile;
