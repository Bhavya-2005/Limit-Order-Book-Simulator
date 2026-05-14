import random
import asyncio

async def match_orders(orderbook):

    trades = []

    while (
        orderbook.bids
        and
        orderbook.asks
    ):

        best_bid = orderbook.bids[0]
        best_ask = orderbook.asks[0]

        if best_bid.price >= best_ask.price:

            # Simulated latency
            await asyncio.sleep(
                random.uniform(0.1, 0.5)
            )

            trade_quantity = min(
                best_bid.quantity,
                best_ask.quantity
            )

            expected_price = best_ask.price

            # Simulated slippage
            slippage = round(
                random.uniform(-0.5, 0.5),
                2
            )

            executed_price = round(
                expected_price + slippage,
                2
            )

            trade = {

                "price":
                    executed_price,

                "expected_price":
                    expected_price,

                "slippage":
                    slippage,

                "quantity":
                    trade_quantity,

                "latency_ms":
                    random.randint(100, 500)
            }

            trades.append(trade)

            best_bid.quantity -= trade_quantity
            best_ask.quantity -= trade_quantity

            if best_bid.quantity == 0:
                orderbook.bids.pop(0)

            if best_ask.quantity == 0:
                orderbook.asks.pop(0)

        else:
            break

    return trades