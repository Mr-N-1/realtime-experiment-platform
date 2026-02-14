import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "240px",
          background: "#020617",
          color: "#ffffff",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "40px" }}>⚡ RTViz</h2>

        <div
          style={{ marginBottom: "16px", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          📊 Dashboard
        </div>

        <div
          style={{ cursor: "pointer", marginBottom: "auto" }}
          onClick={() =>
            document
              .getElementById("upload-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          📤 Upload Data
        </div>

        <button
          onClick={toggleTheme}
          style={{
            padding: "10px",
            background: "#1e293b",
            color: "#fff",
            fontSize: "14px",
          }}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          padding: "32px",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
