import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

const SideNav = ({ navigations }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <nav className="h-[89vh] w-52 hidden items-center md:flex">
        <div className="flex-1 ml-10 p-2 w-auto h-auto">
          <ul className="flex flex-col uppercase">
            {navigations.map((nav, index) => (
              <li key={index} className="my-6 font-semibold text-xl">
                {nav}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div>
        <button
          className="absolute z-10 text-black flex md:hidden"
          onClick={handleNav}
        >
          <AiOutlineMenu size={30} className="text-white m-4" />
        </button>
      </div>

      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[75%] h-full border-r-gray-900 bg-slate-950 z-10 ease-in-out duration-300"
            : "fixed left-[-100%] duration-500 w-[60%] z-10 ease-in-out"
        }
      >
        <div className="flex justify-items-center items-center">
          <h1 className="text-emerald-400 text-2xl m-3 uppercase p-4 font-bold">
            Concordia Portum
          </h1>

          <button className="text-black flex md:hidden" onClick={handleNav}>
            <MdOutlineClose size={30} className="text-white m-6" />
          </button>
        </div>

        <ul className="uppercase my-10">
          {navigations.map((nav, index) => (
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

export default SideNav;
