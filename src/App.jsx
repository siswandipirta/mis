import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import InputKPI from "./pages/InputKPI";
import ServerMonitoring from "./pages/ServerMonitoring";
import Footer from "./components/Footer";


const API = "http://localhost/mis/mis/backend/auth.php";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(API, { username, password });

      if (res.data.token) {
        setToken(res.data.token);
        setUser(res.data.user);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch {
      alert("Login gagal");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // LOGIN PAGE
  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow w-80">

          <h2 className="mb-4 font-bold text-center">Login</h2>

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
            className="w-full bg-blue-600 text-white py-2"
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  // DASHBOARD
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

        {/* MAIN CONTENT */}
        <div className="flex-1 p-4 overflow-auto">
          <Dashboard />
        </div>

        {/* FOOTER */}
        <Footer />

      </div>

    </div>

  </div>
);
}