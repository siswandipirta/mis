export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 px-6 py-3 text-sm flex justify-between shadow-inner">
      <span className="text-sm">© {new Date().getFullYear()} MIS Dashboard</span>

      <span className="text-sm text-gray-400">
        Built with ❤️ by IT Team
      </span>

    </footer>
  );
}