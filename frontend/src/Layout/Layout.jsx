import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex gap-10 min-[2000px]:mx-auto min-[2000px]:max-w-[100rem]">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;
