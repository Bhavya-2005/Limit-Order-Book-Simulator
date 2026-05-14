import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function DepthChart({
    bids,
    asks
}) {

    const bidData =
        bids.map((bid) => ({
            price: bid.price,
            bidLiquidity: bid.quantity,
            askLiquidity: 0
        }));

    const askData =
        asks.map((ask) => ({
            price: ask.price,
            bidLiquidity: 0,
            askLiquidity: ask.quantity
        }));

    const combinedData =
        [...bidData, ...askData]
            .sort((a, b) =>
                a.price - b.price
            );

    return (

        <div className="w-full">

            {/* HEADER */}

            <div className="
                flex
                items-center
                justify-between
                mb-6
            ">

                <div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-cyan-400
                    ">
                        Liquidity Heatmap
                    </h2>

                    <p className="
                        text-slate-400
                        text-sm
                    ">
                        Real-Time Market Depth Visualization
                    </p>

                </div>

                <div className="
                    text-green-400
                    text-sm
                    font-semibold
                    animate-pulse
                ">
                    ● LIVE DEPTH
                </div>

            </div>

            {/* CHART */}

            <div className="
                h-[420px]
                rounded-2xl
                overflow-hidden
                bg-slate-950/40
                border
                border-cyan-500/10
                p-4
            ">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart
                        data={combinedData}
                    >

                        <defs>

                            {/* GREEN */}

                            <linearGradient
                                id="bidGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#22c55e"
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#22c55e"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                            {/* RED */}

                            <linearGradient
                                id="askGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#ef4444"
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#ef4444"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <XAxis
                            dataKey="price"
                            stroke="#64748b"
                        />

                        <YAxis
                            stroke="#64748b"
                        />

                        <Tooltip
                            contentStyle={{
                                background:
                                    "#020617",

                                border:
                                    "1px solid rgba(255,255,255,0.1)",

                                borderRadius:
                                    "12px",

                                color:
                                    "#fff"
                            }}
                        />

                        {/* BIDS */}

                        <Area
                            type="monotone"
                            dataKey="bidLiquidity"
                            stroke="#22c55e"
                            fillOpacity={1}
                            fill="url(#bidGradient)"
                            strokeWidth={3}
                        />

                        {/* ASKS */}

                        <Area
                            type="monotone"
                            dataKey="askLiquidity"
                            stroke="#ef4444"
                            fillOpacity={1}
                            fill="url(#askGradient)"
                            strokeWidth={3}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default DepthChart;