import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Cart from "./views/Cart";
import ShopCard from "./components/ShopCard";
import ProfileCard from "./components/ProfileCard";
import ProductCard from "./categories/ProductCard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import CategoryProduct from "./categories/CategoryProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <ProductCard />,
      },

      {
        path: ":category",
        element: <CategoryProduct />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/profile",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "",
            element: <ProfileCard />,
          },
          {
            path: "/profile/shop",
            element: <ShopCard />,
          },
        ],
      },
    ],
  },

  {
    path: "/cart",
    element: <Cart />,
  },
]);

export default router;
