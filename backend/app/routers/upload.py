from fastapi import APIRouter, UploadFile, File, HTTPException
from app.database import clickhouse
import pandas as pd
import json
import io
from datetime import datetime

router = APIRouter()

@router.post("/upload/preview")
async def upload_preview(file: UploadFile = File(...)):

    content = await file.read()

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


@router.post("/upload/ingest")
async def upload_ingest(file: UploadFile = File(...), mapping: str = ""):

    content = await file.read()

    if file.filename.endswith(".csv"):
        df = pd.read_csv(io.BytesIO(content))
    elif file.filename.endswith(".json"):
        df = pd.read_json(io.BytesIO(content))
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    mapping = json.loads(mapping)

    inserted = 0

    for _, row in df.iterrows():

        raw_ts = row[mapping["timestamp_column"]]

        if isinstance(raw_ts, (int, float)):
            timestamp = datetime(int(raw_ts), 1, 1)
        else:
            timestamp = pd.to_datetime(raw_ts).to_pydatetime()

        clickhouse.execute(
            "INSERT INTO experiments.events VALUES",
            [(
                mapping.get("experiment_id", "upload-exp"),
                str(row[mapping["device_column"]]),
                timestamp,
                mapping["metric_name"],
                float(row[mapping["value_column"]]),
                mapping.get("unit", "")
            )]
        )

        inserted += 1

    return {
        "status": "success",
        "rows_ingested": inserted
    }
