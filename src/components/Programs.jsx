import React from "react";
import { FaRobot, FaBrain, FaCode, FaDatabase } from "react-icons/fa";

const programs = [

  {
    icon: <FaRobot />,
    title: "Generative AI",
    description:
      "Learn ChatGPT, LLMs, Prompt Engineering and AI tools."
  },

  {
    icon: <FaBrain />,
    title: "Machine Learning",
    description:
      "Build intelligent systems using ML algorithms."
  },

  {
    icon: <FaCode />,
    title: "Full Stack AI",
    description:
      "Create AI-powered web applications using React and APIs."
  },

  {
    icon: <FaDatabase />,
    title: "Data Science",
    description:
      "Analyze data and generate business insights."
  },

  {
    icon: <FaRobot />,
    title: "Prompt Engineering",
    description:
      "Master advanced prompting techniques for AI systems."
  },

  {
    icon: <FaBrain />,
    title: "Deep Learning",
    description:
      "Build neural networks and intelligent AI models."
  },

  {
    icon: <FaCode />,
    title: "AI Automation",
    description:
      "Automate workflows using AI-powered tools and APIs."
  },

  {
    icon: <FaDatabase />,
    title: "Big Data",
    description:
      "Handle massive datasets using modern technologies."
  },

  {
    icon: <FaRobot />,
    title: "Computer Vision",
    description:
      "Train AI systems to process images and videos."
  },

  {
    icon: <FaBrain />,
    title: "Natural Language Processing",
    description:
      "Build chatbots and text understanding systems."
  },

  {
    icon: <FaCode />,
    title: "React for AI",
    description:
      "Create frontend interfaces for AI applications."
  },

  {
    icon: <FaDatabase />,
    title: "Cloud Computing",
    description:
      "Deploy scalable AI apps using cloud technologies."
  },

  {
    icon: <FaRobot />,
    title: "AI Agents",
    description:
      "Build autonomous AI agents and smart assistants."
  },

  {
    icon: <FaBrain />,
    title: "Neural Networks",
    description:
      "Understand advanced AI architectures and training."
  },

  {
    icon: <FaCode />,
    title: "AI Deployment",
    description:
      "Deploy AI applications into real-world production."
  }

];

const app = programs.map((element, index) => (

  <div
    key={index}
    className="bg-white p-6 md:p-8 rounded-3xl hover:shadow-2xl transition duration-300 hover:-translate-y-2"
  >

    {/* ICON */}

    <div className="text-4xl md:text-5xl text-red-600 mb-6">

      {element.icon}

    </div>

    {/* TITLE */}

    <h1 className="text-xl md:text-2xl font-bold mb-4 leading-snug">

      {element.title}

    </h1>

    {/* DESCRIPTION */}

    <p className="text-gray-600 leading-7 text-sm md:text-base">

      {element.description}

    </p>

  </div>

));

function Programs() {

  return (

    <section className="px-5 md:px-10 py-20 md:py-24 bg-[#f8f8f8] overflow-hidden">

      {/* TITLE */}

      <div className="text-center mb-16">

        <p className="text-red-500 font-semibold mb-3 text-sm md:text-base">

          OUR PROGRAMS

        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">

          15 Cutting Edge AI Courses

        </h1>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

        {app}

      </div>

    </section>

  );

}

export default Programs;