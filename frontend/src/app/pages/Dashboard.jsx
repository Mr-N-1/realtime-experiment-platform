export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-6">
        <Kpi title="Total Data Points" value="12,450" />
        <Kpi title="Active Sensors" value="24" />
        <Kpi title="Avg Response Time" value="230ms" />
        <Kpi title="Anomaly Count" value="3" />
      </div>
    </div>
  );
}

function Kpi({ title, value }) {
  return (
    <div className="bg-[var(--card)] p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
