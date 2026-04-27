import { Home, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">MIS KPI</h2>

      <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <Home size={18}/> Dashboard
      </Link>

      <Link to="/input" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
        <Plus size={18}/> Input KPI
      </Link>

      <Link to="/monitoring" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded mt-2">
        <Home size={18}/> Server Monitoring
      </Link>
    </div>
  );
}