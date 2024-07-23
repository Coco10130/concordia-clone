import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductUpload from "./ProductUpload";
import axios from "../axios";
import { Link } from "react-router-dom";

const ShopCard = () => {
  const navigate = useNavigate();
  const { user, loading, token } = useContext(UserContext);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          setProfile(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!loading && user) {
      if (!token) {
        return navigate("/");
      } else {
        fetchProfile();
      }
    }
  }, [user, loading]);
  return (
    <>
      <div className="card glass w-[90%] lg:w-[80%] text-white p-4 rounded-xl h-auto shadow-xl">
        <h1 className="text-4xl font-irishGrover border-0 border-b-[3px] border-b-slate-400 pb-3 m-3 font-bold straight-border">
          Shop
        </h1>

        {user && profile.isSeller ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 h-[85%]">
              <div className="flex flex-col justify-items-center text-center items-center font-inder text-lg lg:text-md xl:text-2xl">
                <div className="grid grid-cols-2 py-1 md:py-4 w-full">
                  <p className="text-center p-1 sm:p-2 md:p-3">Shop Name:</p>
                  <p className="text-start p-1 sm:p-2 md:p-3">
                    {profile.shopName}
                  </p>
                </div>

                <div className="grid grid-cols-2 py-1 md:py-4 w-full">
                  <p className="text-center p-1 sm:p-2 md:p-3">Shop Email:</p>
                  <p className="text-start p-1 sm:p-2 md:p-3">
                    {profile.shopEmail}
                  </p>
                </div>

                <div className="grid grid-cols-2 py-1 md:py-4 w-full">
                  <p className="text-center p-1 sm:p-2 md:p-3">Shop Contact:</p>
                  <p className="text-start p-1 sm:p-2 md:p-3">
                    {profile.shopContact}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-items-center items-center font-inder text-2xl">
                <ProductUpload />
              </div>
            </div>
            <div className="w-full h-full p-4 mt-12">
              <p className="text-5xl text-center font-irishGrover font-bold">
                display products by shop
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-16 w-full h-full p-10 font-inder">
            <h1 className="text-5xl text-center">Not Seller</h1>
            <button className="px-5 py-3 text-white  text-xl rounded-xl bg-blue-500 hover:bg-white hover:text-blue-600 duration-300">
              <Link to={"/profile/shop/register"}>Register Seller</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopCard;
