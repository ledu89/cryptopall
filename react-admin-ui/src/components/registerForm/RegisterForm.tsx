import { Link } from "react-router-dom";
import "./registerForm.scss";
import { useForm } from "react-hook-form";

import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const { register: registerUser, isLoading } = useAuth();
  const onSubmit = async (data) => {
    await registerUser(data);
  };

  return (
    <div className="registerForm">
      <div className="rightImg">
        <img src="/register.jpg" alt="" />
      </div>
      <div className="left">
        <h1>Wellcome to Cryptopall</h1>
        <small>Access real-time crypto market data and insights.</small>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label htmlFor="fullName"></label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Fullname is required",
                minLength: {
                  value: 4,
                  message: "Fullname must be at least 4 characters long",
                },
              })}
            />
          </div>
          <div className="input">
            <label htmlFor="userName"></label>
            <input
              id="userName"
              type="text"
              placeholder="Enter your user name"
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
            <label htmlFor="email"></label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
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
                  value: 4,
                  message: "Password needs a minimum of 4 characters",
                },
              })}
            />
          </div>
          <div className="input">
            <label htmlFor="confirm"></label>
            <input
              id="confirm"
              type="password"
              placeholder="Confirm password"
              {...register("confirmPass", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
          </div>
          <button disabled={isLoading}>
            {isLoading
              ? "Please wait. Registration can take up to 1 min"
              : "Register"}
          </button>
        </form>
        <span>Already have account?</span>
        <Link to="/login">Log In</Link>
        {(errors.fullName ||
          errors.username ||
          errors.email ||
          errors.password ||
          errors.confirmPass) && (
          <small className="error">
            {errors.fullName?.message ||
              errors.username?.message ||
              errors.email?.message ||
              errors.password?.message ||
              errors.confirmPass?.message}
          </small>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
