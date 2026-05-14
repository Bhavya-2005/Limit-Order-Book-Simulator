import React from "react";

function DepthChart({
    bids,
    asks
}) {

    const maxBidQty =
        Math.max(
            ...bids.map(
                bid => bid.quantity
            ),
            1
        );

    const maxAskQty =
        Math.max(
            ...asks.map(
                ask => ask.quantity
            ),
            1
        );

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Market Depth
            </h2>

            <div className="grid grid-cols-2 gap-6">

                {/* BIDS */}
                <div>

                    <h3 className="text-green-400 text-xl mb-4">
                        BID DEPTH
                    </h3>

                    <div className="space-y-3">

                        {
                            bids.map((bid, index) => (

                                <div key={index}>

                                    <div className="flex justify-between mb-1">

                                        <span>
                                            {bid.price}
                                        </span>

                                        <span>
                                            {bid.quantity}
                                        </span>

                                    </div>

                                    <div className="w-full bg-slate-800 rounded-lg h-4">

                                        <div
                                            className="bg-green-500 h-4 rounded-lg"
                                            style={{
                                                width: `${
                                                    (
                                                        bid.quantity
                                                        /
                                                        maxBidQty
                                                    ) * 100
                                                }%`
                                            }}
                                        />

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

                {/* ASKS */}
                <div>

                    <h3 className="text-red-400 text-xl mb-4">
                        ASK DEPTH
                    </h3>

                    <div className="space-y-3">

                        {
                            asks.map((ask, index) => (

                                <div key={index}>

                                    <div className="flex justify-between mb-1">

                                        <span>
                                            {ask.price}
                                        </span>

                                        <span>
                                            {ask.quantity}
                                        </span>

                                    </div>

                                    <div className="w-full bg-slate-800 rounded-lg h-4">

                                        <div
                                            className="bg-red-500 h-4 rounded-lg"
                                            style={{
                                                width: `${
                                                    (
                                                        ask.quantity
                                                        /
                                                        maxAskQty
                                                    ) * 100
                                                }%`
                                            }}
                                        />

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DepthChart;