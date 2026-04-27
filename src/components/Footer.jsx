export default function Footer() {
  return (
    <div className="bg-white border-t px-6 py-3 text-sm text-gray-500 flex justify-between">
      
      <span>© {new Date().getFullYear()} MIS Dashboard</span>

      <span>
        Built with ❤️ by IT Team
      </span>

    </div>
  );
}