import { Home, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">MIS KPI</h2>

      <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
        <Home size={18}/> Dashboard
      </Link>

      <Link to="/input" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
        <Plus size={18}/> Input KPI
      </Link>

      <Link to="/monitoring" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mt-2">
        <Home size={18}/> Server Monitoring
      </Link>
    </aside>
  );
}