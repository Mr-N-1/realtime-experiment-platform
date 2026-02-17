import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function LiveChart({ data }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h4 style={{ margin: 0 }}>Live Time-Series</h4>

        <div style={{ display: "flex", gap: "10px" }}>
          <select style={selectStyle}>
            <option>Last 5m</option>
            <option>Last 1h</option>
            <option>24h</option>
          </select>

          <select style={selectStyle}>
            <option>Temperature</option>
            <option>Pressure</option>
            <option>Voltage</option>
          </select>

          <button style={pauseBtn}>Pause</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
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
  );
}

const selectStyle = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
};

const pauseBtn = {
  padding: "6px 14px",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
