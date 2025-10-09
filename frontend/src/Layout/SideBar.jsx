import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import CloseButton from "../Components/CloseButton";

const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden pt-6 pl-3 fixed z-50">
        <button onClick={() => setShowSideBar(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fcfafa"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Mobile sidebar with animation */}
        <AnimatePresence>
          {showSideBar && (
            <motion.div
              key="sidebar"
              initial={{ x: -250, opacity: 0 }} // when appearing
              animate={{ x: 0, opacity: 1 }} // while visible
              exit={{ x: -250, opacity: 0 }} // when leaving
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed z-50 top-0 left-0 w-[250px] h-[100vh]  bg-black text-textColor flex flex-col justify-between font-roboto "
            >
              <div className="text-sm text-gray-400 text-left pt-3 pl-3">
                <CloseButton OnClick={() => setShowSideBar(false)} />
              </div>
              {/* <button
                onClick={() => setShowSideBar(false)}
                
              ></button> */}
              <div className="">
                <h1 className="text-center text-2xl">Dashboard</h1>
                <div className="flex flex-col gap-10 px-5 text-lg pt-16">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "bg-textColor text-richBlack px-3 py-2 rounded-sm transition-colors duration-500 ease-in-out"
                        : "px-3 py-2 transition-colors duration-500 ease-in-out rounded-sm"
                    }
                    to="/overview"
                  >
                    Overview
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "bg-textColor text-richBlack px-3 py-2 rounded-sm transition-colors duration-500 ease-in-out"
                        : "px-3 py-2 transition-colors duration-500 ease-in-out rounded-sm"
                    }
                    to="/expenses"
                  >
                    Expenses
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "bg-textColor text-richBlack px-3 py-2 rounded-sm transition-colors duration-500 ease-in-out"
                        : "px-3 py-2 transition-colors duration-500 ease-in-out rounded-sm"
                    }
                    to="/investments"
                  >
                    Investments
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "bg-textColor text-richBlack px-3 py-2 rounded-sm transition-colors duration-500 ease-in-out"
                        : "px-3 py-2 transition-colors duration-500 ease-in-out rounded-sm"
                    }
                    to="/incomes"
                  >
                    Income
                  </NavLink>
                </div>
              </div>
              <div className="pb-8    px-8">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer relative"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sidebar (always visible) */}
      <div className="hidden lg:flex fixed z-40  w-[20%] h-[100vh] flex-col justify-between bg-black text-textColor pt-14 px-10 font-roboto 2xl:w-[300px]">
        <div>
          <h1 className="text-center text-2xl">Dashboard</h1>
          <div className="flex flex-col gap-10 text-lg pt-16">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-textColor text-richBlack px-3 py-2 rounded-sm transition-colors duration-500 ease-in-out"
                  : "px-3 py-2 transition-colors duration-500 ease-in-out rounded-sm"
              }
              to="/overview"
            >
              Overview
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-textColor text-richBlack px-3 py-2 rounded-sm transition-colors duration-500 ease-in-out"
                  : "px-3 py-2 transition-colors duration-500 ease-in-out rounded-sm"
              }
              to="/expenses"
            >
              Expenses
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-textColor text-richBlack px-3 py-2 rounded-sm transition-colors duration-500 ease-in-out"
                  : "px-3 py-2 transition-colors duration-500 ease-in-out rounded-sm"
              }
              to="/investments"
            >
              Investments
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-textColor text-richBlack px-3 py-2 rounded-sm transition-colors duration-500 ease-in-out"
                  : "px-3 py-2 transition-colors duration-500 ease-in-out rounded-sm"
              }
              to="/incomes"
            >
              Income
            </NavLink>
          </div>
        </div>
        <div className="pb-8 flex justify-between items-center ">
          <button onClick={handleLogout} className="cursor-pointer relative ">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
