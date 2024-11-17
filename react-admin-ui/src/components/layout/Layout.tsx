import Navbar from "../navbar/Navbar";

import Menu from "../menu/Menu";
import { Outlet } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeContet";
import Footer from "../footer/Footer";

const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="main">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="container">
        <aside className="menuContainer">
          <Menu />
        </aside>
        <main className="contentContainer">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
