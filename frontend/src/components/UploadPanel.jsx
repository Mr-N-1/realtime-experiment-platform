import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function UploadPanel({ onIngestComplete }) {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
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
      const res = await fetch(`${API_BASE}/upload/preview`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Preview failed");

      const data = await res.json();
      setColumns(data.columns || []);
    } catch (err) {
      console.error(err);
      alert("Preview failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Ingest ----------
  const ingestData = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mapping", JSON.stringify(mapping));

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/upload/ingest`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Ingest failed");

      const data = await res.json();

      alert(`✅ Ingested ${data.rows_ingested || 0} rows`);
      onIngestComplete();
    } catch (err) {
      console.error(err);
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
      <h3>📤 Upload Experiment Data</h3>

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
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <input
            placeholder="Metric name"
            style={inputStyle}
            onChange={(e) =>
              setMapping({ ...mapping, metric_name: e.target.value })
            }
          />

          <input
            placeholder="Unit"
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

      {loading && <p>⏳ Processing...</p>}
    </div>
  );
}

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
