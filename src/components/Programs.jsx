import React, { useState, useEffect } from "react";
import { FaRobot, FaBrain, FaCode, FaDatabase, FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../config";

function Programs() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    FaCode: <FaCode />,
    FaBrain: <FaBrain />,
    FaRobot: <FaRobot />,
    FaSearch: <FaSearch />,
    FaDatabase: <FaDatabase />
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (err) {
        console.error("Error fetching homepage courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="px-5 md:px-10 py-20 md:py-24 bg-[#f8f8f8] overflow-hidden">
      {/* TITLE */}
      <div className="text-center mb-16">
        <p className="text-red-500 font-semibold mb-3 text-sm md:text-base">
          OUR PROGRAMS
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Cutting Edge AI & Foundation Courses
        </h1>
      </div>

      {/* CARDS */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No programs available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id || index}
              className="bg-white p-6 md:p-8 rounded-3xl hover:shadow-2xl transition duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                {/* ICON */}
                <div className="text-4xl md:text-5xl text-red-600 mb-6">
                  {course.is_technical ? (
                    iconMap[course.icon_name] || <FaCode />
                  ) : (
                    <FaBrain />
                  )}
                </div>

                {/* LEVEL */}
                <span className="text-[10px] bg-slate-100 px-2.5 py-1 rounded-lg text-slate-500 font-bold uppercase tracking-wider mb-3 inline-block">
                  {course.level}
                </span>

                {/* TITLE */}
                <h1 className="text-xl md:text-2xl font-bold mb-4 leading-snug text-gray-900">
                  {course.title}
                </h1>

                {/* DESCRIPTION */}
                <p className="text-gray-600 leading-7 text-sm md:text-base line-clamp-4">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Programs;