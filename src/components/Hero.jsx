import comp from "../assets/images.jpg";

function Hero() {
  return (
    <section className="grid md:grid-cols-2 items-center gap-14 px-10 py-20 bg-[#f8f8f8]">

      {/* LEFT SIDE */}
      <div>

        <p className="text-red-500 font-medium mb-4">
          India's Premier AI Training Institute
        </p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Build the Future <br />

          with{" "}
          <span className="text-red-600">
            Artificial Intelligence
          </span>
        </h1>

        <p className="text-gray-600 mt-6 text-lg leading-8">
          Master AI, ML, Data Science, Generative AI,
          and Cloud Computing at Kingu.
          Industry-ready curriculum, expert mentors,
          real-world projects.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-5 mt-10">

          <button className="bg-red-600 text-white px-7 py-3 rounded-lg hover:bg-red-700 transition duration-300">
            Apply Now →
          </button>

          <button className="border border-black px-7 py-3 rounded-lg hover:bg-black hover:text-white transition duration-300">
            Explore Courses
          </button>

        </div>

        {/* STATS */}
        <div className="flex gap-16 mt-14">

          <div>
            <h1 className="text-4xl font-bold">
              15+
            </h1>

            <p className="text-gray-500 mt-2">
              PROGRAMS
            </p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              50+
            </h1>

            <p className="text-gray-500 mt-2">
              PROJECTS
            </p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              95%
            </h1>

            <p className="text-gray-500 mt-2">
              OUTCOMES
            </p>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="flex justify-center">

        <img
          src={comp}
          alt="AI Hero"
          className="w-[500px] rounded-3xl shadow-2xl border-4 border-white"
        />

      </div>

    </section>
  );
}

export default Hero;