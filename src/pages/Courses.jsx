import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import training from "../assets/Top-Software-Training-Institutes-in-Chennai.jpg";

import {
  FaRobot,
  FaBrain,
  FaCode,
  FaDatabase,
  FaSearch,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

function Courses() {
  const navigate = useNavigate();

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to enroll in courses.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to enroll in course");
      }

      alert("Enrollment successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  /* FILTER STATE */

  const [selectedLevel, setSelectedLevel] = useState("All");

  /* SEARCH STATE */

  const [searchTerm, setSearchTerm] = useState("");

  /* FETCHED COURSES STATE */
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");

  const iconMap = {
    FaCode: <FaCode />,
    FaBrain: <FaBrain />,
    FaRobot: <FaRobot />,
    FaSearch: <FaSearch />,
    FaDatabase: <FaDatabase />,
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error("Failed to load courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setCoursesError(err.message);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  /* FOUNDATION COURSES (FILTERED FROM FETCHED DATA) */
  const foundationCourses = courses.filter(course => !course.is_technical);

  /* TECHNICAL COURSES (FILTERED FROM FETCHED DATA) */
  const technicalCourses = courses.filter(course => course.is_technical).map(course => ({
    ...course,
    icon: iconMap[course.icon_name] || <FaCode />
  }));

  /* INQUIRY FORM STATE */
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "Select a course",
    message: ""
  });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState({ type: "", message: "" });

  const handleInquiryChange = (e) => {
    setInquiryForm({
      ...inquiryForm,
      [e.target.name]: e.target.value
    });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (inquiryForm.course === "Select a course") {
      setInquiryStatus({ type: "error", message: "Please select a course of interest." });
      return;
    }
    setInquiryLoading(true);
    setInquiryStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setInquiryStatus({ type: "success", message: "Your inquiry has been submitted successfully!" });
      setInquiryForm({
        name: "",
        phone: "",
        email: "",
        course: "Select a course",
        message: ""
      });
    } catch (err) {
      setInquiryStatus({ type: "error", message: err.message });
    } finally {
      setInquiryLoading(false);
    }
  };

  /* FILTER LOGIC */

  const filteredCourses = technicalCourses.filter((course) => {

    const matchesLevel =
      selectedLevel === "All" ||
      course.level === selectedLevel;

    const matchesSearch =
      course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesLevel && matchesSearch;

  });

  return (

    <div className="bg-[#f5f5f5] min-h-screen overflow-hidden">

      <Navbar />

      {/* HERO */}

      <section className="px-5 md:px-10 py-16 md:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* LEFT */}

          <div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">

              World-Class Training for the AI Era

            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-7 md:leading-8 mb-10">

              Master the complex domains of Digital Marketing,
              Data Science, Data Analysis and advanced AI systems.

            </p>

            <div className="flex flex-wrap gap-4">

              <button className="border border-gray-300 px-5 py-3 rounded-xl bg-white text-sm md:text-base">

                Advanced AI

              </button>

              <button className="border border-gray-300 px-5 py-3 rounded-xl bg-white text-sm md:text-base">

                Data Science

              </button>

              <button className="border border-gray-300 px-5 py-3 rounded-xl bg-white text-sm md:text-base">

                Marketing

              </button>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          <div>

            <img
              src={training}
              alt="Training"
              className="w-full h-[250px] sm:h-[320px] md:h-[420px] object-cover rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* FILTERS */}

      <section className="px-5 md:px-10 pb-16 md:pb-20">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          {/* FILTER BUTTONS */}

          <div className="flex flex-wrap gap-4">

            {["All", "Beginner", "Intermediate", "Advanced"].map((level, index) => (

              <button
                key={index}
                onClick={() => setSelectedLevel(level)}
                className={`px-5 py-3 rounded-xl border text-sm md:text-base transition ${
                  selectedLevel === level
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >

                {level}

              </button>

            ))}

          </div>

          {/* SEARCH */}

          <div className="bg-white px-5 py-3 rounded-xl flex items-center gap-4 border border-gray-300 w-full lg:w-[320px]">

            <FaSearch className="text-gray-500" />

            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent w-full text-sm md:text-base"
            />

          </div>

        </div>

      </section>

      {/* FOUNDATION COURSES */}

      <section className="px-5 md:px-10 pb-20 md:pb-24">

        <h1 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">

          Foundation Career Tracks

        </h1>

        {coursesLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : coursesError ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center font-semibold border border-red-200">
            {coursesError}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {foundationCourses.map((course, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"
              >

                <img
                  src={course.image_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
                  alt=""
                  className="w-full h-[220px] md:h-[260px] object-cover"
                />

                <div className="p-6 md:p-8">

                  <p className="text-gray-500 text-sm mb-3">

                    {course.level}

                  </p>

                  <h1 className="text-2xl font-bold mb-4">

                    {course.title}

                  </h1>

                  <p className="text-gray-600 leading-7 text-sm md:text-base mb-8">

                    {course.description}

                  </p>

                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">

                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-gray-800 transition"
                    >
                      Enroll Now
                    </button>

                    <button className="font-semibold hover:text-red-600 transition text-xs">

                      Learn More →

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* TECHNICAL COURSES */}

      <section className="px-5 md:px-10 pb-24">

        <h1 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">

          AI Technical Specializations

        </h1>

        {coursesLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : coursesError ? (
          null
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredCourses.map((course, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl p-6 md:p-8 shadow hover:shadow-2xl transition"
              >

                {/* TOP */}

                <div className="flex justify-between items-center mb-8">

                  <div className="bg-black text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl">

                    {course.icon}

                  </div>

                  <span className="text-xs bg-gray-100 px-3 py-2 rounded-lg">

                    {course.level}

                  </span>

                </div>

                {/* TITLE */}

                <h1 className="text-2xl font-bold mb-4">

                  {course.title}

                </h1>

                {/* DESCRIPTION */}

                <p className="text-gray-600 leading-7 text-sm md:text-base mb-10">

                  {course.description}

                </p>

                {/* BUTTONS */}

                <div className="flex justify-between items-center">

                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="bg-black text-white px-5 py-3 rounded-lg text-sm hover:bg-gray-800 transition"
                  >

                    Enroll Now

                  </button>

                  <button className="font-medium hover:text-red-600 transition text-sm md:text-base">

                    Learn More

                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* CONTACT FORM */}

      <section className="px-5 md:px-10 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* LEFT */}

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">

              Find Your Career Path

            </h1>

            <p className="text-gray-600 leading-8 mb-10">

              Our admissions advisors are here to help you navigate
              the AI landscape. Schedule a consultation or send us
              an inquiry about any program.

            </p>

            <div className="space-y-6">

              <div className="flex items-center gap-5">

                <div className="bg-white p-4 rounded-xl shadow">

                  <FaPhoneAlt />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    CALL US
                  </p>

                  <h1 className="font-semibold">
                    +91  9628718599,
                  </h1>

                </div>

              </div>

              <div className="flex items-center gap-5">

                <div className="bg-white p-4 rounded-xl shadow">

                  <FaEnvelope />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    EMAIL US
                  </p>

                  <h1 className="font-semibold">
                    divijixtechnology@zohomail.in
                  </h1>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT FORM */}

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow">

            {inquiryStatus.message && (
              <div
                className={`p-4 rounded-2xl mb-6 text-center text-sm font-semibold border ${
                  inquiryStatus.type === "success"
                    ? "bg-green-50 text-green-600 border-green-200"
                    : "bg-red-50 text-red-600 border-red-200"
                }`}
              >
                {inquiryStatus.message}
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                  <label className="block mb-3 font-medium">

                    Full Name

                  </label>

                  <input
                    type="text"
                    name="name"
                    value={inquiryForm.name}
                    onChange={handleInquiryChange}
                    placeholder="Enter your name"
                    required
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block mb-3 font-medium">

                    Phone Number

                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={inquiryForm.phone}
                    onChange={handleInquiryChange}
                    placeholder="+91"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
                  />

                </div>

              </div>

              <div>

                <label className="block mb-3 font-medium">

                  Email Address

                </label>

                <input
                  type="email"
                  name="email"
                  value={inquiryForm.email}
                  onChange={handleInquiryChange}
                  placeholder="name@company.com"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="block mb-3 font-medium">

                  Course of Interest

                </label>

                <select
                  name="course"
                  value={inquiryForm.course}
                  onChange={handleInquiryChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
                >

                  <option>Select a course</option>

                  <option>Generative AI</option>

                  <option>Data Science</option>

                  <option>Prompt Engineering</option>

                </select>

              </div>

              <div>

                <label className="block mb-3 font-medium">

                  Message

                </label>

                <textarea
                  rows="5"
                  name="message"
                  value={inquiryForm.message}
                  onChange={handleInquiryChange}
                  placeholder="Tell us about your career goals..."
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none resize-none"
                ></textarea>

              </div>

              <button
                type="submit"
                disabled={inquiryLoading}
                className={`w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition ${
                  inquiryLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >

                {inquiryLoading ? "Sending Inquiry..." : "Send Inquiry →"}

              </button>

            </form>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );

}

export default Courses;