import React from "react";

function StatsPanel({
    bids,
    asks,
    trades
}) {

    const bestBid =
        bids.length > 0
            ? bids[0].price
            : 0;

    const bestAsk =
        asks.length > 0
            ? asks[0].price
            : 0;

    const spread =
        bestAsk && bestBid
            ? (bestAsk - bestBid).toFixed(2)
            : 0;

    const volume =
        trades.reduce(
            (sum, trade) =>
                sum + trade.quantity,
            0
        );

    const latestPrice =
        trades.length > 0
            ? trades[
                trades.length - 1
            ].price
            : 0;

    const pnl =
        trades.reduce(
            (sum, trade) =>
                sum +
                (trade.price * trade.quantity),
            0
        ).toFixed(2);

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Market Stats
            </h2>

            <div className="grid grid-cols-2 gap-4">

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Market Price
                    </p>

                    <h3 className="text-2xl font-bold text-green-400">
                        {latestPrice}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Spread
                    </p>

                    <h3 className="text-2xl font-bold text-yellow-400">
                        {spread}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Volume
                    </p>

                    <h3 className="text-2xl font-bold text-cyan-400">
                        {volume}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        PnL
                    </p>

                    <h3 className="text-2xl font-bold text-purple-400">
                        {pnl}
                    </h3>

                </div>

            </div>

        </div>
    );
}

export default StatsPanel;