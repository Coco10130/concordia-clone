import Img from "/images/anya-pfp.jpg";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../axios";
import toast from "react-hot-toast";

const ProfileCard = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { user, loading, token, updateUserProfile } = useContext(UserContext);
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [birthdate, setBirthdate] = useState();
  const imageRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!loading && user && token) {
          const { data } = await axios.get("/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (data.success) {
            setProfile(data.user);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [user, loading, token]);

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    if (!isEditable) {
      try {
        const payload = {
          name: name,
          contact: contact,
          birthdate: birthdate,
        };

        const { data } = await axios.put(
          `/api/profile/${profile._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          updateUserProfile(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleImageChange = async (e) => {
    e.preventDefault();

    try {
      const image = imageRef.current.files[0];

      const formData = new FormData();

      formData.append("image", image);

      const { data } = await axios.put(
        `/api/profile/updateImage/${profile._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.success);
        updateUserProfile(data.user);
      }
    } catch (error) {
      console.error(error);
    }
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
                src={profile.image ? `/images/${profile.image}` : Img}
                alt="Image"
                className="h-28 w-28 md:h-40 md:w-40 rounded-full opacity-65"
              />

              <input
                type="file"
                ref={imageRef}
                id="file_picker"
                name="file_picker"
                onChange={handleImageChange}
                hidden
              />
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
                  defaultValue={profile.name}
                  placeholder={profile.name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <p className="text-start p-1 sm:p-2 md:p-3">{profile.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 py-1 md:py-4">
              <p className="text-center p-1 sm:p-2 md:p-3">Email:</p>

              <p className="text-start p-1 sm:p-2 md:p-3">{profile.email}</p>
            </div>

            <div className="grid grid-cols-2 py-1 md:py-4">
              <p className="text-center p-1 sm:p-2 md:p-3">Contact:</p>

              {isEditable ? (
                <input
                  type="text"
                  className="text-black border-none rounded-xl p-1 sm:p-2 md:p-3"
                  value={profile.contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              ) : (
                <p className="text-start p-1 sm:p-2 md:p-3">
                  {profile.contact ? profile.contact : ""}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 py-1 md:py-4">
              <p className="text-center p-1 sm:p-2 md:p-3">Birthdate:</p>

              {isEditable ? (
                <input
                  type="date"
                  className="text-black border-none rounded-xl p-1 sm:p-2 md:p-3"
                  max={new Date().toISOString().split("T")[0]}
                  defaultValue={profile.birthdate}
                  placeholder={profile.birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              ) : (
                <p className="text-start p-1 sm:p-2 md:p-3">
                  {profile.birthdate ? profile.birthdate : ""}
                </p>
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
