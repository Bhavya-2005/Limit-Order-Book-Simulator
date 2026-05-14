from models import Order

class MarketMaker:

    def __init__(self):

        self.order_id = 1000

    def generate_orders(
        self,
        mid_price
    ):

        buy_order = Order(

            id=self.order_id,

            side="buy",

            price=mid_price - 1,

            quantity=10
        )

        self.order_id += 1

        sell_order = Order(

            id=self.order_id,

            side="sell",

            price=mid_price + 1,

            quantity=10
        )

        self.order_id += 1

        return [
            buy_order,
            sell_order
        ]