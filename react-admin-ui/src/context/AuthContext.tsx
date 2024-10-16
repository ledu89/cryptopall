import { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContextType, LoginData, RegisterData, User } from "../types/Types";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  isLoading: false,
  error: null,
  updateUser: () => Promise.resolve(),
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState(false);
  const login = async (data: LoginData) => {
    try {
      setisLoading(true);
      const res = await axiosInstance.post("/auth/local", {
        identifier: data.username,
        password: data.password,
      });

      if (res.data.jwt) {
        localStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setUser(res.data.user);
        navigate("/");
        toast.success(`Welcome ${res.data.user.username}`);
        setisLoading(false);
      }
    } catch (err: any) {
      setError(err);
      toast.error(err.response.data.error.message);
      setisLoading(false);
    }
  };
  const register = async (data: RegisterData) => {
    try {
      setisLoading(true);
      const res = await axiosInstance.post("/auth/local/register", data);

      if (res.data.jwt) {
        // setUser(res.data.user);
        toast.success(`Great! Now please log in with your credentials`);
        navigate("/login");
      }
    } catch (err: any) {
      setError(err);
      toast.error(err.response.data.error.message);
    } finally {
      setisLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    toast.success("Logging out...");
  };
  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await axiosInstance.put(`/users/${user.id}`, data);
      console.log("RESPONSEE", response);

      const updatedUser = response.data;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log(error);

      toast.error(`${error.response.data.error.message} `);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading, error, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
