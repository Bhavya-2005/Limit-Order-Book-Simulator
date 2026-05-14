import random
import asyncio
import time


async def match_orders(orderbook):

    trades = []

    while (
        orderbook.bids
        and
        orderbook.asks
    ):

        best_bid = orderbook.bids[0]
        best_ask = orderbook.asks[0]

        # PRICE MATCH CHECK

        if best_bid.price < best_ask.price:
            break

        # SIMULATED MATCHING LATENCY

        latency_ms = random.randint(10, 80)

        await asyncio.sleep(
            latency_ms / 1000
        )

        # PARTIAL FILL LOGIC

        trade_quantity = min(
            best_bid.quantity,
            best_ask.quantity
        )

        expected_price = best_ask.price

        # SLIPPAGE SIMULATION

        slippage = round(
            random.uniform(-0.05, 0.05),
            4
        )

        executed_price = round(
            expected_price + slippage,
            4
        )

        # DETERMINE AGGRESSOR SIDE

        aggressor_side = (
            "buy"
            if best_bid.timestamp
            > best_ask.timestamp
            else "sell"
        )

        # CREATE TRADE

        trade = {

            "trade_id":
                f"T{int(time.time() * 1000)}",

            "price":
                executed_price,

            "expected_price":
                expected_price,

            "slippage":
                slippage,

            "quantity":
                trade_quantity,

            "latency_ms":
                latency_ms,

            "buy_order_id":
                best_bid.id,

            "sell_order_id":
                best_ask.id,

            "aggressor_side":
                aggressor_side,

            "timestamp":
                time.time()
        }

        trades.append(trade)

        # UPDATE REMAINING QUANTITIES

        best_bid.quantity -= trade_quantity
        best_ask.quantity -= trade_quantity

        # REMOVE FILLED ORDERS

        if best_bid.quantity <= 0:
            orderbook.bids.pop(0)

        if best_ask.quantity <= 0:
            orderbook.asks.pop(0)

    return trades