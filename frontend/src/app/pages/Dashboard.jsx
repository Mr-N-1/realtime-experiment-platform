import KpiCard from "../components/KpiCard";
import LiveChart from "../components/LiveChart";
import DataTable from "../components/DataTable";

export default function Dashboard() {
  const chartData = Array.from({ length: 20 }, (_, i) => ({
    time: `10:${i < 10 ? "0" + i : i}`,
    value: Math.floor(Math.random() * 120) + 40,
  }));

  const tableData = chartData.map((item, index) => ({
    time: item.time,
    sensor: `Sensor-${index}`,
    value: item.value,
  }));

  return (
    <>
      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <KpiCard
          title="Total Data Points"
          value="12,450"
          change="+4.2% from last hour"
        />
        <KpiCard
          title="Active Sensors"
          value="24"
          change="+2 new sensors"
        />
        <KpiCard
          title="Avg Response Time"
          value="230ms"
          change="Stable"
        />
        <KpiCard
          title="Anomaly Count"
          value="3"
          change="↓ 1 from last hour"
        />
      </div>

      <LiveChart data={chartData} />
      <DataTable data={tableData} />
    </>
  );
}
