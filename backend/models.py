from dataclasses import dataclass, field
import time


@dataclass
class Order:

    # UNIQUE ORDER ID
    id: int

    # buy / sell
    side: str

    # limit / market
    order_type: str = "limit"

    # LIMIT PRICE
    # MARKET ORDERS CAN USE 0
    price: float = 0.0

    # ORDER SIZE
    quantity: int = 0

    # FIFO TIMESTAMP
    timestamp: float = field(
        default_factory=time.time
    )

    # ORDER STATUS
    status: str = "OPEN"

    # FILLED QUANTITY
    filled_quantity: int = 0

    # REMAINING QUANTITY
    remaining_quantity: int = 0

    def __post_init__(self):

        # INITIALIZE REMAINING QTY

        if self.remaining_quantity == 0:

            self.remaining_quantity = (
                self.quantity
            )