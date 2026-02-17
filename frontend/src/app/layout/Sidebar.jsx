import { NavLink } from "react-router-dom";

const linkStyle = {
  display: "block",
  padding: "12px 16px",
  textDecoration: "none",
  color: "#cbd5e1",
  borderRadius: "8px",
  marginBottom: "6px",
};

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "#0f172a",
        padding: "20px",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>⚡ RTViz</h2>

      <NavLink to="/" style={linkStyle}>Dashboard</NavLink>
      <NavLink to="/upload" style={linkStyle}>Upload</NavLink>
      <NavLink to="/streams" style={linkStyle}>Streams</NavLink>
      <NavLink to="/experiments" style={linkStyle}>Experiments</NavLink>
      <NavLink to="/analytics" style={linkStyle}>Analytics</NavLink>
      <NavLink to="/reports" style={linkStyle}>Reports</NavLink>
      <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
    </aside>
  );
}
