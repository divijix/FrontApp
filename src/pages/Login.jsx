import React, { useState } from "react";

function Login() {

  /* TOGGLE LOGIN / SIGNUP */

  const [isLogin, setIsLogin] = useState(true);

  /* FORM STATE */

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: ""

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

    if (isLogin) {

      alert("Login Successful");

    }

    else {

      alert("Account Created Successfully");

    }

    console.log(formData);

  };

  return (

    <section className="min-h-screen bg-[#f8f8f8] flex justify-center items-center px-5 py-10">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 md:p-10">

        {/* TITLE */}

        <div className="text-center mb-10">

          <h1 className="text-4xl md:text-5xl font-bold">

            {isLogin ? "Welcome Back" : "Create Account"}

          </h1>

          <p className="text-gray-500 mt-4 text-base md:text-lg">

            {isLogin
              ? "Login to continue learning AI"
              : "Join divijixtechnology"}

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* NAME */}

          {!isLogin && (

            <div>

              <label className="block mb-2 font-semibold text-lg">

                Full Name *

              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg outline-none focus:border-red-500"
              />

            </div>

          )}

          {/* EMAIL */}

          <div>

            <label className="block mb-2 font-semibold text-lg">

              Email *

            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg outline-none focus:border-red-500"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block mb-2 font-semibold text-lg">

              Password *

            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg outline-none focus:border-red-500"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-2xl hover:bg-red-700 transition duration-300 font-semibold text-xl"
          >

            {isLogin ? "Login" : "Create Account"}

          </button>

        </form>

        {/* TOGGLE */}

        <div className="text-center mt-8">

          {isLogin ? (

            <p className="text-gray-600 text-lg">

              Don't have an account?{" "}

              <button
                onClick={() => setIsLogin(false)}
                className="text-red-600 font-bold"
              >

                Sign Up

              </button>

            </p>

          ) : (

            <p className="text-gray-600 text-lg">

              Already have an account?{" "}

              <button
                onClick={() => setIsLogin(true)}
                className="text-red-600 font-bold"
              >

                Sign In

              </button>

            </p>

          )}

        </div>

      </div>

    </section>

  );
}

export default Login;