import { Link } from "react-router-dom";
import "./loginForm.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
type LoginData = {
  username: string;
  password: string;
};

type FormValues = {
  username: string;
  password: string;
};

type AuthContextType = {
  login: (data: LoginData) => Promise<void>;
  isLoading: boolean;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { login, isLoading } = useAuth() as AuthContextType;

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    await login(data);
    reset();
  };

  return (
    <div className="loginForm">
      <div className="leftImg">
        <img src="/digital-shield.jpg" alt="" />
      </div>
      <div className="right">
        <h1>Cryptopall</h1>
        <small>We make trading secure and fun</small>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label htmlFor="username"></label>
            <input
              type="text"
              placeholder="Username or email"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>
          <div className="input">
            <label htmlFor="password"></label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {showPassword ? (
              <RemoveRedEyeIcon
                style={{ width: "20px" }}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <VisibilityOffIcon
                style={{ width: "20px" }}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
          <button disabled={isLoading}>
            {isLoading
              ? "Logging in... This may take up to a minute. Thanks for your patience!"
              : "Login"}
          </button>
        </form>
        <span>Still not a member?</span>
        <Link to="/register">Create an account</Link>
        {(errors.username || errors.password) && (
          <small className="error">
            {errors.username?.message || errors.password?.message}
          </small>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
