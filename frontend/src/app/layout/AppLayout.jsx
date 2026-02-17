import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <TopNavbar />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
