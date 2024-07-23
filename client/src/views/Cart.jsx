import NavBar from "../components/NavBar";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CartCard from "../components/CartCard";

const Cart = () => {
  const navigate = useNavigate();
  const { user, loading, token } = useContext(UserContext);

  useEffect(() => {
    if (!loading && user) {
      if (!token) {
        return navigate("/");
      }
    }
  }, [user, loading, token]);

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
        <CartCard />
      </div>
    </>
  );
};

export default Cart;
