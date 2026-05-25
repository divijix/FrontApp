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

    <section className="px-10 py-24 bg-[#f8f8f8]">

      {/* TITLE */}
      <div className="text-center mb-16">

        <p className="text-red-500 font-semibold mb-3">
          SUCCESS STORIES
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          Real Results, Real Careers
        </h1>

      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8">

        {reviews.map((item, index) => (

          <div
            key={index}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-2xl transition duration-300"
          >

            <h1 className="text-2xl font-bold mb-2">
              {item.name}
            </h1>

            <p className="text-red-500 mb-6">
              {item.role}
            </p>

            <p className="text-gray-600 leading-7">
              "{item.review}"
            </p>

          </div>

        ))}

      </div>

    </section>

  );
}

export default Testimonials;