import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUnlock } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Axios from "../axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const LoginCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: email,
        password: password,
      };

      const { data } = await Axios.post("/api/auth/login", payload);

      if (data.message) {
        toast.error(data.message);
      } else {
        const loadingToastId = toast.loading("Loading...");

        setTimeout(() => {
          toast.dismiss(loadingToastId);
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-5xl text-white font-bold text-center mb-6 font-irishGrover">
          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75 ml-[-1.3rem]"></span>
          Login
        </h1>
        <form onSubmit={handleSumbit} className="font-inder">
          <div className="relative my-4">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Email
            </label>
            <MdEmail className="absolute top-4 right-4" />
          </div>

          <div className="relative my-4">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-4 right-4" />
          </div>

          <div className="flex items-center my-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-white">
              Remember me
            </label>
            <span className="ml-auto text-sm text-blue-500 cursor-pointer hover:text-blue-600 duration-300">
              Forgot Password
            </span>
          </div>

          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-600 hover:text-white hover:bg-emerald-600 py-2 transparent duration-300"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="text-sm text-white">
              New Here?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-500 duration-300"
              >
                Create an account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginCard;
