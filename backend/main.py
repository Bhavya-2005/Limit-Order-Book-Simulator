from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

import json
import asyncio
import random

from models import Order
from orderbook import OrderBook
from matching_engine import match_orders
from market_maker import MarketMaker
from market_simulator import market_simulator

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

    # Redis disabled safely
    try:

        store_orderbook(data)

    except Exception as e:

        print(
            f"Redis disabled: {e}"
        )

    disconnected_clients = []

    for client in clients:

        try:

            await client.send_text(
                json.dumps(data)
            )

        except:

            disconnected_clients.append(
                client
            )

    for client in disconnected_clients:

        if client in clients:

            clients.remove(client)


@app.on_event("startup")
async def startup_event():

    asyncio.create_task(

        market_simulator(

            order_book,

            market_maker,

            trade_history,

            broadcast_orderbook
        )
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

            await asyncio.sleep(1)

    except:

        if websocket in clients:

            clients.remove(
                websocket
            )


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

    trade_history.extend(
        trades
    )

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

    trade_history.extend(
        trades
    )

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