// src/components/Navbar.jsx
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      let current = "home";

      for (let id of sections) {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 80) {
          current = id;
        }
      }

      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Nama */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">Hardi</div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className={activeSection === "home" ? "text-blue-600 font-semibold underline underline-offset-6" : "text-gray-700 hover:text-blue-600 "}>
              Home
            </a>
            <a href="#about" className={activeSection === "about" ? "text-blue-600 font-semibold underline underline-offset-6" : "text-gray-700 hover:text-blue-600"}>
              About
            </a>
            <a href="#skills" className={activeSection === "skills" ? "text-blue-600 font-semibold underline underline-offset-6" : "text-gray-700 hover:text-blue-600"}>
              Skills
            </a>
            <a href="#projects" className={activeSection === "projects" ? "text-blue-600 font-semibold underline underline-offset-6" : "text-gray-700 hover:text-blue-600"}>
              Projects
            </a>
            <a href="#contact" className={activeSection === "contact" ? "text-blue-600 font-semibold underline underline-offset-6" : "text-gray-700 hover:text-blue-600"}>
              Contact
            </a>
          </div>

          {/* Tombol Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-2 space-y-2">
          <a href="#home" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            Home
          </a>
          <a href="#about" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            About
          </a>
          <a href="#skills" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            Skills
          </a>
          <a href="#projects" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            Projects
          </a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
