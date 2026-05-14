from dataclasses import dataclass
import time

@dataclass
class Order:

    id: int
    side: str
    price: float
    quantity: int
    timestamp: float = time.time()