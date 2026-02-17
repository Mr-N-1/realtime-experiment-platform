export default function TopNavbar() {
  return (
    <div
      style={{
        height: "64px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <h3 style={{ margin: 0, fontWeight: 600 }}>
        Real-Time Big Data Visualization
      </h3>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Live indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 10px #10b981",
            }}
          ></span>
          Live
        </div>

        {/* Profile circle */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#e5e7eb",
          }}
        ></div>
      </div>
    </div>
  );
}
