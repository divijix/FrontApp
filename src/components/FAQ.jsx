import React from "react";

const faqs = [

  {
    question: "Who can enroll in these programs?",
    answer:
      "Anyone interested in AI, coding, or Data Science can join."
  },

  {
    question: "Are the classes online?",
    answer:
      "Yes, all programs are fully online with live mentorship."
  },

  {
    question: "Do I need coding experience?",
    answer:
      "No, beginner-friendly tracks are available."
  }

];

function FAQ() {

  return (

    <section className="px-10 py-24 bg-white">

      {/* TITLE */}
      <div className="text-center mb-16">

        <p className="text-red-500 font-semibold mb-3">
          FAQ
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          Common Questions
        </h1>

      </div>

      {/* FAQS */}
      <div className="max-w-4xl mx-auto space-y-6">

        {faqs.map((item, index) => (

          <div
            key={index}
            className="border p-6 rounded-2xl hover:shadow-lg transition"
          >

            <h1 className="text-xl font-bold mb-3">
              {item.question}
            </h1>

            <p className="text-gray-600 leading-7">
              {item.answer}
            </p>

          </div>

        ))}

      </div>

    </section>

  );
}

export default FAQ;