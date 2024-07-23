import React from "react";

const OrderSummary = ({ subtotal }) => {

  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);
  };

  const computeTotal = () => {
    return subtotal + 60;
  };

  return (
    <>
      <div className="border-2 border-slate-800 w-full h-[18rem] p-6 rounded-xl mt-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-white font-irishGrover">
          Order Summary
        </h1>
        <div className="text-white font-inder mt-6 space-y-4">
          <div className="grid grid-cols-2 text-gray-400">
            <p className="text-start text-sm sm:text-md md:text-lg">Subtotal</p>
            <p className="text-end text-sm sm:text-md md:text-lg">
              {formatCurrency(subtotal)}
            </p>
          </div>
          <div className="grid grid-cols-2 text-gray-400">
            <p className="text-start text-sm sm:text-md md:text-lg">
              Shipping fee
            </p>
            <p className="text-end text-sm sm:text-md md:text-lg">₱60.00</p>
          </div>
          <div className="grid grid-cols-2 text-gray-400">
            <p className="text-start text-sm sm:text-md md:text-lg">Total</p>
            <p className="text-end text-sm sm:text-md md:text-lg">
              {formatCurrency(computeTotal())}
            </p>
          </div>

          <div className="w-full flex justify-center">
            <button className="w-[80%] text-white bg-blue-700 py-2 rounded-2xl hover:bg-white hover:text-blue-700 duration-300 ease-in">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
