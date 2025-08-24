import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className=" w-[25%] h-[100vh] flex flex-col justify-between bg-richBlack  text-textColor pt-14 px-10 font-roboto">
      <div className="">
        <h1 className="text-center text-2xl ">Dashboard</h1>
        <div className="flex flex-col gap-10 text-lg pt-16">
          <NavLink to="/overview">Overview</NavLink>
          <NavLink to="/expenses">Expenses</NavLink>
          <NavLink to="/investments">Investments</NavLink>
          <NavLink to="/insurances">Insurances</NavLink>
          {/* <NavLink to=''>Logout</NavLink> */}
        </div>
      </div>
      <div className="pb-8 flex justify-between items-center">
        <p>Dark/light Mode</p>
        <button className="w-[100px] h-[35px] bg-textColor rounded-full relative">
          <span className="bg-richBlack absolute top-1 left-1 rounded-full w-7 h-7"></span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
