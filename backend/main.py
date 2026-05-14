from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

import json
import asyncio
import random

from models import Order
from orderbook import OrderBook
from matching_engine import match_orders
from market_maker import MarketMaker

from redis_client import (
    store_orderbook
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

order_book = OrderBook()
market_maker = MarketMaker()

clients = []

trade_history = []

market_price = 100

current_order_id = 1

inventory_position = 0
cash_balance = 100000
realized_pnl = 0


async def broadcast_orderbook():

    latest_price = (
        trade_history[-1]["price"]
        if trade_history
        else market_price
    )

    unrealized_pnl = (
        inventory_position
        * latest_price
    )

    inventory_risk = (
        abs(inventory_position)
        * random.uniform(0.5, 2)
    )

    data = {

        "bids": [
            order.__dict__
            for order in order_book.bids
        ],

        "asks": [
            order.__dict__
            for order in order_book.asks
        ],

        "trades": trade_history[-20:],

        "risk": {

            "inventory":
                inventory_position,

            "cash":
                round(cash_balance, 2),

            "realized_pnl":
                round(realized_pnl, 2),

            "unrealized_pnl":
                round(unrealized_pnl, 2),

            "inventory_risk":
                round(inventory_risk, 2)
        }
    }

    # Store in Redis
    store_orderbook(data)

    for client in clients:

        await client.send_text(
            json.dumps(data)
        )


async def automated_market_maker():

    global market_price
    global current_order_id
    global inventory_position
    global cash_balance

    while True:

        market_price += random.randint(-1, 1)

        orders = market_maker.generate_orders(
            market_price
        )

        for order in orders:

            order.id = current_order_id
            current_order_id += 1

            order_book.add_order(order)

        trades = await match_orders(
            order_book
        )

        for trade in trades:

            inventory_position += (
                random.choice([-1, 1])
                * trade["quantity"]
            )

            cash_balance -= (
                trade["price"]
                * trade["quantity"]
            )

        trade_history.extend(trades)

        await broadcast_orderbook()

        await asyncio.sleep(3)


@app.on_event("startup")
async def startup_event():

    asyncio.create_task(
        automated_market_maker()
    )


@app.get("/")
def home():

    return {
        "message":
            "LOB Simulator Running"
    }


@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket
):

    await websocket.accept()

    clients.append(websocket)

    try:

        while True:
            await websocket.receive_text()

    except:
        clients.remove(websocket)


@app.get("/add_buy_order")
async def add_buy_order(
    price: float,
    quantity: int
):

    global current_order_id

    order = Order(

        id=current_order_id,

        side="buy",

        price=price,

        quantity=quantity
    )

    current_order_id += 1

    order_book.add_order(order)

    trades = await match_orders(
        order_book
    )

    trade_history.extend(trades)

    await broadcast_orderbook()

    return {

        "status":
            "Buy order added",

        "order":
            order.__dict__,

        "trades":
            trades
    }


@app.get("/add_sell_order")
async def add_sell_order(
    price: float,
    quantity: int
):

    global current_order_id

    order = Order(

        id=current_order_id,

        side="sell",

        price=price,

        quantity=quantity
    )

    current_order_id += 1

    order_book.add_order(order)

    trades = await match_orders(
        order_book
    )

    trade_history.extend(trades)

    await broadcast_orderbook()

    return {

        "status":
            "Sell order added",

        "order":
            order.__dict__,

        "trades":
            trades
    }


@app.get("/cancel_order")
async def cancel_order(
    order_id: int
):

    order_book.cancel_order(
        order_id
    )

    await broadcast_orderbook()

    return {

        "status":
            f"Order {order_id} cancelled"
    }


@app.get("/orderbook")
def get_orderbook():

    return {

        "bids": [
            order.__dict__
            for order in order_book.bids
        ],

        "asks": [
            order.__dict__
            for order in order_book.asks
        ],

        "trades":
            trade_history[-20:]
    }