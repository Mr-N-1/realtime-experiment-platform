import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = Array.from({ length: 20 }, (_, i) => ({
  time: `10:${i < 10 ? "0" + i : i}`,
  value: Math.floor(Math.random() * 100) + 50,
}));

export default function Dashboard() {
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* KPI Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <KpiCard title="Total Data Points" value="12,450" />
        <KpiCard title="Active Sensors" value="24" />
        <KpiCard title="Avg Response Time" value="230ms" />
        <KpiCard title="Anomaly Count" value="3" />
      </div>

      {/* Charts Section */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Live Time-Series</h3>
          <button
            onClick={() => setPaused(!paused)}
            style={buttonStyle}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Data Table */}
      <Card>
        <h3>Recent Data</h3>
        <table width="100%" cellPadding="10">
          <thead>
            <tr>
              <th align="left">Timestamp</th>
              <th align="left">Sensor</th>
              <th align="left">Value</th>
            </tr>
          </thead>
          <tbody>
            {mockData.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
                <td>Sensor-{index}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div style={cardStyle}>
      <p style={{ color: "#64748b" }}>{title}</p>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );
}

function Card({ children }) {
  return (
    <div style={{ ...cardStyle, padding: "20px" }}>
      {children}
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "18px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const buttonStyle = {
  padding: "6px 12px",
  background: "#6366f1",
  border: "none",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};
