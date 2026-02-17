import { Routes, Route } from "react-router-dom";
import AppLayout from "./app/layout/AppLayout";

import Dashboard from "./app/pages/Dashboard";
import Upload from "./app/pages/Upload";
import Streams from "./app/pages/Streams";
import Experiments from "./app/pages/Experiments";
import Analytics from "./app/pages/Analytics";
import Reports from "./app/pages/Reports";
import Settings from "./app/pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/streams" element={<Streams />} />
        <Route path="/experiments" element={<Experiments />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
