import { Link } from "react-router-dom";
import { Home, BarChart2, Users, Sun, Moon } from "lucide-react";

function Sidebar({ toggleDark, dark }) {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <Link to="/" className="flex gap-2"><Home /> Dashboard</Link>
      <Link to="/kpi" className="flex gap-2"><BarChart2 /> KPI</Link>
      <Link to="/users" className="flex gap-2"><Users /> Users</Link>
      <button onClick={toggleDark} className="mt-4 flex gap-2">
        {dark ? <Sun /> : <Moon />} Toggle Theme
      </button>
    </div>
  );
}

export default Sidebar;