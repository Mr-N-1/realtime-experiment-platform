from fastapi import APIRouter
from app.database import clickhouse

router = APIRouter()

@router.get("/events")
def get_events(limit: int = 200):

    rows = clickhouse.execute(
        """
        SELECT
            experiment_id,
            device_id,
            timestamp,
            metric,
            value,
            unit
        FROM experiments.events
        ORDER BY timestamp DESC
        LIMIT %(limit)s
        """,
        {"limit": limit}
    )

    return [
        {
            "experiment_id": r[0],
            "device_id": r[1],
            "timestamp": r[2].isoformat(),
            "metric": r[3],
            "value": r[4],
            "unit": r[5],
        }
        for r in rows
    ]
