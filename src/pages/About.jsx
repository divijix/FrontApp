import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import img from "../assets/about.jpg";

function About() {

  return (

    <div className="overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}

      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16 px-5 md:px-10 py-16 md:py-24 bg-[#f8f8f8]">

        {/* LEFT */}

        <div>

          <p className="text-red-500 font-semibold mb-4 text-sm md:text-base">

            ABOUT Divijix academy

          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">

            Building Future AI Innovators

          </h1>

          <p className="text-gray-600 mt-6 text-base md:text-lg leading-7 md:leading-8">

            Divijix academy is a next-generation AI learning platform focused on
            Artificial Intelligence, Machine Learning, Data Science,
            Full Stack AI Development, and Cloud Computing.

          </p>

          <p className="text-gray-600 mt-4 text-base md:text-lg leading-7 md:leading-8">

            We help students become industry-ready through real-world
            projects, expert mentorship, and advanced AI training.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-5 mt-10">

            <button className="bg-red-600 text-white px-6 md:px-7 py-3 rounded-xl hover:bg-red-700 transition duration-300">

              Explore Courses

            </button>

            <button className="border border-black px-6 md:px-7 py-3 rounded-xl hover:bg-black hover:text-white transition duration-300">

              Contact Us

            </button>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="flex justify-center">

          <img
            src={img}
            alt="About Kingu"
            className="w-full max-w-[550px] h-[300px] md:h-[500px] object-cover rounded-3xl shadow-2xl"
          />

        </div>

      </section>

      {/* STATS SECTION */}

      <section className="px-5 md:px-10 py-20 bg-white">

        <div className="text-center mb-16">

          <p className="text-red-500 font-semibold mb-3">

            OUR IMPACT

          </p>

          <h1 className="text-3xl md:text-5xl font-bold">

            Transforming Careers with AI

          </h1>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-[#f8f8f8] p-10 rounded-3xl shadow">

            <h1 className="text-5xl font-bold text-red-600">

              500+

            </h1>

            <p className="mt-4 text-gray-600 text-lg">

              Students Trained

            </p>

          </div>

          <div className="bg-[#f8f8f8] p-10 rounded-3xl shadow">

            <h1 className="text-5xl font-bold text-red-600">

              15+

            </h1>

            <p className="mt-4 text-gray-600 text-lg">

              AI Programs

            </p>

          </div>

          <div className="bg-[#f8f8f8] p-10 rounded-3xl shadow">

            <h1 className="text-5xl font-bold text-red-600">

              95%

            </h1>

            <p className="mt-4 text-gray-600 text-lg">

              Career Success

            </p>

          </div>

          <div className="bg-[#f8f8f8] p-10 rounded-3xl shadow">

            <h1 className="text-5xl font-bold text-red-600">

              100%

            </h1>

            <p className="mt-4 text-gray-600 text-lg">

              Practical Learning

            </p>

          </div>

        </div>

      </section>

      {/* MISSION SECTION */}

      <section className="px-5 md:px-10 py-20 bg-[#f8f8f8]">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* MISSION */}

          <div className="bg-white p-10 rounded-3xl shadow">

            <h1 className="text-3xl font-bold mb-6">

              Our Mission

            </h1>

            <p className="text-gray-600 leading-8 text-base md:text-lg">

              To make high-quality AI education accessible to every student
              and prepare them for the future of technology through
              practical learning.

            </p>

          </div>

          {/* VISION */}

          <div className="bg-white p-10 rounded-3xl shadow">

            <h1 className="text-3xl font-bold mb-6">

              Our Vision

            </h1>

            <p className="text-gray-600 leading-8 text-base md:text-lg">

              To become India’s leading AI innovation and training institute
              by empowering students with next-generation skills.

            </p>

          </div>

        </div>

      </section>

      {/* TEAM SECTION */}

      <section className="px-5 md:px-10 py-20 bg-white">

        <div className="text-center mb-16">

          <p className="text-red-500 font-semibold mb-3">

            OUR TEAM

          </p>

          <h1 className="text-3xl md:text-5xl font-bold">

            Meet Our Mentors

          </h1>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-[#f8f8f8] p-8 rounded-3xl text-center shadow">

            <div className="h-[220px] md:h-[250px] bg-gray-200 rounded-2xl mb-6"></div>

            <h1 className="text-2xl font-bold">

              Rahul Sharma

            </h1>

            <p className="text-red-500 mt-2">

              AI Engineer

            </p>

          </div>

          <div className="bg-[#f8f8f8] p-8 rounded-3xl text-center shadow">

            <div className="h-[220px] md:h-[250px] bg-gray-200 rounded-2xl mb-6"></div>

            <h1 className="text-2xl font-bold">

              Priya Patel

            </h1>

            <p className="text-red-500 mt-2">

              ML Expert

            </p>

          </div>

          <div className="bg-[#f8f8f8] p-8 rounded-3xl text-center shadow">

            <div className="h-[220px] md:h-[250px] bg-gray-200 rounded-2xl mb-6"></div>

            <h1 className="text-2xl font-bold">

              Arjun Verma

            </h1>

            <p className="text-red-500 mt-2">

              Data Scientist

            </p>

          </div>

          <div className="bg-[#f8f8f8] p-8 rounded-3xl text-center shadow">

            <div className="h-[220px] md:h-[250px] bg-gray-200 rounded-2xl mb-6"></div>

            <h1 className="text-2xl font-bold">

              Sneha Iyer

            </h1>

            <p className="text-red-500 mt-2">

              Cloud Architect

            </p>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );
}

export default About;