import { useState } from "react";
import { LogOut, User } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-gray-900 text-white shadow-lg px-6 py-4 flex justify-between items-center">

      {/* TITLE */}
      <h1 className="font-semibold text-2xl">MIS Dashboard</h1>

      {/* PROFILE */}
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <User size={18} />
          <span>{user?.username || "Admin"}</span>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 bg-gray-800 text-white border border-gray-700 rounded shadow w-44">

            <div className="p-3 hover:bg-gray-700 cursor-pointer">Profile</div>

            <div
              onClick={onLogout}
              className="p-3 hover:bg-red-700 text-red-300 flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </div>

          </div>
        )}
      </div>

    </header>
  );
}