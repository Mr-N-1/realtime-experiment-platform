import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "15px",
          background: "#1976d2",
          color: "white",
        }}
      >
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>
          Dashboard
        </Link>
        <Link to="/upload" style={{ color: "white" }}>
          Upload Data
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}
