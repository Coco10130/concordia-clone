import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import ProductUpload from "./ProductUpload";

const ShopCard = () => {
  const { user, loading, token } = useContext(UserContext);

  useEffect(() => {
    if (!loading && user) {
      if (!token) {
        return navigate("/");
      }
    }
  }, [user, loading]);
  return (
    <>
      <div className="card glass w-[90%] lg:w-[80%] text-white p-4 rounded-xl h-auto shadow-xl">
        <h1 className="text-4xl font-irishGrover border-0 border-b-[3px] border-b-slate-400 pb-3 m-3 font-bold straight-border">
          Shop
        </h1>

        {user && user.isSeller ? (
          <div className="grid grid-cols-1 md:grid-cols-2 h-[85%]">
            <div className="flex flex-col justify-items-center text-center items-center font-inder text-lg lg:text-md xl:text-2xl">
              <div className="grid grid-cols-2 py-1 md:py-4 w-full">
                <p className="text-center p-1 sm:p-2 md:p-3">Shop Name:</p>
                <p className="text-start p-1 sm:p-2 md:p-3">Basta</p>
              </div>

              <div className="grid grid-cols-2 py-1 md:py-4 w-full">
                <p className="text-center p-1 sm:p-2 md:p-3">Shop Email:</p>
                <p className="text-start p-1 sm:p-2 md:p-3">Basta@gmail.com</p>
              </div>

              <div className="grid grid-cols-2 py-1 md:py-4 w-full">
                <p className="text-center p-1 sm:p-2 md:p-3">Shop Contact:</p>
                <p className="text-start p-1 sm:p-2 md:p-3">Basta</p>
              </div>
            </div>

            <div className="flex flex-col justify-items-center items-center font-inder text-2xl">
              <ProductUpload />
            </div>
          </div>
        ) : (
          <div>Not Seller</div>
        )}
      </div>
    </>
  );
};

export default ShopCard;
