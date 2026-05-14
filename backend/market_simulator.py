import asyncio
import random
import time

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

    volatility = 1

    while True:

        # =========================
        # VOLATILITY REGIME
        # =========================

        if random.random() < 0.1:

            volatility = random.randint(
                1,
                5
            )

        # =========================
        # PRICE MOVEMENT
        # =========================

        market_price += random.randint(
            -volatility,
            volatility
        )

        market_price = max(
            50,
            market_price
        )

        # =========================
        # MARKET MAKER LIQUIDITY
        # =========================

        orders = (

            market_maker.generate_orders(

                market_price
            )
        )

        # =========================
        # AGGRESSIVE TRADER
        # =========================

        aggressive_side = random.choice(
            ["buy", "sell"]
        )

        aggressive_order_type = random.choice(
            ["limit", "market"]
        )

        aggressive_quantity = random.randint(
            1,
            30
        )

        # =========================
        # MARKET ORDER LOGIC
        # =========================

        aggressive_price = market_price

        if aggressive_order_type == "market":

            if aggressive_side == "buy":

                best_ask = (
                    order_book.get_best_ask()
                )

                if best_ask:

                    aggressive_price = (
                        best_ask.price
                    )

            else:

                best_bid = (
                    order_book.get_best_bid()
                )

                if best_bid:

                    aggressive_price = (
                        best_bid.price
                    )

        # =========================
        # LIMIT ORDER LOGIC
        # =========================

        else:

            aggressive_price = (

                market_price +

                random.randint(-2, 2)
            )

        # =========================
        # CREATE AGGRESSIVE ORDER
        # =========================

        aggressive_order = Order(

            id=current_order_id,

            side=aggressive_side,

            order_type=
                aggressive_order_type,

            price=aggressive_price,

            quantity=
                aggressive_quantity
        )

        current_order_id += 1

        orders.append(
            aggressive_order
        )

        # =========================
        # WHALE ORDERS
        # =========================

        if random.random() < 0.05:

            whale_side = random.choice(
                ["buy", "sell"]
            )

            whale_order = Order(

                id=current_order_id,

                side=whale_side,

                order_type="limit",

                price=
                    market_price +

                    random.randint(-3, 3),

                quantity=
                    random.randint(50, 150)
            )

            current_order_id += 1

            orders.append(
                whale_order
            )

        # =========================
        # ADD ORDERS TO BOOK
        # =========================

        for order in orders:

            order.id = current_order_id

            current_order_id += 1

            order_book.add_order(order)

        # =========================
        # MATCH ENGINE
        # =========================

        trades = await match_orders(
            order_book
        )

        # =========================
        # STORE TRADES
        # =========================

        trade_history.extend(
            trades
        )

        if len(trade_history) > 200:

            trade_history[:] = (
                trade_history[-200:]
            )

        # =========================
        # BROADCAST
        # =========================

        await broadcast_orderbook()

        # =========================
        # DYNAMIC SPEED
        # =========================

        sleep_time = random.uniform(
            0.3,
            1.2
        )

        await asyncio.sleep(
            sleep_time
        )