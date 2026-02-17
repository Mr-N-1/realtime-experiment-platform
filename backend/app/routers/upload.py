from fastapi import APIRouter, UploadFile, File, HTTPException
from app.database import clickhouse
import pandas as pd
import json
import io
from datetime import datetime

router = APIRouter()


# ---------------------------------------------------
# PREVIEW ENDPOINT
# ---------------------------------------------------
@router.post("/upload/preview")
async def upload_preview(file: UploadFile = File(...)):

    content = await file.read()

    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(content))
        elif file.filename.endswith(".json"):
            df = pd.read_json(io.BytesIO(content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        return {
            "filename": file.filename,
            "columns": list(df.columns),
            "preview": df.head(10).to_dict(orient="records"),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Preview failed: {str(e)}")


# ---------------------------------------------------
# INGEST ENDPOINT
# ---------------------------------------------------
@router.post("/upload/ingest")
async def upload_ingest(file: UploadFile = File(...), mapping: str = ""):

    content = await file.read()

    # ---- Load DataFrame safely ----
    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(content))
        elif file.filename.endswith(".json"):
            df = pd.read_json(io.BytesIO(content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File read error: {str(e)}")

    # ---- Validate mapping JSON ----
    try:
        mapping = json.loads(mapping)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid mapping JSON")

    required_keys = ["timestamp_column", "device_column", "value_column", "metric_name"]

    for key in required_keys:
        if key not in mapping or not mapping[key]:
            raise HTTPException(status_code=400, detail=f"Missing mapping: {key}")

    # ---- Validate columns exist ----
    for col in [
        mapping["timestamp_column"],
        mapping["device_column"],
        mapping["value_column"],
    ]:
        if col not in df.columns:
            raise HTTPException(
                status_code=400,
                detail=f"Column '{col}' not found in uploaded file",
            )

    inserted = 0
    errors = []

    # ---- Insert Rows ----
    for index, row in df.iterrows():
        try:
            raw_ts = row[mapping["timestamp_column"]]

            # Robust timestamp handling
            if isinstance(raw_ts, (int, float)):
                timestamp = datetime(int(raw_ts), 1, 1)
            else:
                timestamp = pd.to_datetime(raw_ts, errors="coerce")

                if pd.isna(timestamp):
                    raise ValueError("Invalid timestamp")

                timestamp = timestamp.to_pydatetime()

            value = float(row[mapping["value_column"]])

            clickhouse.execute(
                "INSERT INTO experiments.events VALUES",
                [(
                    mapping.get("experiment_id", "upload-exp"),
                    str(row[mapping["device_column"]]),
                    timestamp,
                    mapping["metric_name"],
                    value,
                    mapping.get("unit", "")
                )]
            )

            inserted += 1

        except Exception as e:
            errors.append({
                "row": int(index),
                "error": str(e)
            })

    return {
        "status": "success",
        "rows_ingested": inserted,
        "total_rows": len(df),
        "errors_sample": errors[:5]
    }
