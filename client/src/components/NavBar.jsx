import AnyaImg from "/images/anya-pfp.jpg";
import axios from "../axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, token, loading, logout } = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!loading && user && token) {
          const { data } = await axios.get("/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (data.success) {
            setProfile(data.user);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfile();
  }, [user, loading, profile]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-xl rounded-3xl h-20 w-full mt-[-15px] pt-4">
        <div className="flex-1 ml-10">
          <Link
            to={"/"}
            className="text-sm md:text-xl font-irishGrover text-slate-800 font-bold mx-1 md:mx-5 cursor:pointer"
          >
            Concordia Portum
          </Link>
        </div>

        {!loading && token && user ? (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {profile.cartItems}
                  </span>
                </div>
              </div>

              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-black text-lg">
                    {profile.cartItems} Items
                  </span>
                  <div className="card-actions">
                    <Link to="/cart" className="btn btn-primary btn-block">
                      View Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown dropdown-end mx-7">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={profile.image ? `/images/${profile.image}` : AnyaImg}
                    alt="Profile"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
              >
                <li>
                  <button onClick={() => navigate("/profile")}>Profile</button>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-6 mr-10">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white font-inder w-20 py-2 rounded-2xl"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-500 text-white font-inder w-20 py-2 rounded-2xl"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
