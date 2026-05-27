import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {

  /* MOBILE MENU */

  const [menuOpen, setMenuOpen] = useState(false);

  /* FORM MODAL */

  const [showForm, setShowForm] = useState(false);

  /* FORM STATE */

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    linkedin: "",
    college: "",
    passout: "",
    resume: null

  });

  /* HANDLE INPUT */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,
      [name]: value

    });

  };

  /* HANDLE FILE */

  const handleFileChange = (e) => {

    setFormData({

      ...formData,
      resume: e.target.files[0]

    });

  };

  /* HANDLE SUBMIT */

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    alert("Application Submitted Successfully 🚀");

    setShowForm(false);

  };

  return (

    <>

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-5 md:px-10 py-5 md:py-6 bg-white shadow-sm sticky top-0 z-50">

        {/* LOGO */}

        <h1 className="text-2xl md:text-3xl font-bold">

          Kingu

        </h1>

        {/* DESKTOP MENU */}

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

        {/* DESKTOP BUTTON */}

        <button
          onClick={() => setShowForm(true)}
          className="hidden md:block bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300"
        >

          Apply Now

        </button>

        {/* MOBILE MENU ICON */}

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? <FaTimes /> : <FaBars />}

        </button>

        {/* MOBILE MENU */}

        <div
          className={`absolute top-[80px] left-0 w-full bg-white shadow-lg transition-all duration-300 md:hidden ${
            menuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >

          <ul className="flex flex-col items-center gap-8 py-10 text-gray-700 font-medium">

            <li onClick={() => setMenuOpen(false)}>

              <Link to="/">
                Home
              </Link>

            </li>

            <li onClick={() => setMenuOpen(false)}>

              <Link to="/about">
                About
              </Link>

            </li>

            <li onClick={() => setMenuOpen(false)}>

              <Link to="/courses">
                Courses
              </Link>

            </li>

            <li onClick={() => setMenuOpen(false)}>

              <Link to="/research">
                Research
              </Link>

            </li>

            <li onClick={() => setMenuOpen(false)}>

              <Link to="/blog">
                Blog
              </Link>

            </li>

            <li onClick={() => setMenuOpen(false)}>

              <Link to="/contact">
                Contact
              </Link>

            </li>

            <button
              onClick={() => {
                setShowForm(true);
                setMenuOpen(false);
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300"
            >

              Apply Now

            </button>

          </ul>

        </div>

      </nav>

      {/* FORM MODAL */}

      {showForm && (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 md:p-10 relative overflow-y-auto max-h-[90vh]">

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setShowForm(false)}
              className="absolute top-5 right-5 text-2xl"
            >

              ✕

            </button>

            {/* TITLE */}

            <h1 className="text-3xl md:text-4xl font-bold mb-2">

              Apply Now

            </h1>

            <p className="text-gray-500 mb-8">

              Fill the application form to join Kingu AI Academy.

            </p>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}

              <div>

                <label className="block mb-2 font-medium">

                  Full Name *

                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block mb-2 font-medium">

                  Email *

                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block mb-2 font-medium">

                  Phone Number *

                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500"
                />

              </div>

              {/* LINKEDIN */}

              <div>

                <label className="block mb-2 font-medium">

                  LinkedIn ID *

                </label>

                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500"
                />

              </div>

              {/* COLLEGE */}

              <div>

                <label className="block mb-2 font-medium">

                  College Name *

                </label>

                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500"
                />

              </div>

              {/* PASSOUT YEAR */}

              <div>

                <label className="block mb-2 font-medium">

                  Passout Year *

                </label>

                <input
                  type="calendar"
                  name="passout"
                  value={formData.passout}
                  onChange={handleChange}
                  placeholder="2026"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500"
                />

              </div>

              {/* RESUME */}

              <div>

                <label className="block mb-2 font-medium">

                  Upload Resume *

                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4"
                />

              </div>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 transition duration-300 font-semibold"
              >

                Submit Application 🚀

              </button>

            </form>

          </div>

        </div>

      )}

    </>

  );
}

export default Navbar;