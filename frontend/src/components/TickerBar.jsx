import React from "react";

function TickerBar() {

    const tickerData = [

        {
            symbol: "LOB/USD",
            price: "107.28",
            change: "+1.24%",
            positive: true
        },

        {
            symbol: "BTC/USD",
            price: "64,212",
            change: "+2.11%",
            positive: true
        },

        {
            symbol: "ETH/USD",
            price: "3,210",
            change: "-0.42%",
            positive: false
        },

        {
            symbol: "SOL/USD",
            price: "182.44",
            change: "+4.82%",
            positive: true
        },

        {
            symbol: "NASDAQ",
            price: "18,204",
            change: "+0.91%",
            positive: true
        },

        {
            symbol: "AAPL",
            price: "214.12",
            change: "+0.64%",
            positive: true
        }

    ];

    return (

        <div className="
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-cyan-500/10
            bg-slate-900/70
            backdrop-blur-xl
            py-3
            mb-5
            shadow-[0_0_30px_rgba(0,255,255,0.05)]
        ">

            <div className="
                flex
                gap-10
                whitespace-nowrap
                animate-[ticker_25s_linear_infinite]
            ">

                {[...tickerData, ...tickerData].map(
                    (item, index) => (

                        <div
                            key={index}
                            className="
                                flex
                                items-center
                                gap-3
                                px-4
                            "
                        >

                            <span className="
                                text-cyan-400
                                font-bold
                            ">
                                {item.symbol}
                            </span>

                            <span className="
                                text-white
                                font-semibold
                            ">
                                {item.price}
                            </span>

                            <span className={`
                                font-bold
                                ${
                                    item.positive
                                        ? "text-green-400"
                                        : "text-red-400"
                                }
                            `}>
                                {item.change}
                            </span>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}

export default TickerBar;