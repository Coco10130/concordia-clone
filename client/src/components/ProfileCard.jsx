import Img from "/images/anya-pfp.jpg";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useState } from "react";

const ProfileCard = () => {
  const [isEditable, setIsEditable] = useState(false);

  const hanldeSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="card glass w-[90%] lg:w-[80%] text-white p-4 rounded-xl h-auto shadow-xl">
        <h1 className="text-4xl font-irishGrover border-0 border-b-[3px] border-b-slate-400 pb-3 m-3 font-bold straight-border">
          Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 h-[85%]">
          <div className="flex justify-center align-center items-center md:w-[80%]">
            <label htmlFor="file_picker" className="rounded-full">
              <img
                src={Img}
                alt="Image"
                className="h-28 w-28 md:h-40 md:w-40 rounded-full opacity-65"
              />

              <input type="file" id="file_picker" name="file_picker" hidden />
            </label>
          </div>

          <form
            onSubmit={hanldeSubmit}
            className="flex flex-col justify-evenly align-center md:ml-[-70px] text-md md:text-xl lg:text-2xl h-full p-4 font-inder"
          >
            <div className="grid grid-cols-2 py-1 md:py-4">
              <p className="text-center p-1 sm:p-2 md:p-3">User name:</p>

              {isEditable ? (
                <input
                  type="text"
                  className="text-black border-none rounded-xl p-1 sm:p-2 md:p-3"
                />
              ) : (
                <p className="text-start p-1 sm:p-2 md:p-3">Kim Jiwon</p>
              )}
            </div>

            <div className="grid grid-cols-2 py-1 md:py-4">
              <p className="text-center p-1 sm:p-2 md:p-3">Email:</p>

              {isEditable ? (
                <input
                  type="text"
                  className="text-black border-none rounded-xl p-1 sm:p-2 md:p-3"
                />
              ) : (
                <p className="text-start p-1 sm:p-2 md:p-3">jiwon@gmail.com</p>
              )}
            </div>

            <div className="grid grid-cols-2 py-1 md:py-4">
              <p className="text-center p-1 sm:p-2 md:p-3">Contact:</p>

              {isEditable ? (
                <input
                  type="text"
                  className="text-black border-none rounded-xl p-1 sm:p-2 md:p-3"
                />
              ) : (
                <p className="text-start p-1 sm:p-2 md:p-3">09308823882</p>
              )}
            </div>

            <div className="grid grid-cols-2 py-1 md:py-4">
              <p className="text-center p-1 sm:p-2 md:p-3">Birthdate:</p>

              {isEditable ? (
                <input
                  type="date"
                  className="text-black border-none rounded-xl p-1 sm:p-2 md:p-3"
                />
              ) : (
                <p className="text-start p-1 sm:p-2 md:p-3">October 13, 2003</p>
              )}
            </div>

            <div className="flex flex-col justify-items-center items-end md:w-4/5 mt-5">
              <button
                type="submit"
                onClick={() => setIsEditable(!isEditable)}
                className="bg-blue-600 text-white p-5 rounded-full hover:bg-white hover:text-blue-600 hover:shadow-lg duration-300"
              >
                {isEditable ? <FaSave /> : <MdEdit />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
