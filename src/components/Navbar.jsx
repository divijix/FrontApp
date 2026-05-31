import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  /* MOBILE MENU */
  const [menuOpen, setMenuOpen] = useState(false);

  /* FORM MODAL */
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* AUTH STATE */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedin,
          college: formData.college,
          passout: formData.passout
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      alert("Application Submitted Successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        college: "",
        passout: "",
        resume: null
      });
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-5 md:px-10 py-5 md:py-6 bg-white shadow-sm sticky top-0 z-50">
        {/* LOGO */}
        <Link to="/" className="text-2xl md:text-3xl font-bold hover:opacity-90 transition">
          Divijix academy
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-10 text-gray-600 font-medium items-center">
          <li className="hover:text-red-600 transition cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-red-600 transition cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-red-600 transition cursor-pointer">
            <Link to="/courses">Courses</Link>
          </li>
          <li className="hover:text-red-600 transition cursor-pointer">
            <Link to="/research">Research</Link>
          </li>
          <li className="hover:text-red-600 transition cursor-pointer">
            <Link to="/community">Community</Link>
          </li>
          <li className="hover:text-red-600 transition cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
          {isLoggedIn ? (
            <li className="hover:text-red-600 transition cursor-pointer">
              <Link to="/dashboard" className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition">
                Dashboard
              </Link>
            </li>
          ) : (
            <li className="hover:text-red-600 transition cursor-pointer">
              <Link to="/login" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* DESKTOP BUTTON */}
        <button
          onClick={() => setShowForm(true)}
          className="hidden md:block bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300 font-semibold text-sm"
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
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <ul className="flex flex-col items-center gap-8 py-10 text-gray-700 font-medium">
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/about">About</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/courses">Courses</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/research">Research</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/community">Community</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/contact">Contact</Link>
            </li>
            {isLoggedIn ? (
              <li onClick={() => setMenuOpen(false)}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : (
              <li onClick={() => setMenuOpen(false)}>
                <Link to="/login">Login</Link>
              </li>
            )}
            <button
              onClick={() => {
                setShowForm(true);
                setMenuOpen(false);
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300 text-sm font-semibold"
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
              className="absolute top-5 right-5 text-2xl hover:text-gray-600 transition"
            >
              ✕
            </button>

            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Apply Now</h1>
            <p className="text-gray-500 mb-8">Fill the application form to join Divijix Academy.</p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div className="text-left">
                <label className="block mb-2 font-medium text-sm text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500 text-sm"
                />
              </div>

              {/* EMAIL */}
              <div className="text-left">
                <label className="block mb-2 font-medium text-sm text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500 text-sm"
                />
              </div>

              {/* PHONE */}
              <div className="text-left">
                <label className="block mb-2 font-medium text-sm text-gray-700">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500 text-sm"
                />
              </div>

              {/* LINKEDIN */}
              <div className="text-left">
                <label className="block mb-2 font-medium text-sm text-gray-700">LinkedIn Profile *</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500 text-sm"
                />
              </div>

              {/* COLLEGE */}
              <div className="text-left">
                <label className="block mb-2 font-medium text-sm text-gray-700">College Name *</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500 text-sm"
                />
              </div>

              {/* PASSOUT YEAR */}
              <div className="text-left">
                <label className="block mb-2 font-medium text-sm text-gray-700">Passout Year *</label>
                <input
                  type="text"
                  name="passout"
                  value={formData.passout}
                  onChange={handleChange}
                  placeholder="2026"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500 text-sm"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 transition duration-300 font-semibold text-sm shadow-sm"
              >
                {submitting ? "Submitting Application..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;