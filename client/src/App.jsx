import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import { Routes, Route } from "react-router-dom";
import Profile from "./views/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
