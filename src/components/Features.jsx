import React from 'react'
import {
  FaLaptopCode,
  FaProjectDiagram,
  FaUserGraduate,
  FaFlask
} from "react-icons/fa";

const features = [

  {
    icon: <FaLaptopCode />,
    title: "Industry-Ready Curriculum",
    description:
      "Learn the most in-demand AI skills with practical training."
  },

  {
    icon: <FaProjectDiagram />,
    title: "Hands-on Projects",
    description:
      "Build real-world AI applications and deploy solutions."
  },

  {
    icon: <FaUserGraduate />,
    title: "Expert Mentorship",
    description:
      "Get guidance from experienced AI engineers and mentors."
  },

  {
    icon: <FaFlask />,
    title: "Research-Oriented",
    description:
      "Explore advanced AI technologies and innovations."
  }

];

const labels = features.map((item, index) => (

  <div
    key={index}
    className="bg-[#111111] p-8 rounded-3xl border border-gray-800 hover:border-red-600 hover:shadow-red-500/20 hover:shadow-2xl transition duration-300 min-h-[320px]"
  >

    {/* ICON */}
    <div className="text-5xl text-red-500 mb-6">
      {item.icon}
    </div>

    {/* TITLE */}
    <h1 className="text-2xl font-bold mb-4">
      {item.title}
    </h1>

    {/* DESCRIPTION */}
    <p className="text-gray-400 leading-7">
      {item.description}
    </p>

  </div>

));

function Features() {

  return (

    <section className="bg-black text-white px-10 py-24">

      {/* TITLE */}
      <div className="text-center mb-16">

        <p className="text-red-500 font-semibold mb-3">
          WHY CHOOSE US
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          The Kingu Difference
        </h1>

      </div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {labels}

      </div>

    </section>

  )
}

export default Features