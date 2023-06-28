// import React from 'react'
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} className="w-28 object-contain" alt="logo" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/Atharv-110")}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" /> <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, assumenda!
      </h2>
    </header>
  );
};

export default Hero;
