import "./login.scss";
import LoginForm from "../../components/loginForm/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login">
      <LoginForm />
    </div>
  );
};

export default Login;
