import random
import asyncio
from models import Order

async def market_simulator(order_book, matching_engine):

    order_id = 100000

    while True:

        side = random.choice(["BUY", "SELL"])

        price = random.randint(95, 105)

        quantity = random.randint(1, 20)

        order = Order(
            id=order_id,
            side=side,
            price=price,
            quantity=quantity
        )

        matching_engine.process_order(order)

        print(
            f"SIMULATED {side} "
            f"{quantity} @ {price}"
        )

        order_id += 1

        await asyncio.sleep(1)
        