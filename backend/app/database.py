from clickhouse_driver import Client

clickhouse = Client(
    host="localhost",
    port=9000,
    database="experiments"
)
