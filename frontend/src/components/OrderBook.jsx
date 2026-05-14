import React from "react";
import axios from "axios";

function OrderBook({
    bids,
    asks
}) {

    const cancelOrder = async (id) => {

        await axios.get(
            `http://127.0.0.1:8000/cancel_order?order_id=${id}`
        );
    };

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Order Book
            </h2>

            <div className="grid grid-cols-2 gap-6">

                {/* ASKS */}
                <div>

                    <h3 className="text-red-400 text-xl mb-4">
                        ASKS
                    </h3>

                    <div className="space-y-2">

                        {
                            asks.map((ask, index) => (

                                <div
                                    key={index}
                                    className="bg-red-900/40 p-3 rounded-lg"
                                >

                                    <div className="flex justify-between">

                                        <span>
                                            #{ask.id}
                                        </span>

                                        <span>
                                            {ask.price}
                                        </span>

                                        <span>
                                            {ask.quantity}
                                        </span>

                                    </div>

                                    <button
                                        onClick={() =>
                                            cancelOrder(
                                                ask.id
                                            )
                                        }
                                        className="mt-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                </div>

                {/* BIDS */}
                <div>

                    <h3 className="text-green-400 text-xl mb-4">
                        BIDS
                    </h3>

                    <div className="space-y-2">

                        {
                            bids.map((bid, index) => (

                                <div
                                    key={index}
                                    className="bg-green-900/40 p-3 rounded-lg"
                                >

                                    <div className="flex justify-between">

                                        <span>
                                            #{bid.id}
                                        </span>

                                        <span>
                                            {bid.price}
                                        </span>

                                        <span>
                                            {bid.quantity}
                                        </span>

                                    </div>

                                    <button
                                        onClick={() =>
                                            cancelOrder(
                                                bid.id
                                            )
                                        }
                                        className="mt-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrderBook;