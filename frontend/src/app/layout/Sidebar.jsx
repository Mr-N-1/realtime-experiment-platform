import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload Dataset", path: "/upload" },
    { name: "Live Stream", path: "/streams" },
    { name: "Experiments", path: "/experiments" },
    { name: "Analytics", path: "/analytics" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">⚡ RTViz</h2>

      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className="block px-3 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
