import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { UserContextProvider } from "../context/UserContext.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
