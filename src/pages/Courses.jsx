import React, { useState } from "react";

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

  /* FILTER STATE */

  const [selectedLevel, setSelectedLevel] = useState("All");

  /* SEARCH STATE */

  const [searchTerm, setSearchTerm] = useState("");

  /* FOUNDATION COURSES */

  const foundationCourses = [

    {
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      level: "Foundation",
      title: "Digital Marketing",
      description:
        "Master data-driven strategies, AI-powered content and performance marketing."
    },

    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      level: "Intermediate",
      title: "Data Science",
      description:
        "Extract actionable insights using statistical modeling and machine learning."
    },

    {
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      level: "Beginner",
      title: "Data Analysis",
      description:
        "Transform raw data into meaningful stories using Excel, SQL and analytics."
    }

  ];

  /* TECHNICAL COURSES */

  const technicalCourses = [

    {
      icon: <FaCode />,
      level: "Intermediate",
      title: "Full Stack AI Engineering",
      description:
        "Build modern AI-powered applications using React and APIs."
    },

    {
      icon: <FaBrain />,
      level: "Intermediate",
      title: "Generative AI",
      description:
        "Dive into LLMs, prompt engineering and AI tools."
    },

    {
      icon: <FaRobot />,
      level: "Advanced",
      title: "Agentic AI",
      description:
        "Create autonomous AI systems with minimal human intervention."
    },

    {
      icon: <FaSearch />,
      level: "Advanced",
      title: "RAG Systems",
      description:
        "Build Retrieval-Augmented Generation systems for enterprise AI."
    },

    {
      icon: <FaDatabase />,
      level: "Beginner",
      title: "Prompt Engineering",
      description:
        "Master prompting techniques for modern AI applications."
    },

    {
      icon: <FaRobot />,
      level: "Intermediate",
      title: "AI Workflow Automation",
      description:
        "Design AI automation pipelines for business operations."
    }

  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {foundationCourses.map((course, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"
            >

              <img
                src={course.image}
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

                <button className="font-semibold hover:text-red-600 transition">

                  Learn More →

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* TECHNICAL COURSES */}

      <section className="px-5 md:px-10 pb-24">

        <h1 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">

          AI Technical Specializations

        </h1>

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

                <button className="bg-black text-white px-5 py-3 rounded-lg text-sm hover:bg-gray-800 transition">

                  Enroll Now

                </button>

                <button className="font-medium hover:text-red-600 transition text-sm md:text-base">

                  Learn More

                </button>

              </div>

            </div>

          ))}

        </div>

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

            <form className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                  <label className="block mb-3 font-medium">

                    Full Name

                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block mb-3 font-medium">

                    Phone Number

                  </label>

                  <input
                    type="text"
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
                  placeholder="name@company.com"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="block mb-3 font-medium">

                  Course of Interest

                </label>

                <select className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none">

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
                  placeholder="Tell us about your career goals..."
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none resize-none"
                ></textarea>

              </div>

              <button className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition">

                Send Inquiry →

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