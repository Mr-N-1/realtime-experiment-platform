from kafka import KafkaConsumer
from clickhouse_driver import Client
import json
from datetime import datetime

# Kafka consumer
consumer = KafkaConsumer(
    "experiment-events",
    bootstrap_servers="localhost:9092",
    auto_offset_reset="earliest",
    value_deserializer=lambda m: json.loads(m.decode("utf-8"))
)

# ClickHouse client
client = Client(host="localhost")

print("Stream processor started...")

for message in consumer:
    event = message.value
    print("Received:", event)

    # Convert ISO timestamp string to datetime
    timestamp = datetime.fromisoformat(
        event["timestamp"].replace("Z", "+00:00")
    )

    client.execute(
        "INSERT INTO experiments.events VALUES",
        [(event["experiment_id"],
          event["device_id"],
          timestamp,
          event["metric"],
          float(event["value"]),
          event["unit"])]
    )
