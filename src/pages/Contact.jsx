import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt
} from "react-icons/fa";

function Contact() {

  /* CONTACT JSON DATA */

  const contactInfo = [

    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      value: "8009799550",
      subtitle: "Instant messaging"
    },

    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "divijixtechnology@zohomail.in",
      subtitle: "Response within 24hrs"
    },

    {
      icon: <FaInstagram />,
      title: "Instagram",
      value: "@kingu_ai",
      subtitle: "Follow us for updates"
    }

  ];

  /* MAP CONTACT CARDS */

  const contacts = contactInfo.map((element, index) => (

    <div
      key={index}
      className="bg-white p-6 md:p-8 rounded-3xl shadow hover:shadow-2xl transition duration-300 flex flex-col sm:flex-row gap-6 items-start"
    >

      {/* ICON */}

      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black text-white flex items-center justify-center text-xl md:text-2xl">

        {element.icon}

      </div>

      {/* TEXT */}

      <div>

        <h1 className="text-xl md:text-2xl font-bold mb-2">

          {element.title}

        </h1>

        <p className="text-gray-700 mb-2 break-all">

          {element.value}

        </p>

        <p className="text-gray-500 text-sm md:text-base">

          {element.subtitle}

        </p>

      </div>

    </div>

  ));

  /* FORM STATE */

  const [form, setForm] = useState({

    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""

  });

  /* HANDLE CHANGE */

  const handleChange = (e) => {

    setForm({

      ...form,
      [e.target.name]: e.target.value

    });

  };

  /* HANDLE SUBMIT */

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(form);

    alert("Message Sent 🚀");

  };

  return (

    <div className="bg-[#f5f5f5] min-h-screen overflow-hidden">

      <Navbar />

      {/* HERO */}

      <section className="text-center py-20 md:py-28 px-5 md:px-10">

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">

          Let's Connect

        </h1>

        <p className="text-gray-600 text-base md:text-lg leading-7 md:leading-8 max-w-3xl mx-auto">

          Have a question about our programs?
          Ready to apply? Want to collaborate?
          We'd love to hear from you.

        </p>

      </section>

      {/* CONTACT SECTION */}

      <section className="px-5 md:px-10 pb-20 md:pb-28">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">

          {/* LEFT SIDE */}

          <div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">

              Get in Touch

            </h1>

            {/* CONTACT CARDS */}

            <div className="space-y-8">

              {contacts}

            </div>

            {/* LOCATION */}

            <div className="mt-16">

              <p className="tracking-widest text-gray-500 mb-5 text-sm">

                OUR LOCATION

              </p>

              <p className="text-gray-700 leading-7 md:leading-8">

                G-40, Ground Floor, Vaibhav Heights,
                Ira Square, Butibori MIDC Road,
                Nagpur

              </p>

            </div>

          </div>

          {/* RIGHT SIDE FORM */}

          <div className="bg-white p-6 md:p-10 rounded-3xl shadow">

            <h1 className="text-3xl md:text-4xl font-bold mb-4">

              Send a Message

            </h1>

            <p className="text-gray-500 mb-10">

              We'll get back to you as soon as possible.

            </p>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* ROW 1 */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                  <label className="block mb-3 font-medium">

                    Full Name

                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-black"
                  />

                </div>

                <div>

                  <label className="block mb-3 font-medium">

                    Phone

                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-black"
                  />

                </div>

              </div>

              {/* ROW 2 */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                  <label className="block mb-3 font-medium">

                    Email

                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-black"
                  />

                </div>

                <div>

                  <label className="block mb-3 font-medium">

                    Subject

                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="General Inquiry"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-black"
                  />

                </div>

              </div>

              {/* MESSAGE */}

              <div>

                <label className="block mb-3 font-medium">

                  Message

                </label>

                <textarea
                  rows="6"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-black resize-none"
                ></textarea>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="w-full bg-black text-white py-4 md:py-5 rounded-xl hover:bg-gray-800 transition font-semibold tracking-widest"
              >

                SEND MESSAGE

              </button>

            </form>

          </div>

        </div>

      </section>

      {/* CTA SECTION */}

      <section className="bg-black text-white text-center py-20 md:py-28 px-5 md:px-10">

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">

          Book a Free Counseling Session

        </h1>

        <p className="text-gray-400 text-base md:text-lg leading-7 md:leading-8 max-w-2xl mx-auto">

          30-minute session with our admissions advisor
          to discuss your career path in AI.

        </p>

        <button className="mt-10 bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-200 transition">

          BOOK NOW

        </button>

      </section>

      {/* MAP SECTION */}

      <section className="px-5 md:px-10 py-20 md:py-28">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* LEFT */}

          <div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10">

              Find Us

            </h1>

            <p className="text-gray-700 leading-7 md:leading-8 mb-10">

              Kingu Training & Research Institute <br />
              G-40, Ground Floor, Vaibhav Heights,
              Ira Square, Butibori MIDC Road,
              Nagpur

            </p>

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <FaMapMarkerAlt />

                <p>8009799550</p>

              </div>

              <div className="flex items-center gap-4">

                <FaPhoneAlt />

                <p>8009799550</p>

              </div>

            </div>

          </div>

          {/* RIGHT MAP */}

          <div className="bg-gray-300 h-[250px] md:h-[400px] rounded-3xl shadow-xl"></div>

        </div>

      </section>

      <Footer />

    </div>

  );
}

export default Contact;