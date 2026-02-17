export default function KpiCard({ title, value, change }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
      }}
    >
      <p style={{ color: "#64748b", marginBottom: "6px", fontSize: "14px" }}>
        {title}
      </p>

      <h2 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>
        {value}
      </h2>

      {change && (
        <p style={{ color: "#10b981", fontSize: "13px", marginTop: "6px" }}>
          {change}
        </p>
      )}
    </div>
  );
}
