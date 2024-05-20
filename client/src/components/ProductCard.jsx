import React from "react";
import Img from "/images/anya-pfp.jpg";

const ProductCard = () => {
  return (
    <>
      <div className="card w-80 glass mx-4 hover:scale-105 duration-300 m-2">
        <figure className="px-10 pt-10">
          <img
            src={Img}
            alt="Image"
            className="rounded-xl h-[12rem] w-[20rem]"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Product!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="btn bg-blue-500 border-none text-white hover:bg-white hover:text-blue-500 ">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
