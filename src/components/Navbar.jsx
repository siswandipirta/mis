import { useState } from "react";
import { LogOut, User } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-gray-900 text-white shadow px-6 py-3 flex justify-between items-center">

      {/* TITLE */}
      <h1 className="font-semibold text-lg">MIS Dashboard</h1>

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
          <div className="absolute right-0 mt-2 bg-white text-gray-900 border rounded shadow w-40">

            <div className="p-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </div>

            <div
              onClick={onLogout}
              className="p-2 hover:bg-red-100 text-red-500 flex items-center gap-2 cursor-pointer"
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