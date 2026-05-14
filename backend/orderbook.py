class OrderBook:

    def __init__(self):

        self.bids = []
        self.asks = []

    def add_order(self, order):

        if order.side == "buy":

            self.bids.append(order)

            self.bids.sort(
                key=lambda x: (-x.price, x.timestamp)
            )

        else:

            self.asks.append(order)

            self.asks.sort(
                key=lambda x: (x.price, x.timestamp)
            )

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