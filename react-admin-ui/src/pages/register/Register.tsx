import "./register.scss";
import RegisterForm from "../../components/registerForm/RegisterForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="register">
      <RegisterForm />
    </div>
  );
};

export default Register;
