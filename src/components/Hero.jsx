// import React from 'react'
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mt-3 mb-10 pt-3">
        <img src={logo} className="w-44 object-contain" alt="logo" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/Atharv-110")}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Unleash the Power of <br className="max-md:hidden" />{" "}
        <span className="green_gradient font-extrabold ">
          SUMMIFY
        </span>
      </h1>
      <h2 className="desc">
        Amplify Your Reading Experience with GPT-4-Powered Summaries!
      </h2>
    </header>
  );
};

export default Hero;
