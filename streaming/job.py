from pyflink.datastream import StreamExecutionEnvironment
from pyflink.datastream.connectors import KafkaSource
from pyflink.common.serialization import SimpleStringSchema
import json
from clickhouse_driver import Client

def sink_to_clickhouse(event):
    client = Client(host='clickhouse')
    client.execute(
        "INSERT INTO experiments.events VALUES",
        [(event['experiment_id'],
          event['device_id'],
          event['timestamp'],
          event['metric'],
          float(event['value']),
          event['unit'])]
    )

env = StreamExecutionEnvironment.get_execution_environment()

source = KafkaSource.builder() \
    .set_bootstrap_servers("kafka:9092") \
    .set_topics("experiment-events") \
    .set_group_id("flink-group") \
    .set_value_only_deserializer(SimpleStringSchema()) \
    .build()

stream = env.from_source(source, None, "Kafka Source")

stream.map(lambda x: json.loads(x)).map(sink_to_clickhouse)

env.execute("Kafka to ClickHouse")
