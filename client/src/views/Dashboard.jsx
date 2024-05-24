import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigations = ["all", "trumpet", "guitar", "saxophone", "piano"];

  return (
    <div
      className="bg-cover bg-center text-white min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
      }}
    >
      <NavBar />

      <div className="flex align-center">
        <div>
          <SideNav navigations={navigations} page={"dashbaord"} />
        </div>

        <main className="w-screen grid grid-cols-1 mt-20 md:mt-5 justify-items-center items-center grid-flow-row gap-4 mx-2 my-4 md:grid-cols-2 lg:grid-cols-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
