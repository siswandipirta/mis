import { Link } from "react-router-dom";
import { Home, BarChart2, Users, Sun, Moon } from "lucide-react";

function Sidebar({ toggleDark, dark }) {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 space-y-4 shadow-md">
      <h2 className="text-xl font-semibold">Admin Panel</h2>
      <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
        <Home /> <span>Dashboard</span>
      </Link>
      <Link to="/kpi" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
        <BarChart2 /> <span>KPI</span>
      </Link>
      <Link to="/users" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
        <Users /> <span>Users</span>
      </Link>
      <button onClick={toggleDark} className="mt-4 flex items-center gap-2 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700">
        {dark ? <Sun /> : <Moon />} <span className="ml-1">Toggle Theme</span>
      </button>
    </aside>
  );
}

export default Sidebar;