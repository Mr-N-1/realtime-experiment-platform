import { useState } from "react";

export default function UploadPanel({ onIngestComplete }) {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mapping, setMapping] = useState({
    experiment_id: "upload-exp",
    timestamp_column: "",
    device_column: "",
    value_column: "",
    metric_name: "",
    unit: "",
  });

  // ---------- Preview ----------
  const uploadPreview = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8001/upload/preview", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setColumns(data.columns || []);
      setPreview(data.preview || []);
    } catch {
      alert("Preview failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Ingest ----------
  const ingestData = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mapping", JSON.stringify(mapping));

    setLoading(true);
    try {
      await fetch("http://127.0.0.1:8001/upload/ingest", {
        method: "POST",
        body: formData,
      });
      alert("✅ Data ingested");
      onIngestComplete(); // refresh dashboard
    } catch {
      alert("Ingest failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="upload-section"
      style={{
        position: "sticky",
        top: "20px",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>📤 Upload Experiment Data</h3>
      <p style={{ fontSize: "14px", color: "#64748b" }}>
        Upload CSV or JSON and map columns
      </p>

      {/* File Input */}
      <input
        type="file"
        accept=".csv,.json"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ margin: "12px 0" }}
      />

      <button onClick={uploadPreview} style={btnPrimary}>
        Preview File
      </button>

      {columns.length > 0 && (
        <>
          <hr style={{ margin: "20px 0" }} />

          <h4>🧩 Column Mapping</h4>

          {[
            ["timestamp_column", "Timestamp"],
            ["device_column", "Device"],
            ["value_column", "Value"],
          ].map(([key, label]) => (
            <div key={key} style={{ marginTop: "10px" }}>
              <label>{label}</label>
              <select
                value={mapping[key]}
                onChange={(e) =>
                  setMapping({ ...mapping, [key]: e.target.value })
                }
                style={selectStyle}
              >
                <option value="">Select</option>
                {columns.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          ))}

          <input
            placeholder="Metric name (e.g. energy_efficiency)"
            style={inputStyle}
            onChange={(e) =>
              setMapping({ ...mapping, metric_name: e.target.value })
            }
          />

          <input
            placeholder="Unit (e.g. km/kWh)"
            style={inputStyle}
            onChange={(e) =>
              setMapping({ ...mapping, unit: e.target.value })
            }
          />

          <button
            onClick={ingestData}
            style={{ ...btnPrimary, marginTop: "12px" }}
          >
            🚀 Ingest Data
          </button>
        </>
      )}

      {loading && <p style={{ marginTop: "10px" }}>⏳ Processing...</p>}
    </div>
  );
}

// ---------- Styles ----------
const btnPrimary = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px",
};

const selectStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "4px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "10px",
};
