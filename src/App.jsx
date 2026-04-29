import { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import InputKPI from "./pages/InputKPI";
import ServerMonitoring from "./pages/ServerMonitoring";

const API = "http://localhost/MIS/MIS/Backend/auth.php";

export default function App() {

  // 🔐 STATE
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔑 LOGIN
  const login = async () => {
    try {
      const res = await axios.post(API, { username, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setToken(res.data.token);
        setUser(res.data.user);

        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      }
    } catch (err) {
      console.log(err);
      alert("Login gagal");
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    delete axios.defaults.headers.common.Authorization;
  };

  // ================= LOGIN =================
  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow w-80">

          <h2 className="mb-4 font-bold text-center">Login MIS</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-2 p-2 border"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  // 🔐 ROLE CHECK
  if (!user || user.role !== "admin") {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-red-500 text-xl">Akses ditolak</h1>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div className="flex flex-col h-screen">

      {/* NAVBAR */}
      <Navbar user={user} onLogout={logout} />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className="flex flex-col flex-1">

          {/* MAIN */}
          <div className="flex-1 p-4 overflow-auto bg-gray-100">

            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/input" element={<InputKPI />} />
              <Route path="/monitoring" element={<ServerMonitoring />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>

          </div>

          {/* FOOTER */}
          <Footer />

        </div>
      </div>
    </div>
  );
}