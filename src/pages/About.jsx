import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from "../assets/about.jpg";

import {
  FaLightbulb,
  FaTrophy,
  FaShieldAlt,
  FaSyncAlt
} from "react-icons/fa";

function About() {

  const values = [

    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description:
        "We constantly explore modern AI technologies and ideas."
    },

    {
      icon: <FaTrophy />,
      title: "Excellence",
      description:
        "Delivering high-quality education and real-world outcomes."
    },

    {
      icon: <FaShieldAlt />,
      title: "Integrity",
      description:
        "Maintaining transparency, trust and ethical AI practices."
    },

    {
      icon: <FaSyncAlt />,
      title: "Continuous Learning",
      description:
        "Encouraging growth, experimentation and lifelong learning."
    }

  ];

  return (

    <div className="bg-[#f5f5f5] overflow-hidden">

      <Navbar />

      {/* HERO */}
      <section className="px-5 md:px-10 py-20 md:py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* LEFT */}
          <div>

            <p className="text-sm tracking-widest text-gray-500 mb-5">
              ESTABLISHED 2024
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">

              Shaping the AI <br />
              Talent of <span className="text-gray-500">Tomorrow</span>

            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-7 md:leading-8 mt-10 max-w-xl">

              Kingu Training & Research Institute democratizes
              world-class education to create a generation
              of leaders solving real-world problems
              through artificial intelligence.

            </p>

            <button className="mt-10 bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-gray-800 transition">

              Explore Programs →

            </button>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">

            <img
              src={img}
              alt="About"
              className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl shadow-xl"
            />

            {/* FLOATING CARD */}
            <div className="absolute bottom-6 left-6 bg-white px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-2xl">

              <h1 className="text-2xl md:text-3xl font-bold">
                95%
              </h1>

              <p className="text-gray-500 text-xs md:text-sm tracking-widest">
                CAREER SUCCESS
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="bg-[#020617] text-white py-14">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center px-5 md:px-10">

          <div>

            <h1 className="text-3xl md:text-5xl font-bold">
              500+
            </h1>

            <p className="mt-3 text-gray-400 text-sm md:text-base">
              STUDENTS TRAINED
            </p>

          </div>

          <div>

            <h1 className="text-3xl md:text-5xl font-bold">
              15+
            </h1>

            <p className="mt-3 text-gray-400 text-sm md:text-base">
              AI PROGRAMS
            </p>

          </div>

          <div>

            <h1 className="text-3xl md:text-5xl font-bold">
              100%
            </h1>

            <p className="mt-3 text-gray-400 text-sm md:text-base">
              ONLINE LEARNING
            </p>

          </div>

          <div>

            <h1 className="text-3xl md:text-5xl font-bold">
              95%
            </h1>

            <p className="mt-3 text-gray-400 text-sm md:text-base">
              CAREER SUCCESS
            </p>

          </div>

        </div>

      </section>

      {/* STORY */}
      <section className="px-5 md:px-10 py-20 md:py-28">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">

          {/* LEFT */}
          <div>

            <p className="text-gray-500 mb-4 tracking-widest">
              OUR STORY
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Where It All Began
            </h1>

          </div>

          {/* RIGHT */}
          <div>

            <p className="text-gray-600 leading-7 md:leading-8">

              Kingu was established to address the shortage
              of skilled AI practitioners. We bridge the gap
              between education and industry with real-world training.

            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

              <div className="bg-white p-6 md:p-8 rounded-3xl shadow">

                <h1 className="text-2xl font-bold mb-4">
                  Industry Driven
                </h1>

                <p className="text-gray-600 leading-7">
                  Built with real industry requirements.
                </p>

              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl shadow">

                <h1 className="text-2xl font-bold mb-4">
                  Modern Stack
                </h1>

                <p className="text-gray-600 leading-7">
                  AI Agents, LLMs, RAG and Cloud technologies.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* VISION + MISSION */}
      <section className="px-5 md:px-10 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* VISION */}
          <div className="bg-white p-6 md:p-12 rounded-3xl shadow hover:shadow-2xl transition">

            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Our Vision
            </h1>

            <p className="text-gray-600 leading-7 md:leading-8">

              To become a leading force in AI education
              and innovation worldwide.

            </p>

          </div>

          {/* MISSION */}
          <div className="bg-white p-6 md:p-12 rounded-3xl shadow hover:shadow-2xl transition">

            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h1>

            <p className="text-gray-600 leading-7 md:leading-8">

              To empower students with modern AI skills
              and real-world expertise.

            </p>

          </div>

        </div>

      </section>

      {/* VALUES */}
      <section className="px-5 md:px-10 py-20 md:py-24">

        {/* TITLE */}
        <div className="text-center mb-20">

          <p className="text-gray-500 mb-4 tracking-widest">
            WHAT WE STAND FOR
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Our Core Values
          </h1>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {values.map((item, index) => (

            <div
              key={index}
              className="bg-white p-6 md:p-10 rounded-3xl shadow hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >

              {/* ICON */}
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-black text-white text-3xl mb-8">

                {item.icon}

              </div>

              {/* TITLE */}
              <h1 className="text-2xl font-bold mb-5">

                {item.title}

              </h1>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-7 md:leading-8">

                {item.description}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* TEAM */}
      <section className="px-5 md:px-10 py-20 md:py-24">

        <div className="mb-20">

          <p className="text-gray-500 mb-4 tracking-widest">
            LEADERSHIP
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Meet Our Team
          </h1>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {["Director","Research Lead","Senior Mentor","Placement Head"].map((item,index)=>(

            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"
            >

              <div className="h-[250px] bg-gray-200"></div>

              <div className="p-6">

                <h1 className="text-2xl font-bold mb-2">
                  {item}
                </h1>

                <p className="text-gray-500">
                  AI Department
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="bg-[#020617] text-white py-20 md:py-24 text-center px-5 md:px-10">

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">

          Be Part of the AI Revolution

        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto leading-7 md:leading-8">

          Join Kingu and become part of a community dedicated
          to advancing AI knowledge and capability.

        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-10">

          <button className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-200 transition">

            Apply Now

          </button>

          <button className="border border-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white hover:text-black transition">

            Contact Us

          </button>

        </div>

      </section>

      <Footer />

    </div>

  );
}

export default About;