import { useEffect, useState, useMemo } from "react";
import UploadPanel from "../components/UploadPanel";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMetric, setSelectedMetric] = useState("");
  const [selectedExperiment, setSelectedExperiment] = useState("");

  // ---------------- Fetch Data ----------------
  const fetchData = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- Extract Filters ----------------
  const metrics = [...new Set(events.map((e) => e.metric))];
  const experiments = [...new Set(events.map((e) => e.experiment_id))];

  useEffect(() => {
    if (metrics.length > 0 && !selectedMetric) {
      setSelectedMetric(metrics[0]);
    }
  }, [metrics]);

  // ---------------- Filtered Data ----------------
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      return (
        (!selectedMetric || e.metric === selectedMetric) &&
        (!selectedExperiment || e.experiment_id === selectedExperiment)
      );
    });
  }, [events, selectedMetric, selectedExperiment]);

  // ---------------- KPI Calculations ----------------
  const values = filteredEvents.map((e) => e.value);
  const total = values.length;
  const avg =
    total > 0 ? (values.reduce((a, b) => a + b, 0) / total).toFixed(2) : 0;
  const min = total > 0 ? Math.min(...values) : 0;
  const max = total > 0 ? Math.max(...values) : 0;

  // ---------------- Chart Data ----------------
  const chartData = filteredEvents
    .slice()
    .reverse()
    .slice(0, 50)
    .map((e, i) => ({
      index: i + 1,
      time: e.timestamp.split("T")[0],
      value: e.value,
    }));

  const pieData = chartData.slice(0, 6).map((d, i) => ({
    name: `Item ${i + 1}`,
    value: d.value,
  }));

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#14b8a6"];

  return (
    <>
      <h1 style={{ fontSize: "28px", marginBottom: "6px" }}>
        📊 RTViz Analytics
      </h1>
      <p style={{ marginBottom: "24px", color: "#64748b" }}>
        Real-time visualization platform
      </p>

      {/* FILTER CONTROLS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          {metrics.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select
          value={selectedExperiment}
          onChange={(e) => setSelectedExperiment(e.target.value)}
        >
          <option value="">All Experiments</option>
          {experiments.map((exp) => (
            <option key={exp}>{exp}</option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "24px",
        }}
      >
        <UploadPanel onIngestComplete={fetchData} />

        <div>
          {/* KPI CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginBottom: "30px",
            }}
          >
            <KpiCard title="Total Records" value={total} />
            <KpiCard title="Average" value={avg} />
            <KpiCard title="Min" value={min} />
            <KpiCard title="Max" value={max} />
          </div>

          {/* CHART GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            <ChartCard title="Line Trend">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line dataKey="value" stroke="#2563eb" dot={false} />
              </LineChart>
            </ChartCard>

            <ChartCard title="Bar Comparison">
              <BarChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ChartCard>

            <ChartCard title="Area Distribution">
              <AreaChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area dataKey="value" fill="#6366f1" stroke="#6366f1" />
              </AreaChart>
            </ChartCard>

            <ChartCard title="Scatter Outliers">
              <ScatterChart>
                <XAxis type="number" dataKey="index" />
                <YAxis type="number" dataKey="value" />
                <Tooltip />
                <Scatter data={chartData} fill="#ef4444" />
              </ScatterChart>
            </ChartCard>

            <ChartCard title="Pie Share">
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartCard>

            <ChartCard title="Radar Pattern">
              <RadarChart data={pieData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ChartCard>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------- Reusable Components ----------

function KpiCard({ title, value }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "18px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <p style={{ fontSize: "14px", color: "#64748b" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        height: "320px",
      }}
    >
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height="85%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
