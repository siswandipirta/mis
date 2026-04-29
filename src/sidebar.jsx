import { NavLink } from "react-router-dom";
import { Home, BarChart2, Users, Sun, Moon } from "lucide-react";

function Sidebar({ toggleDark, dark }) {
  return (
    <aside className="w-72 bg-gray-900 text-white min-h-screen p-3 space-y-3 shadow-md border-r border-gray-800">
      <h2 className="text-2xl font-semibold">Admin Panel</h2>

      <nav className="space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded ${isActive ? 'bg-gray-800 ring-1 ring-white/10' : 'hover:bg-gray-800'}`
          }
        >
          <Home className="w-5 h-5"/> <span className="text-lg">Dashboard</span>
        </NavLink>

        <NavLink
          to="/kpi"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded ${isActive ? 'bg-gray-800 ring-1 ring-white/10' : 'hover:bg-gray-800'}`
          }
        >
          <BarChart2 className="w-5 h-5"/> <span className="text-lg">KPI</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded ${isActive ? 'bg-gray-800 ring-1 ring-white/10' : 'hover:bg-gray-800'}`
          }
        >
          <Users className="w-5 h-5"/> <span className="text-lg">Users</span>
        </NavLink>
      </nav>

      <div className="mt-6">
        <button onClick={toggleDark} className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} <span className="ml-2">Toggle Theme</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;