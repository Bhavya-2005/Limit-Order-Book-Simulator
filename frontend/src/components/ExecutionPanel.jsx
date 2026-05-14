import React from "react";

function ExecutionPanel({
    trades
}) {

    const latestTrade =
        trades.length > 0
            ? trades[
                trades.length - 1
            ]
            : null;

    if (!latestTrade) {

        return (

            <div>

                <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                    Execution Metrics
                </h2>

                <p>
                    No trades yet
                </p>

            </div>
        );
    }

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Execution Metrics
            </h2>

            <div className="grid grid-cols-1 gap-4">

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Expected Price
                    </p>

                    <h3 className="text-2xl font-bold text-yellow-400">
                        {latestTrade.expected_price}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Executed Price
                    </p>

                    <h3 className="text-2xl font-bold text-green-400">
                        {latestTrade.price}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Slippage
                    </p>

                    <h3 className="text-2xl font-bold text-red-400">
                        {latestTrade.slippage}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Latency
                    </p>

                    <h3 className="text-2xl font-bold text-cyan-400">
                        {latestTrade.latency_ms} ms
                    </h3>

                </div>

            </div>

        </div>
    );
}

export default ExecutionPanel;