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
      className="bg-[#f8f8f8] p-10 rounded-3xl shadow"
    >

      <h1 className="text-5xl font-bold text-red-600">
        {item.number}
      </h1>

      <h2 className="text-2xl font-semibold mt-6">
        {item.title}
      </h2>

      <p className="text-gray-600 mt-4 leading-7">
        {item.description}
      </p>

    </div>
  ))

  return (
    <section className="px-10 py-24 bg-white">

      {/* TITLE */}
      <div className="text-center mb-16">

        <p className="text-red-500 font-semibold mb-3">
          WHY AI MATTERS
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          The AI Revolution
        </h1>

      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8">

        {products}

      </div>

    </section>
  )
}

export default Stats