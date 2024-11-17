import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

import "./styles/global.scss";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Coins from "./pages/coins/Coins";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes";
import Coin from "./pages/coin/Coin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Portfolio from "./pages/portfolio/Portfolio";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Profile from "./pages/profile/Profile";
import AboutUs from "./pages/aboutUs/AboutUs";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
                <Route element={<PrivateRoutes />}>
                  <Route index element={<Home />} />
                  <Route path="coins" element={<Coins />} />
                  <Route path="coins/:id" element={<Coin />} />
                  <Route path="portfolio" element={<Portfolio />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="about" element={<AboutUs />} />
                </Route>
              </Route>

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          reverseOrder={false}
          autoClose={1000}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
