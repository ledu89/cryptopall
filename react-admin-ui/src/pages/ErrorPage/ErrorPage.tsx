import { Button } from "@mui/material";
import "./errorPage.scss";
import React from "react";
import { Link, useLocation } from "react-router-dom";
type ErrorProps = {
  error?: object | null;
};
const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  const errorMessage = error?.message || "An unexpected error occurred.";
  return (
    <div className="errorPage">
      <h1>Oops! Something went wrong.</h1>
      <p>{errorMessage}.</p>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#8884d8",
          "&:hover": {
            backgroundColor: "#8884d8",
          },
        }}
      >
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
