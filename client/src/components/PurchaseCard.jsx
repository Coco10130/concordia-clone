import React from "react";
import PurchaseProduct from "./PurchaseProduct";

const PurchaseCard = () => {
  return (
    <>
      <div className="card glass w-[90%] lg:w-[80%] text-white p-4 rounded-xl h-auto shadow-xl">
        <h1 className="text-4xl font-irishGrover border-0 border-b-[3px] border-b-slate-400 pb-3 m-3 font-bold straight-border">
          Purchase
        </h1>
        <div className="flex flex-col h-[85%] m-2">
          <PurchaseProduct />
        </div>
      </div>
    </>
  );
};

export default PurchaseCard;
