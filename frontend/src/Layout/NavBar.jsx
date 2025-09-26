import React from "react";

function NavBar() {
  return (
    <nav className="flex justify-between items-center px-20 fixed w-full bg-textColor text-richBlack py-4">
      <div>
        <h1 className="text-5xl italic">FinTrack</h1>
      </div>
      <div>
        <ul className="flex gap-10 text-lg">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#testimonial">Testimonial</a>
          </li>
          <li>
            <a href="#choose-us">Why choose us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
