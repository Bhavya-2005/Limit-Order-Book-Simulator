import React from "react";

function Trades({
    trades
}) {

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Trade History
            </h2>

            <div className="space-y-2">

                {
                    trades
                        .slice()
                        .reverse()
                        .map((trade, index) => (

                            <div
                                key={index}
                                className="bg-slate-800 p-3 rounded-lg flex justify-between"
                            >

                                <span className="text-yellow-400">
                                    {trade.price}
                                </span>

                                <span>
                                    Qty: {trade.quantity}
                                </span>

                            </div>

                        ))
                }

            </div>

        </div>
    );
}

export default Trades;