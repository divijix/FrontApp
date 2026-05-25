function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-white">

      {/* LOGO */}
      <h1 className="text-2xl font-bold">
        Kingu
      </h1>

      {/* MENU */}
      <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
        <li className="hover:text-red-600 cursor-pointer">
          Curriculum
        </li>

        <li className="hover:text-red-600 cursor-pointer">
          Research
        </li>

        <li className="hover:text-red-600 cursor-pointer">
          Admissions
        </li>

        <li className="hover:text-red-600 cursor-pointer">
          Enterprise
        </li>

        <li className="hover:text-red-600 cursor-pointer">
          About
        </li>
      </ul>

      {/* BUTTON */}
      <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
        Enroll Now
      </button>

    </nav>
  );
}

export default Navbar;