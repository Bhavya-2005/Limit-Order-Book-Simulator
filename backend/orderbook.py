import time


class OrderBook:

    def __init__(self):

        self.bids = []
        self.asks = []

    # =========================
    # SORT BOOK
    # =========================

    def sort_books(self):

        # BUY SIDE
        # Highest price first
        # FIFO timestamp

        self.bids.sort(

            key=lambda x: (
                -x.price,
                x.timestamp
            )
        )

        # SELL SIDE
        # Lowest price first
        # FIFO timestamp

        self.asks.sort(

            key=lambda x: (
                x.price,
                x.timestamp
            )
        )

    # =========================
    # ADD ORDER
    # =========================

    def add_order(self, order):

        # ENSURE TIMESTAMP

        if not hasattr(order, "timestamp"):

            order.timestamp = time.time()

        # BUY

        if order.side.lower() == "buy":

            self.bids.append(order)

        # SELL

        else:

            self.asks.append(order)

        self.sort_books()

    # =========================
    # FIND ORDER
    # =========================

    def find_order(self, order_id):

        for order in self.bids:

            if order.id == order_id:

                return order

        for order in self.asks:

            if order.id == order_id:

                return order

        return None

    # =========================
    # CANCEL ORDER
    # =========================

    def cancel_order(self, order_id):

        self.bids = [

            order
            for order in self.bids

            if order.id != order_id
        ]

        self.asks = [

            order
            for order in self.asks

            if order.id != order_id
        ]

    # =========================
    # MODIFY ORDER
    # =========================

    def modify_order(

        self,

        order_id,

        new_price=None,

        new_quantity=None
    ):

        order = self.find_order(
            order_id
        )

        if not order:

            return None

        # UPDATE PRICE

        if new_price is not None:

            order.price = float(
                new_price
            )

        # UPDATE QUANTITY

        if new_quantity is not None:

            order.quantity = int(
                new_quantity
            )

            order.remaining_quantity = int(
                new_quantity
            )

        # NEW TIMESTAMP
        # Simulates cancel-replace priority

        order.timestamp = time.time()

        # RE-SORT BOOK

        self.sort_books()

        return order

    # =========================
    # BEST BID
    # =========================

    def get_best_bid(self):

        if self.bids:

            return self.bids[0]

        return None

    # =========================
    # BEST ASK
    # =========================

    def get_best_ask(self):

        if self.asks:

            return self.asks[0]

        return None

    # =========================
    # MARKET DEPTH
    # =========================

    def get_market_depth(self):

        return {

            "bid_depth":
                len(self.bids),

            "ask_depth":
                len(self.asks)
        }