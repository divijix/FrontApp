import React from "react";

function CTA() {

  return (

    <section className="px-10 py-24 bg-[#f8f8f8]">

      <div className="bg-black text-white rounded-3xl p-14 flex flex-col md:flex-row items-center justify-between">

        {/* LEFT */}
        <div>

          <p className="text-red-500 font-semibold mb-3">
            START TODAY
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Build <br />
            the Future?
          </h1>

          <p className="text-gray-400 mt-6 leading-7">
            Join thousands of students transforming
            their careers with AI.
          </p>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-5 mt-10 md:mt-0">

          <button className="bg-red-600 px-7 py-3 rounded-xl hover:bg-red-700 transition">
            Apply Now
          </button>

          <button className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-black transition">
            Book Demo
          </button>

        </div>

      </div>

    </section>

  );
}

export default CTA;