import { Link } from "react-router-dom";
import "./loginForm.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

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
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters long",
                },
              })}
            />
          </div>
          <div className="input">
            <label htmlFor="password"></label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
              })}
            />
          </div>
          <button disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <span>or</span>
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
