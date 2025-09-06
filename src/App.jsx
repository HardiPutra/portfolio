// src/App.jsx
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";


function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Isi Halaman */}
      <Home />
      <section id="about" className="h-screen flex items-center justify-center bg-white">
        <h2 className="text-3xl font-semibold text-gray-800">About Me </h2>
      </section>
      <section id="skills" className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800">My Skills</h2>
      </section>
      <section id="projects" className="h-screen flex items-center justify-center bg-white">
        <h2 className="text-3xl font-semibold text-gray-800">Projects</h2>
      </section>
      <section id="contact" className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800">Contact Me</h2>
      </section>
    </>
  );
}

export default App;
