import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {

  return (

    <footer className="bg-black text-white px-5 md:px-10 py-14 md:py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* LOGO */}
        <div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4">

            Divijix academy

          </h1>

          <p className="text-gray-400 leading-7 text-sm md:text-base">

            Empowering the next generation of AI innovators.

          </p>

          <div className="flex gap-4 mt-6 text-xl md:text-2xl text-red-500">

            <FaInstagram />
            <FaLinkedin />

          </div>

        </div>

        {/* LINKS */}
        <div>

          <h1 className="text-lg md:text-xl font-bold mb-5">

            Quick Links

          </h1>

          <ul className="space-y-3 text-gray-400 text-sm md:text-base">

            <li className="hover:text-white transition cursor-pointer">
              About
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Courses
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Admissions
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Contact
            </li>

          </ul>

        </div>

        {/* COURSES */}
        <div>

          <h1 className="text-lg md:text-xl font-bold mb-5">

            Programs

          </h1>

          <ul className="space-y-3 text-gray-400 text-sm md:text-base">

            <li>Generative AI</li>

            <li>Machine Learning</li>

            <li>Data Science</li>

            <li>Cloud Computing</li>

          </ul>

        </div>

        {/* CONTACT */}
        <div>

          <h1 className="text-lg md:text-xl font-bold mb-5">

            Contact

          </h1>

          <ul className="space-y-3 text-gray-400 text-sm md:text-base break-words">

            <li>Address: Jaipur rajasthan</li>

            <li>+91 9628718599</li>

            <li>divijixtechnology@zohomail.in</li>

          </ul>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="border-t border-gray-800 mt-14 md:mt-16 pt-8 text-center text-gray-500 text-sm md:text-base">

        © 2026 Divijix Academy. All Rights Reserved.

      </div>

    </footer>

  );
}

export default Footer;