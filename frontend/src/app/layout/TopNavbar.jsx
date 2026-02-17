export default function TopNavbar() {
  return (
    <div
      style={{
        height: "60px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <div style={{ fontWeight: "600" }}>
        Real-Time Big Data Visualization
      </div>

      <div>
        🟢 Live
      </div>
    </div>
  );
}
