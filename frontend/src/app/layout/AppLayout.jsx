import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function AppLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopNavbar />
        <main style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
