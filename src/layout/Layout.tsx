import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./styles/index.css";

const Layout: React.FC = () => {
  return (
    <div className="container">
      <Header></Header>
      <div className="content">
        <Sidebar />
        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
