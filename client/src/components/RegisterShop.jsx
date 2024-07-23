import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const RegisterShop = () => {
  const navigate = useNavigate();
  const { token, updateUserProfile } = useContext(UserContext);
  const [shopName, setShopName] = useState();
  const [shopEmail, setShopEmail] = useState();
  const [shopContact, setShopContact] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        shopName: shopName,
        shopEmail: shopEmail,
        shopContact: shopContact,
      };

      const { data } = await axios.post(
        "/api/profile/register/seller",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.success);
        updateUserProfile(data.user);
        navigate("/profile/shop");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card glass w-[90%] lg:w-[80%] text-white p-4 rounded-xl h-auto shadow-xl">
        <h1 className="text-4xl font-irishGrover border-0 border-b-[3px] border-b-slate-400 pb-3 m-3 font-bold straight-border">
          Register Shop
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center align-center gap-10 w-full h-auto p-2 font-inder"
        >
          <div className="grid grid-cols-2">
            <p className="p-3 text-3xl text-center">Shop Name:</p>
            <input
              type="text"
              className="p-3 text-xl rounded-xl text-black w-[80%]"
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2">
            <p className="p-3 text-3xl text-center">Shop Email:</p>
            <input
              type="email"
              className="p-3 text-xl rounded-xl text-black w-[80%]"
              onChange={(e) => setShopEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2">
            <p className="p-3 text-3xl text-center">Shop Contact:</p>
            <input
              type="text"
              className="p-3 text-xl rounded-xl text-black w-[80%]"
              onChange={(e) => setShopContact(e.target.value)}
            />
          </div>

          <div className="flex justify-center p-5">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-5 text-xl rounded-xl hover:bg-white hover:text-blue-600 duration-300 hover:shadow-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterShop;
