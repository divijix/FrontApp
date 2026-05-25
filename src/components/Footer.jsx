import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {

  return (

    <footer className="bg-black text-white px-10 py-16">

      <div className="grid md:grid-cols-4 gap-10">

        {/* LOGO */}
        <div>

          <h1 className="text-3xl font-bold mb-4">
            Kingu
          </h1>

          <p className="text-gray-400 leading-7">
            Empowering the next generation of AI innovators.
          </p>

          <div className="flex gap-4 mt-6 text-2xl text-red-500">
            <FaInstagram />
            <FaLinkedin />
          </div>

        </div>

        {/* LINKS */}
        <div>

          <h1 className="text-xl font-bold mb-5">
            Quick Links
          </h1>

          <ul className="space-y-3 text-gray-400">

            <li>About</li>
            <li>Courses</li>
            <li>Admissions</li>
            <li>Contact</li>

          </ul>

        </div>

        {/* COURSES */}
        <div>

          <h1 className="text-xl font-bold mb-5">
            Programs
          </h1>

          <ul className="space-y-3 text-gray-400">

            <li>Generative AI</li>
            <li>Machine Learning</li>
            <li>Data Science</li>
            <li>Cloud Computing</li>

          </ul>

        </div>

        {/* CONTACT */}
        <div>

          <h1 className="text-xl font-bold mb-5">
            Contact
          </h1>

          <ul className="space-y-3 text-gray-400">

            <li>Chennai, India</li>
            <li>+91 9876543210</li>
            <li>hello@kingu.ai</li>

          </ul>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">

        © 2026 Kingu AI Academy. All Rights Reserved.

      </div>

    </footer>

  );
}

export default Footer;