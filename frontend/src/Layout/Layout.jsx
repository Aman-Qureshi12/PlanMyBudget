import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex gap-10">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;
