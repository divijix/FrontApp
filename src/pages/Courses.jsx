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

  /* FOUNDATION COURSES JSON */
  const foundationCourses = [

    {
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      level: "Foundation",
      title: "Digital Marketing",
      description:
        "Master data-driven strategies, AI-powered content and performance marketing."
    },

    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      level: "Intermediate",
      title: "Data Science",
      description:
        "Extract actionable insights using statistical modeling and machine learning."
    },

    {
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      level: "Beginner",
      title: "Data Analysis",
      description:
        "Transform raw data into meaningful stories using Excel, SQL and analytics."
    }

  ];

  /* TECHNICAL COURSES JSON */
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

    <div className="bg-[#f5f5f5] min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="px-10 py-24">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <h1 className="text-6xl font-bold leading-tight mb-8">
              World-Class Training for the AI Era
            </h1>

            <p className="text-gray-600 leading-8 text-lg mb-10">
              Master the complex domains of Digital Marketing,
              Data Science, Data Analysis and advanced AI systems.
            </p>

            <div className="flex gap-4 flex-wrap">

              <button className="border border-gray-300 px-6 py-3 rounded-xl">
                Advanced AI
              </button>

              <button className="border border-gray-300 px-6 py-3 rounded-xl">
                Data Science
              </button>

              <button className="border border-gray-300 px-6 py-3 rounded-xl">
                Marketing
              </button>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">

            <img
              src={training}
              alt="training"
              className="w-full h-[450px] object-cover"
            />

          </div>

        </div>

      </section>

      {/* FILTERS */}
      <section className="px-10 pb-20">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* BUTTONS */}
          <div className="flex gap-4 flex-wrap">

            {["All","Beginner","Intermediate","Advanced"].map((level,index)=>(

              <button
                key={index}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-3 rounded-xl border transition ${
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
          <div className="bg-white px-5 py-3 rounded-xl flex items-center gap-4 border border-gray-300">

            <FaSearch className="text-gray-500" />

            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="outline-none bg-transparent"
            />

          </div>

        </div>

      </section>

      {/* FOUNDATION COURSES */}
      <section className="px-10 pb-24">

        <h1 className="text-5xl font-bold mb-16">
          Foundation Career Tracks
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          {foundationCourses.map((course,index)=>(

            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"
            >

              <img
                src={course.image}
                alt=""
                className="w-full h-[250px] object-cover"
              />

              <div className="p-8">

                <p className="text-sm text-gray-500 mb-3">
                  {course.level}
                </p>

                <h1 className="text-3xl font-bold mb-5">
                  {course.title}
                </h1>

                <p className="text-gray-600 leading-7 mb-8">
                  {course.description}
                </p>

                <button className="font-semibold">
                  Learn More →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* TECHNICAL COURSES */}
      <section className="px-10 pb-24">

        <h1 className="text-5xl font-bold mb-16">
          AI Technical Specializations
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          {filteredCourses.map((course,index)=>(

            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow hover:shadow-2xl transition"
            >

              {/* TOP */}
              <div className="flex justify-between items-center mb-10">

                <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl">

                  {course.icon}

                </div>

                <p className="text-sm bg-gray-100 px-4 py-2 rounded-lg">
                  {course.level}
                </p>

              </div>

              {/* TITLE */}
              <h1 className="text-3xl font-bold mb-5">
                {course.title}
              </h1>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-8 mb-10">
                {course.description}
              </p>

              {/* BUTTONS */}
              <div className="flex justify-between items-center">

                <button className="bg-black text-white px-5 py-3 rounded-xl">

                  Enroll Now

                </button>

                <button className="font-semibold">
                  Learn More
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FORM SECTION */}
      <section className="px-10 pb-28">

        <div className="grid md:grid-cols-2 gap-20">

          {/* LEFT */}
          <div>

            <h1 className="text-6xl font-bold mb-10">
              Find Your Career Path
            </h1>

            <p className="text-gray-600 leading-8 text-lg mb-12">
              Our admissions advisors are here to help you
              navigate the AI landscape.
            </p>

            <div className="space-y-8">

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow">

                  <FaPhoneAlt />

                </div>

                <div>

                  <p className="text-gray-500">
                    CALL US
                  </p>

                  <h1 className="font-semibold">
                    +91 9876543210
                  </h1>

                </div>

              </div>

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow">

                  <FaEnvelope />

                </div>

                <div>

                  <p className="text-gray-500">
                    EMAIL US
                  </p>

                  <h1 className="font-semibold">
                    hello@kingu.ai
                  </h1>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="bg-white p-10 rounded-3xl shadow">

            <form className="space-y-8">

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded-xl px-5 py-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="+91"
                  className="border border-gray-300 rounded-xl px-5 py-4 outline-none"
                />

              </div>

              <input
                type="email"
                placeholder="name@company.com"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none"
              />

              <select className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none">

                <option>Select a course</option>

                <option>Generative AI</option>

                <option>Data Science</option>

                <option>Prompt Engineering</option>

              </select>

              <textarea
                rows="6"
                placeholder="Tell us about your career goals..."
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none resize-none"
              ></textarea>

              <button className="w-full bg-black text-white py-5 rounded-xl hover:bg-gray-800 transition">

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