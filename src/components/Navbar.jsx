import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm sticky top-0 z-50">

      {/* LOGO */}
      <h1 className="text-3xl font-bold">
        Kingu
      </h1>

      {/* MENU */}
      <ul className="hidden md:flex gap-10 text-gray-600 font-medium">

        <li className="hover:text-red-600 transition cursor-pointer">
          <Link to="/">
            Home
          </Link>
        </li>

        <li className="hover:text-red-600 transition cursor-pointer">
          <Link to="/about">
            About
          </Link>
        </li>

        <li className="hover:text-red-600 transition cursor-pointer">
          <Link to="/courses">
            Courses
          </Link>
        </li>

        <li className="hover:text-red-600 transition cursor-pointer">
          <Link to="/research">
            Research
          </Link>
        </li>

        <li className="hover:text-red-600 transition cursor-pointer">
          <Link to="/blog">
            Blog
          </Link>
        </li>

        <li className="hover:text-red-600 transition cursor-pointer">
          <Link to="/contact">
            Contact
          </Link>
        </li>

      </ul>

      {/* BUTTON */}
      <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300">

        Apply Now

      </button>

    </nav>

  );
}

export default Navbar;