import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/courses" element={<Courses/>}/>
         <Route path="/community" element={<Community/>}/>
         <Route path="/Research" element={<NotFound/>}/>
          <Route path="/Blog" element={<NotFound/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>

    </BrowserRouter>

  );
}

export default App;