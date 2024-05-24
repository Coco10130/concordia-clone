import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Cart from "./views/Cart";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/UserContext";
import Shop from "./views/Shop";

function App() {
  return (
    <>
      <UserContextProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
