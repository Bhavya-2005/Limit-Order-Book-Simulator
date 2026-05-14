import redis
import json

redis_client = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)


def store_orderbook(data):

    redis_client.set(
        "orderbook",
        json.dumps(data)
    )


def get_orderbook():

    data = redis_client.get(
        "orderbook"
    )

    if data:
        return json.loads(data)

    return {}