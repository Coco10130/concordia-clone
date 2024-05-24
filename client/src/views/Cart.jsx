import CartProduct from "../components/CartProduct";
import NavBar from "../components/NavBar";
import OrderSummary from "../components/OrderSummary";
import { MdSummarize, MdOutlineClose } from "react-icons/md";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(false);
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
      <div
        className="bg-cover bg-center text-white min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
        }}
      >
        <NavBar />

        <div className="text-white m-6 absolute lg:hidden">
          <button onClick={() => setSummary(true)}>
            <MdSummarize size={30} />
          </button>

          <div
            className={
              summary
                ? "flex bg-slate-950 fixed top-[35%] left-[11%] w-[75%] sm:w-[60%] sm:left-[20%] md:left-[30%] md:w-[50%] h-auto z-10 p-3 duration-300"
                : "fixed left-[-100%] duration-300 w-[75%] sm:w-[60%] md:w-[50%] top-[35%] z-10 ease-in"
            }
          >
            <OrderSummary />
            <button
              className="p-2 h-12 mr-[-6rem]"
              onClick={() => setSummary(false)}
            >
              <MdOutlineClose size={30} />
            </button>
          </div>
        </div>

        <div className="w-screen h-auto p-9 mt-9 lg:mt-0">
          <div className="rounded-xl p-3 card glass">
            <h1 className="text-3xl font-bold font-irishGrover p-5 border-0 border-b-[3px] border-slate-400">
              Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-2 w-full lg:w-[120%]">
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
              </div>

              <div className="hidden lg:flex p-8 h-auto w-[80%] ml-[20%]">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
