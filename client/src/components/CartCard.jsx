import { MdSummarize, MdOutlineClose } from "react-icons/md";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../axios";
import OrderSummary from "./OrderSummary";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const CartCard = () => {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState({});
  const { user, loading, token } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!loading && user && token) {
          const { data } = await axios.get("/api/cart", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [user, token, loading]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);
  };

  const handleDelete = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.success);
        setProducts(data.cart);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (productId, isChecked) => {
    setCheckedProducts((prev) => ({ ...prev, [productId]: isChecked }));
  };

  const computeSubtotal = () => {
    return products
      .filter((product) => checkedProducts[product._id])
      .reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  const subtotal = computeSubtotal();

  return (
    <>
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
          <OrderSummary subtotal={subtotal} />
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
              {products.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full font-inder">
                  <p className="text-5xl text-white">Empty Cart</p>
                </div>
              ) : (
                products.map((product, index) => (
                  <div
                    key={index}
                    className="border-0 border-b-2 border-slate-400 p-3 mt-2"
                  >
                    <div className="flex flex-col sm:flex-row justify-items-center items-center p-2">
                      <div className="h-full w-auto mr-5">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary border-[3px] border-slate-600 duration-300 ease-in"
                          onChange={(e) =>
                            handleCheckboxChange(product._id, e.target.checked)
                          }
                        />
                      </div>

                      <img
                        src={`/images/${product.image}`}
                        alt="Product Img"
                        className="w-20 h-20 md:h-40 md:w-40 border-2 border-slate-500"
                      />
                      <div className="grid grid-cols-2 w-full mt-5 sm:mt-0">
                        <div className="flex flex-col justify-between w-full h-[10rem] px-4 py-2">
                          <p className="text-white text-xl md:text-2xl font-inder">
                            {product.productName}
                          </p>

                          <div className="flex items-center border border-gray-300 rounded h-[2rem] w-[6rem] md:h-[2.4rem] md:w-[8.3rem]">
                            <button className="px-2 md:px-4 py-2 text-lg">
                              -
                            </button>

                            <input
                              type="text"
                              value={product.quantity}
                              readOnly
                              className="w-12 text-center border-0 outline-none bg-transparent"
                            />

                            <button className="px-2 md:px-4 py-2 text-lg">
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col justify-end sm:justify-between items-end w-full h-[10rem] px-4 py-2">
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="cursor-pointer hidden sm:flex"
                          >
                            <IoMdClose size={30} />
                          </button>

                          <p className="text-md sm:text-xl font-inder font-semibold text">
                            {formatCurrency(product.subTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="hidden lg:flex p-8 h-auto w-[80%] ml-[20%]">
              <OrderSummary subtotal={subtotal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
