import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/logout",
        {},
        { withCredentials: true }
      );

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed w-[20%] h-[100vh] flex flex-col justify-between bg-richBlack  text-textColor pt-14 px-10 font-roboto">
      <div className="">
        <h1 className="text-center text-2xl ">Dashboard</h1>
        <div className="flex flex-col gap-10 text-lg pt-16">
          <NavLink to="/overview">Overview</NavLink>
          <NavLink to="/expenses">Expenses</NavLink>
          <NavLink to="/investments">Investments</NavLink>
          <NavLink to="/incomes">Income</NavLink>
        </div>
      </div>
      <div className="pb-8 flex justify-between items-center">
        <button
          onClick={() => handleLogout()}
          className="cursor-pointer relative"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
