import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function TopNavbar() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center bg-[var(--card)] border-b border-[var(--border)] px-6 py-4">
      <h1 className="text-xl font-semibold">
        Real-Time Big Data Visualization
      </h1>

      <div className="flex items-center gap-6">
        <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
          Live
        </span>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-2 bg-indigo-600 text-white rounded-lg"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}
