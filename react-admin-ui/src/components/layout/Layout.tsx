import Navbar from "../navbar/Navbar";

import Menu from "../menu/Menu";
import { Outlet } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <aside className="menuContainer">
          <Menu />
        </aside>
        <main className="contentContainer">
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
