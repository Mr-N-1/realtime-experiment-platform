from pydantic import BaseModel
from datetime import datetime

class ExperimentEvent(BaseModel):
    experiment_id: str
    device_id: str
    timestamp: datetime
    metric: str
    value: float
    unit: str
