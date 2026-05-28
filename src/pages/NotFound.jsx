import React from "react";
import { Link } from "react-router-dom";

function NotFound() {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8f8f8] px-5 text-center">

      <h1 className="text-7xl md:text-9xl font-bold text-red-600">

        404

      </h1>

      <h2 className="text-3xl md:text-5xl font-bold mt-6">

        Page Not Found

      </h2>

      <p className="text-gray-600 mt-5 max-w-xl leading-8">

        The page you are looking for does not exist
        or is still under development.

      </p>

      <Link to="/">

        <button className="mt-10 bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 transition">

          Back To Home

        </button>

      </Link>

    </div>

  );

}

export default NotFound;