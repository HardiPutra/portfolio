// src/components/Home.jsx
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  return (
    <section id="home" className="h-screen flex flex-row  items-stretch">
      <div className="w-1/2 h-full  bg-white flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
            Hi, I’m <span className="text-blue-600">Hardi</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">Web Developer & Tech Enthusiast</p>
          <div className="text-gray-600 w-100">A passionate learner who loves building websites, exploring tech, and turning ideas into digital creations.</div>
          <div className="flex flex-row gap-4 mt-6 ">
            <a href="#projects" className="flex  px-6 py-2   bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors duration-500 ease-in-out min-w-25 justify-center">
              Project
            </a>
            <a href="#projects" className="flex  px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition min-w-25 justify-center ">
              Resume
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-1/2  justify-left items-center ">
        <div className="w-5/6 flex">
          <DotLottieReact src="https://lottie.host/d546e3cc-f8e1-47b2-9d35-4cddd5a88a77/09YM8QFyAb.lottie" loop autoplay />
        </div>
      </div>
    </section>
  );
}
