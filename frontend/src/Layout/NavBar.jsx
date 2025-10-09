import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
  const [showNavBar, setShowNavBar] = useState(false);
  const navigate = useNavigate();

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex justify-between items-center fixed w-full z-50 bg-richBlack text-textColor py-4 max-sm:px-5 max-md:px-10 md:px-20 shadow-lg min-[2000px]:mx-auto min-[2000px]:max-w-[100rem]">
        {/* Logo */}
        <div className="">
          <h1 className="text-5xl italic">FinTrack</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
          <ul className="flex gap-10 text-lg">
            <li>
              <a href="#home" className="hover:text-gray-300 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-gray-300 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#testimonial"
                className="hover:text-gray-300 transition-colors"
              >
                Testimonial
              </a>
            </li>
          </ul>
          <button
            onClick={() => navigate("/signin")}
            className="bg-textColor text-richBlack rounded-sm px-4 py-2 cursor-pointer hover:scale-105 transition-transform"
          >
            Sign In
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setShowNavBar((prev) => !prev)}
        >
          {showNavBar ? (
            // X icon when menu open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon when closed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Dropdown Menu with Animation */}
      <AnimatePresence>
        {showNavBar && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden flex flex-col justify-center gap-10 items-center bg-richBlack pb-10 border-t-4 border-textColor pt-24 text-textColor shadow-lg fixed w-full"
          >
            <ul className="flex flex-col text-center gap-8 text-lg">
              {["home", "about", "testimonial"].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={() => setShowNavBar(false)}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                navigate("/signin");
                setShowNavBar(false);
              }}
              className="bg-textColor text-richBlack rounded-sm px-4 py-2 cursor-pointer hover:scale-105 transition-transform"
            >
              Sign In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
