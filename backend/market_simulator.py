import asyncio
import random

from models import Order
from matching_engine import match_orders

current_order_id = 1000
market_price = 100


async def market_simulator(
    order_book,
    market_maker,
    trade_history,
    broadcast_orderbook
):

    global current_order_id
    global market_price

    while True:

        market_price += random.randint(-2, 2)

        market_price = max(
            50,
            market_price
        )

        orders = market_maker.generate_orders(
            market_price
        )

        aggressive_side = random.choice(
            ["buy", "sell"]
        )

        aggressive_order = Order(

            id=current_order_id,

            side=aggressive_side,

            price=market_price +
            random.randint(-1, 1),

            quantity=random.randint(1, 25)
        )

        current_order_id += 1

        orders.append(
            aggressive_order
        )

        for order in orders:

            order.id = current_order_id

            current_order_id += 1

            order_book.add_order(order)

        trades = await match_orders(
            order_book
        )

        trade_history.extend(
            trades
        )

        if len(trade_history) > 100:

            trade_history[:] = (
                trade_history[-100:]
            )

        await broadcast_orderbook()

        await asyncio.sleep(1)