import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const data = generateMockData();

  return (
    <>
      {/* KPI Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <KpiCard title="Total Data Points" value="12,450" />
        <KpiCard title="Active Sensors" value="24" />
        <KpiCard title="Avg Response Time" value="230ms" />
        <KpiCard title="Anomaly Count" value="3" />
      </div>

      {/* Chart Section */}
      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ margin: 0 }}>Live Time-Series</h3>

          <div style={{ display: "flex", gap: "12px" }}>
            <select style={controlStyle}>
              <option>Last 5m</option>
              <option>Last 1h</option>
              <option>Last 24h</option>
            </select>

            <select style={controlStyle}>
              <option>Temperature</option>
              <option>Latency</option>
              <option>Throughput</option>
            </select>

            <button style={buttonStyle}>Pause</button>
          </div>
        </div>

        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Data Table */}
      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Recent Data</h3>

        <table
          width="100%"
          cellPadding="10"
          style={{ borderCollapse: "collapse" }}
        >
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th align="left">Timestamp</th>
              <th align="left">Sensor</th>
              <th align="left">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((d, i) => (
              <tr
                key={i}
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <td>{d.time}</td>
                <td>Sensor-{i}</td>
                <td>{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- Components ---------- */

function KpiCard({ title, value }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <span
        style={{
          fontSize: "13px",
          color: "#64748b",
          fontWeight: 500,
        }}
      >
        {title}
      </span>

      <span
        style={{
          fontSize: "26px",
          fontWeight: 700,
          color: "#111827",
        }}
      >
        {value}
      </span>

      <span
        style={{
          fontSize: "12px",
          color: "#10b981",
        }}
      >
        +4.2% from last hour
      </span>
    </div>
  );
}

/* ---------- Styles ---------- */

const controlStyle = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
  background: "#ffffff",
};

const buttonStyle = {
  padding: "6px 12px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

/* ---------- Mock Data ---------- */

function generateMockData() {
  const base = 80;
  return Array.from({ length: 20 }).map((_, i) => ({
    time: `10:${String(i).padStart(2, "0")}`,
    value: Math.floor(base + Math.random() * 80),
  }));
}
