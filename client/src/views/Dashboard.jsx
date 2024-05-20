import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import SideNav from "../components/SideNav";

const Dashboard = () => {
  const navigations = ["Trumpet", "Guitar", "Saxophone", "Piano", "Guitar"];
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      className="bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
      }}
    >
      <NavBar />
      <div className="flex align-center">
        <div>
          <SideNav navigations={navigations} />
        </div>

        <main className="w-screen grid grid-cols-1 mt-20 md:mt-5 justify-items-center items-center grid-flow-row gap-4 mx-2 my-4 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
