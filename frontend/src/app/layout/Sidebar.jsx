import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "Streams", path: "/streams" },
    { name: "Experiments", path: "/experiments" },
    { name: "Analytics", path: "/analytics" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside
      style={{
        width: "250px",
        background: "#0f172a",
        color: "#ffffff",
        padding: "28px 18px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: "40px", fontWeight: 700 }}>
        ⚡ RTViz
      </h2>

      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          style={({ isActive }) => ({
            padding: "10px 14px",
            borderRadius: "8px",
            marginBottom: "8px",
            textDecoration: "none",
            fontWeight: 500,
            color: isActive ? "#ffffff" : "#cbd5e1",
            background: isActive ? "#1e293b" : "transparent",
            transition: "all 0.2s ease",
          })}
        >
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
}
