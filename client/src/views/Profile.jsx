import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Outlet } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const navigations = ["profile", "purchase", "shop"];
  const [isEditable, setIsEditable] = useState(false);
  const { user, loading, token } = useContext(UserContext);

  if (!loading && !token) {
    return navigate("/login");
  }

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

        <div className="flex align-center">
          <div>
            <SideNav navigations={navigations} page={"profile"} />
          </div>

          <div className="w-full flex justify-center items-center mt-28 md:mt-10 mb-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
