export default function DataTable({ data }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginTop: "24px",
      }}
    >
      <h4>Recent Data</h4>

      <table width="100%" style={{ marginTop: "12px" }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Timestamp</th>
            <th>Sensor</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{ borderTop: "1px solid #e5e7eb" }}>
              <td>{row.time}</td>
              <td>{row.sensor}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
