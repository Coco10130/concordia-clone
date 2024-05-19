import React from "react";
import AnyaImg from "/images/anya-pfp.jpg";

const Hero = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="mas-w-md">
            <marquee>
              <h1 className="text-5xl font-bold">Hello there</h1>
            </marquee>
            <p className="py-6">
              blah kajsld jasldkjasldkblahl lblah blah blahsdjfhsdkjfh ksjdh
              fkajshdfkljha sdfkljhas klfhl
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
