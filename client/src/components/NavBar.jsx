import AnyaImg from "/images/anya-pfp.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";

const NavBar = ({ navigation }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-xl rounded-3xl h-20 w-full mt-[-15px] pt-4">
        <div className="flex-1 ml-10">
          <img src={AnyaImg} className="w-12 h-12 rounded-full" alt="Profile" />
          <p className="text-xl text-slate-800 font-bold mx-5">
            User Name dito
          </p>
        </div>
        <div className="flex-none">
          <button className="text-black flex md:hidden" onClick={handleNav}>
            {nav ? (
              <AiOutlineMenu size={20} className="mr-4" />
            ) : (
              <MdOutlineClose size={20} className="mr-4" />
            )}
          </button>
        </div>
      </div>

      <div
        className={
          !nav
            ? "fixed top-0 left-0 w-[60%] h-full border-r-gray-900 bg-slate-950 z-10 ease-in-out duration-300"
            : "fixed left-[-100%] duration-500 w-[60%] z-10 ease-in-out"
        }
      >
        <h1 className="text-white text-2xl m-3 uppercase p-4 font-bold">
          Concordia Portum
        </h1>
        <ul className="uppercase my-10">
          {navigation.map((nav, index) => (
            <li
              key={index}
              className="py-6 pl-20 text-xl border-b-2 last-of-type:border-0 mx-3"
            >
              {nav}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
