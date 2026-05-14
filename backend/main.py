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

# =========================
# GLOBAL STATE
# =========================

order_book = OrderBook()

market_maker = MarketMaker()

clients = []

trade_history = []

market_price = 100

current_order_id = 1

inventory_position = 0

cash_balance = 100000

realized_pnl = 0


# =========================
# BROADCAST ENGINE
# =========================

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

    # STORE TO REDIS

    try:

        store_orderbook(data)

    except Exception as e:

        print(
            f"Redis disabled: {e}"
        )

    # WEBSOCKET BROADCAST

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


# =========================
# STARTUP EVENT
# =========================

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


# =========================
# ROOT
# =========================

@app.get("/")
def home():

    return {

        "message":
            "LOB Simulator Running"
    }


# =========================
# WEBSOCKET
# =========================

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


# =========================
# GENERIC ORDER CREATION
# =========================

async def create_order(

    side: str,

    quantity: int,

    price: float = 0,

    order_type: str = "limit"
):

    global current_order_id

    # CREATE ORDER

    order = Order(

        id=current_order_id,

        side=side,

        order_type=order_type,

        price=price,

        quantity=quantity
    )

    current_order_id += 1

    # MARKET ORDER LOGIC

    if order_type == "market":

        if side == "buy":

            best_ask = (
                order_book.get_best_ask()
            )

            if best_ask:

                order.price = (
                    best_ask.price
                )

        elif side == "sell":

            best_bid = (
                order_book.get_best_bid()
            )

            if best_bid:

                order.price = (
                    best_bid.price
                )

    # ADD TO BOOK

    order_book.add_order(order)

    # MATCH ENGINE

    trades = await match_orders(
        order_book
    )

    trade_history.extend(
        trades
    )

    # BROADCAST

    await broadcast_orderbook()

    return {

        "status":
            f"{side.upper()} {order_type.upper()} order added",

        "order":
            order.__dict__,

        "trades":
            trades
    }


# =========================
# LIMIT BUY
# =========================

@app.get("/add_buy_order")
async def add_buy_order(
    price: float,
    quantity: int
):

    return await create_order(

        side="buy",

        quantity=quantity,

        price=price,

        order_type="limit"
    )


# =========================
# LIMIT SELL
# =========================

@app.get("/add_sell_order")
async def add_sell_order(
    price: float,
    quantity: int
):

    return await create_order(

        side="sell",

        quantity=quantity,

        price=price,

        order_type="limit"
    )


# =========================
# MARKET BUY
# =========================

@app.get("/market_buy")
async def market_buy(
    quantity: int
):

    return await create_order(

        side="buy",

        quantity=quantity,

        order_type="market"
    )


# =========================
# MARKET SELL
# =========================

@app.get("/market_sell")
async def market_sell(
    quantity: int
):

    return await create_order(

        side="sell",

        quantity=quantity,

        order_type="market"
    )


# =========================
# CANCEL ORDER
# =========================

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


# =========================
# MODIFY ORDER
# =========================

@app.get("/modify_order")
async def modify_order(

    order_id: int,

    new_price: float = None,

    new_quantity: int = None
):

    modified_order = (

        order_book.modify_order(

            order_id=order_id,

            new_price=new_price,

            new_quantity=new_quantity
        )
    )

    # ORDER NOT FOUND

    if not modified_order:

        return {

            "status":
                "Order not found"
        }

    # RE-MATCH

    trades = await match_orders(
        order_book
    )

    trade_history.extend(
        trades
    )

    # BROADCAST

    await broadcast_orderbook()

    return {

        "status":
            f"Order {order_id} modified",

        "modified_order":
            modified_order.__dict__,

        "trades":
            trades
    }


# =========================
# GET ORDERBOOK
# =========================

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