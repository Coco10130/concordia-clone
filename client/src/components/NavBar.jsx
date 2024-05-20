import AnyaImg from "/images/anya-pfp.jpg";
import { AiOutlineMenu } from "react-icons/ai";

const NavBar = () => {
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
          <button className="text-black flex md:hidden">
            <AiOutlineMenu size={20} className="mr-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
