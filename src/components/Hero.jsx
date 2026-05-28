import { useState } from "react";

import comp from "../assets/images.jpg";

function Hero() {

  /* ENQUIRY MODAL STATE */

  const [openForm, setOpenForm] = useState(false);

  /* FORM STATE */

  const [formData, setFormData] = useState({

    phone: "",
    message: "",
    email: " "

  });

  /* HANDLE INPUT */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,
      [name]: value

    });

  };

  /* HANDLE SUBMIT */

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    alert("Enquiry Submitted Successfully 🚀");

    setOpenForm(false);

  };

  return (

    <>

      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-14 px-5 md:px-10 py-16 md:py-20 bg-[#f8f8f8] overflow-hidden">

        {/* LEFT SIDE */}

        <div>

          <p className="text-red-500 font-medium mb-4 text-sm md:text-base">

            India's Premier AI Training Institute

          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">

            Build the Future <br />

            with{" "}

            <span className="text-red-600">

              Artificial Intelligence

            </span>

          </h1>

          <p className="text-gray-600 mt-6 text-base md:text-lg leading-7 md:leading-8">

            Master AI, ML, Data Science, Generative AI,
            and Cloud Computing at Kingu.
            Industry-ready curriculum, expert mentors,
            real-world projects.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-5 mt-10">

            <button className="bg-red-600 text-white px-6 md:px-7 py-3 rounded-lg hover:bg-red-700 transition duration-300">

              Apply Now →

            </button>

            <button className="border border-black px-6 md:px-7 py-3 rounded-lg hover:bg-black hover:text-white transition duration-300">

              Explore Courses

            </button>

          </div>

          {/* STATS */}

          <div className="flex flex-wrap gap-10 md:gap-16 mt-14">

            <div>

              <h1 className="text-3xl md:text-4xl font-bold">

                15+

              </h1>

              <p className="text-gray-500 mt-2 text-sm md:text-base">

                PROGRAMS

              </p>

            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-bold">

                50+

              </h1>

              <p className="text-gray-500 mt-2 text-sm md:text-base">

                PROJECTS

              </p>

            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-bold">

                95%

              </h1>

              <p className="text-gray-500 mt-2 text-sm md:text-base">

                OUTCOMES

              </p>

            </div>

          </div>

          {/* ENQUIRY BUTTON */}

          <div className="flex flex-wrap gap-5 mt-10">

            <button
              onClick={() => setOpenForm(true)}
              className="border border-black px-6 md:px-7 py-3 rounded-lg hover:bg-black hover:text-white transition duration-300"
            >

              Enquiry Now →

            </button>

          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}

        <div className="flex justify-center">

          <img
            src={comp}
            alt="AI Hero"
            className="w-full max-w-[500px] h-[300px] md:h-auto object-cover rounded-3xl shadow-2xl border-4 border-white"
          />

        </div>

      </section>

      {/* ENQUIRY FORM MODAL */}

      {openForm && (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">

          <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-10 relative">

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setOpenForm(false)}
              className="absolute top-5 right-5 text-2xl"
            >

              ✕

            </button>

            {/* TITLE */}

            <h1 className="text-3xl font-bold mb-2">

              Quick Enquiry

            </h1>

            <p className="text-gray-500 mb-8">

              Fill your details and our team will contact you.

            </p>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* PHONE NUMBER */}

              <div>

                <label className="block mb-2 font-medium">

                  Phone Number *

                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500"
                />

              </div>
               <div>

                <label className="block mb-2 font-medium">

                  e-mail *

                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="@gmail.com"
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-red-500"
                />

              </div>

              {/* MESSAGE */}

              <div>

                <label className="block mb-2 font-medium">

                  Message *

                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Enter your enquiry message..."
                  required
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none resize-none focus:border-red-500"
                ></textarea>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 transition duration-300 font-semibold"
              >

                Submit Enquiry 

              </button>

            </form>

          </div>

        </div>

      )}

    </>

  );
}

export default Hero;