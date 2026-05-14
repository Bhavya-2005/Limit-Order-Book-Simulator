import time


class OrderBook:

    def __init__(self):

        self.bids = []
        self.asks = []

    # ADD ORDER

    def add_order(self, order):

        # ENSURE TIMESTAMP EXISTS

        if not hasattr(order, "timestamp"):

            order.timestamp = time.time()

        # BUY SIDE

        if order.side.lower() == "buy":

            self.bids.append(order)

            # FIFO:
            # Highest price first
            # Earliest timestamp first

            self.bids.sort(

                key=lambda x: (
                    -x.price,
                    x.timestamp
                )
            )

        # SELL SIDE

        else:

            self.asks.append(order)

            # FIFO:
            # Lowest price first
            # Earliest timestamp first

            self.asks.sort(

                key=lambda x: (
                    x.price,
                    x.timestamp
                )
            )

    # CANCEL ORDER

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

    # GET BEST BID

    def get_best_bid(self):

        if self.bids:
            return self.bids[0]

        return None

    # GET BEST ASK

    def get_best_ask(self):

        if self.asks:
            return self.asks[0]

        return None

    # MARKET DEPTH

    def get_market_depth(self):

        return {

            "bid_depth":
                len(self.bids),

            "ask_depth":
                len(self.asks)
        }