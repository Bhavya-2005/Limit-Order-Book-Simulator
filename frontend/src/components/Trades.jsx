import React from "react";
import { motion } from "framer-motion";

function Trades({ trades }) {

    const latestTrades =
        [...trades]
            .reverse()
            .slice(0, 20);

    return (

        <div className="h-full flex flex-col">

            {/* HEADER */}

            <div className="
                flex
                items-center
                justify-between
                mb-4
            ">

                <div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-cyan-400
                    ">
                        Live Trades
                    </h2>

                    <p className="
                        text-slate-400
                        text-sm
                    ">
                        Real-Time Trade Tape
                    </p>

                </div>

                <div className="
                    text-xs
                    text-green-400
                    font-semibold
                    animate-pulse
                ">
                    ● LIVE
                </div>

            </div>

            {/* COLUMN HEADERS */}

            <div className="
                grid
                grid-cols-3
                px-2
                mb-2
                text-xs
                uppercase
                tracking-wider
                text-slate-500
            ">

                <div>Side</div>

                <div className="text-center">
                    Price
                </div>

                <div className="text-right">
                    Size
                </div>

            </div>

            {/* TRADES */}

            <div className="
                flex-1
                overflow-y-auto
                space-y-1
                pr-1
            ">

                {latestTrades.map(
                    (trade, index) => {

                        const isBuy =
                            trade.side === "BUY";

                        return (

                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    duration: 0.2
                                }}
                                className={`
                                    relative
                                    overflow-hidden
                                    rounded-lg
                                    px-2
                                    py-2
                                    transition-all
                                    duration-200
                                    ${
                                        isBuy
                                            ? "hover:bg-green-500/10"
                                            : "hover:bg-red-500/10"
                                    }
                                `}
                            >

                                {/* BACKGROUND GLOW */}

                                <div
                                    className={`
                                        absolute
                                        top-0
                                        ${
                                            isBuy
                                                ? "left-0 bg-green-500/10"
                                                : "right-0 bg-red-500/10"
                                        }
                                        h-full
                                    `}
                                    style={{
                                        width: `${
                                            Math.min(
                                                trade.quantity * 10,
                                                100
                                            )
                                        }%`
                                    }}
                                />

                                {/* CONTENT */}

                                <div className="
                                    relative
                                    grid
                                    grid-cols-3
                                    items-center
                                    text-sm
                                ">

                                    {/* SIDE */}

                                    <div
                                        className={`
                                            font-bold
                                            ${
                                                isBuy
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }
                                        `}
                                    >
                                        {trade.side}
                                    </div>

                                    {/* PRICE */}

                                    <div className="
                                        text-center
                                        text-slate-200
                                        font-medium
                                    ">
                                        {trade.price}
                                    </div>

                                    {/* SIZE */}

                                    <div className="
                                        text-right
                                        text-slate-400
                                    ">
                                        {trade.quantity}
                                    </div>

                                </div>

                            </motion.div>
                        );
                    }
                )}

            </div>

        </div>
    );
}

export default Trades;