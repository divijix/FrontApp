import React from 'react'

const courses = [

  {
    number: "$1.8T",
    title: "Global AI Market by 2030",
    description:
      "Artificial Intelligence is becoming the world's largest technology revolution."
  },

  {
    number: "97M",
    title: "New AI Jobs",
    description:
      "Millions of AI and Data Science jobs are expected worldwide."
  },

  {
    number: "3-5x",
    title: "Salary Growth",
    description:
      "AI Engineers earn significantly higher salaries than traditional roles."
  },

]

function Stats() {

  const products = courses.map((item, index) => (

    <div
      key={index}
      className="bg-[#f8f8f8] p-6 md:p-10 rounded-3xl shadow hover:shadow-2xl transition duration-300"
    >

      {/* NUMBER */}

      <h1 className="text-4xl md:text-5xl font-bold text-red-600">

        {item.number}

      </h1>

      {/* TITLE */}

      <h2 className="text-xl md:text-2xl font-semibold mt-6 leading-snug">

        {item.title}

      </h2>

      {/* DESCRIPTION */}

      <p className="text-gray-600 mt-4 leading-7 text-sm md:text-base">

        {item.description}

      </p>

    </div>

  ))

  return (

    <section className="px-5 md:px-10 py-20 md:py-24 bg-white overflow-hidden">

      {/* TITLE */}

      <div className="text-center mb-16">

        <p className="text-red-500 font-semibold mb-3 text-sm md:text-base">

          WHY AI MATTERS

        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">

          The AI Revolution

        </h1>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

        {products}

      </div>

    </section>

  )

}

export default Stats;