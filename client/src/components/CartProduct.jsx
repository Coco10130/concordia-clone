import { IoMdClose } from "react-icons/io";

const CartProduct = ({ products }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);
  };

  return (
    <>
      {products.map((product, index) => (
        <div
          key={index}
          className="border-0 border-b-2 border-slate-400 p-3 mt-2"
        >
          <div className="flex flex-col sm:flex-row justify-items-center items-center p-2">
            <div className="h-full w-auto mr-5">
              <input
                type="checkbox"
                className="checkbox checkbox-primary border-[3px] border-slate-600 duration-300 ease-in"
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
                  <button className="px-2 md:px-4 py-2 text-lg">-</button>

                  <input
                    type="text"
                    value={product.quantity}
                    readOnly
                    className="w-12 text-center border-0 outline-none bg-transparent"
                  />

                  <button className="px-2 md:px-4 py-2 text-lg">+</button>
                </div>
              </div>

              <div className="flex flex-col justify-end sm:justify-between items-end w-full h-[10rem] px-4 py-2">
                <div className="cursor-pointer hidden sm:flex">
                  <IoMdClose size={30} />
                </div>

                <p className="text-md sm:text-xl font-inder font-semibold text">
                  {formatCurrency(product.subTotal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartProduct;
