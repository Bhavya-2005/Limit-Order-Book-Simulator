import React from "react";
import {
    TrendingUp,
    Activity,
    BarChart3,
    Waves
} from "lucide-react";

function StatsPanel({
    bids,
    asks,
    trades
}) {

    const totalBidLiquidity =
        bids.reduce(
            (sum, bid) =>
                sum + (bid.quantity || 0),
            0
        );

    const totalAskLiquidity =
        asks.reduce(
            (sum, ask) =>
                sum + (ask.quantity || 0),
            0
        );

    const spread =
        bids.length && asks.length
            ? (
                asks[0].price -
                bids[0].price
            ).toFixed(2)
            : "0.00";

    const volume =
        trades.reduce(
            (sum, trade) =>
                sum + (trade.quantity || 0),
            0
        );

    const pressure =
        totalBidLiquidity >
        totalAskLiquidity
            ? "Bullish"
            : "Bearish";

    const stats = [

        {
            title: "Spread",
            value: spread,
            icon: <TrendingUp size={22} />,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10"
        },

        {
            title: "Volume",
            value: volume,
            icon: <BarChart3 size={22} />,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
        },

        {
            title: "Bid Liquidity",
            value: totalBidLiquidity,
            icon: <Activity size={22} />,
            color: "text-green-400",
            bg: "bg-green-500/10"
        },

        {
            title: "Market Pressure",
            value: pressure,
            icon: <Waves size={22} />,
            color:
                pressure === "Bullish"
                    ? "text-green-400"
                    : "text-red-400",

            bg:
                pressure === "Bullish"
                    ? "bg-green-500/10"
                    : "bg-red-500/10"
        }
    ];

    return (

        <div className="h-full flex flex-col">

            {/* HEADER */}

            <div className="mb-5">

                <h2 className="
                    text-2xl
                    font-bold
                    text-cyan-400
                ">
                    Market Metrics
                </h2>

                <p className="
                    text-slate-400
                    text-sm
                ">
                    Real-Time Exchange Analytics
                </p>

            </div>

            {/* STATS */}

            <div className="
                grid
                grid-cols-1
                gap-4
            ">

                {stats.map(
                    (stat, index) => (

                        <div
                            key={index}
                            className={`
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/5
                                p-4
                                ${stat.bg}
                                backdrop-blur-xl
                                hover:scale-[1.02]
                                transition-all
                                duration-300
                            `}
                        >

                            {/* GLOW */}

                            <div className="
                                absolute
                                inset-0
                                bg-gradient-to-r
                                from-white/[0.03]
                                to-transparent
                            " />

                            <div className="
                                relative
                                flex
                                items-center
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-slate-400
                                        text-sm
                                        mb-1
                                    ">
                                        {stat.title}
                                    </p>

                                    <h3 className={`
                                        text-2xl
                                        font-bold
                                        ${stat.color}
                                    `}>
                                        {stat.value}
                                    </h3>

                                </div>

                                <div className={`
                                    p-3
                                    rounded-xl
                                    ${stat.bg}
                                    ${stat.color}
                                `}>
                                    {stat.icon}
                                </div>

                            </div>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}

export default StatsPanel;