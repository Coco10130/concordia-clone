import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import Img from "/images/anya-pfp.jpg";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useState } from "react";

const Profile = () => {
  const navigations = ["My Profile", "My Purchase", "My Shop"];
  const [isEditable, setIsEditable] = useState(false);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
  };

  return (
    <>
      <div
        className="bg-cover bg-center text-white h-screen"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
        }}
      >
        <NavBar />

        <div className="flex align-center">
          <div>
            <SideNav navigations={navigations} />
          </div>

          <div className="w-full flex justify-center items-center mt-28 md:mt-10 mb-5">
            <div className="card glass w-[90%] lg:w-[80%] text-white p-4 rounded-xl h-auto shadow-xl">
              <h1 className=" text-4xl border-0 border-b-[3px] border-b-slate-400 pb-3 m-3 font-bold straight-border">
                Profile
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 h-[85%]">
                <div className="flex justify-center align-center items-center md:w-[80%]">
                  <label htmlFor="file_picker" className="rounded-full">
                    <img
                      src={Img}
                      alt="Image"
                      className="h-40 w-40 rounded-full opacity-65"
                    />

                    <input
                      type="file"
                      id="file_picker"
                      name="file_picker"
                      hidden
                    />
                  </label>
                </div>

                <form
                  onSubmit={hanldeSubmit}
                  className="flex flex-col justify-evenly align-center md:ml-[-70px] text-md md:text-lg lg:text-xl h-full p-4"
                >
                  <div className="grid grid-cols-2 py-1 md:py-4">
                    <p className="text-center text-sm sm:text-md md:text-lg lg:text-xl">
                      User name:
                    </p>
                    <p className="text-start text-sm sm:text-md md:text-lg lg:text-xl">
                      Kim Ji Won
                    </p>
                  </div>

                  <div className="grid grid-cols-2 py-1 md:py-4">
                    <p className="text-center text-sm sm:text-md md:text-lg lg:text-xl">
                      Email:
                    </p>
                    <p className="text-start text-sm sm:text-md md:text-lg lg:text-xl">
                      jiwon@gmail.com
                    </p>
                  </div>

                  <div className="grid grid-cols-2 py-1 md:py-4">
                    <p className="text-center text-sm sm:text-md md:text-lg lg:text-xl">
                      Contact:
                    </p>
                    <p className="text-start text-sm sm:text-md md:text-lg lg:text-xl">
                      09308823882
                    </p>
                  </div>

                  <div className="grid grid-cols-2 py-1 md:py-4">
                    <p className="text-center text-sm sm:text-md md:text-lg lg:text-xl">
                      Birthdate:
                    </p>
                    <p className="text-start text-sm sm:text-md md:text-lg lg:text-xl">
                      October 13, 2003
                    </p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
