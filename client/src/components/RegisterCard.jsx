import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import axios from "../axios";
import toast from "react-hot-toast";

const RegisterCard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      const { data } = await axios.post("/api/auth/register", payload);

      if (data.success) {
        toast.success(data.success);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else if (data.message) {
        toast.error(data.message);
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
          Register
        </h1>
        <form onSubmit={handleSumbit} className="font-inder">
          <div className="relative my-4">
            <input
              type="text"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer "
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              User Name
            </label>
            <BiUser className="absolute top-4 right-0" />
          </div>

          <div className="relative my-4">
            <input
              type="email"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            <MdEmail className="absolute top-4 right-0" />
          </div>

          <div className="relative my-4">
            <input
              type="password"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <AiOutlineUnlock className="absolute top-4 right-0" />
          </div>

          <div className="relative my-4">
            <input
              type="password"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            <AiOutlineUnlock className="absolute top-4 right-0" />
          </div>

          <button
            type="submit"
            className="w-full text-[18px] mt-6 bg-white text-emerald-600 rounded-full hover:text-white hover:bg-emerald-600 duration-300 py-2"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <span className="text-white text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-400 duration-300 hover:text-blue-500"
              >
                Login Here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterCard;
