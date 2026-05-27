import React from "react";

const reviews = [

  {
    name: "Priya Sharma",
    role: "AI Engineer",
    review:
      "The programs completely changed my career. I landed my dream AI job within months."
  },

  {
    name: "Rahul Verma",
    role: "ML Developer",
    review:
      "Hands-on projects and mentorship helped me build real-world AI applications."
  },

  {
    name: "Anjali Patel",
    role: "Data Scientist",
    review:
      "The curriculum is industry-ready and very practical for beginners."
  }

];

function Testimonials() {

  return (

    <section className="px-5 md:px-10 py-20 md:py-24 bg-[#f8f8f8] overflow-hidden">

      {/* TITLE */}

      <div className="text-center mb-16">

        <p className="text-red-500 font-semibold mb-3 text-sm md:text-base">

          SUCCESS STORIES

        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">

          Real Results, Real Careers

        </h1>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

        {reviews.map((item, index) => (

          <div
            key={index}
            className="bg-white p-6 md:p-8 rounded-3xl shadow hover:shadow-2xl transition duration-300 hover:-translate-y-2"
          >

            {/* NAME */}

            <h1 className="text-xl md:text-2xl font-bold mb-2">

              {item.name}

            </h1>

            {/* ROLE */}

            <p className="text-red-500 mb-6 text-sm md:text-base">

              {item.role}

            </p>

            {/* REVIEW */}

            <p className="text-gray-600 leading-7 text-sm md:text-base">

              "{item.review}"

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default Testimonials;