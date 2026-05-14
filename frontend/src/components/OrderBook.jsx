import React from "react";
import { motion } from "framer-motion";

function OrderBook({ bids, asks }) {

    const sortedBids =
        [...bids]
            .sort((a, b) => b.price - a.price)
            .slice(0, 12);

    const sortedAsks =
        [...asks]
            .sort((a, b) => a.price - b.price)
            .slice(0, 12);

    const maxBidQty = Math.max(
        ...sortedBids.map(order => order.quantity || 1),
        1
    );

    const maxAskQty = Math.max(
        ...sortedAsks.map(order => order.quantity || 1),
        1
    );

    const bestBid =
        sortedBids[0]?.price || 0;

    const bestAsk =
        sortedAsks[0]?.price || 0;

    const spread =
        (bestAsk - bestBid).toFixed(2);

    return (

        <div className="h-full flex flex-col">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold text-cyan-400">
                    Order Book
                </h2>

                <div className="text-sm text-slate-400">
                    Live Market Depth
                </div>

            </div>

            {/* COLUMN HEADERS */}

            <div className="
                grid
                grid-cols-3
                text-xs
                text-slate-500
                px-2
                mb-2
                uppercase
                tracking-wider
            ">
                <div>Price</div>
                <div className="text-center">
                    Size
                </div>
                <div className="text-right">
                    Total
                </div>
            </div>

            {/* ASKS */}

            <div className="space-y-1 mb-3">

                {sortedAsks
                    .slice()
                    .reverse()
                    .map((ask, index) => {

                        const width =
                            (ask.quantity / maxAskQty) * 100;

                        return (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="
                                    relative
                                    overflow-hidden
                                    rounded-lg
                                "
                            >

                                {/* RED DEPTH BAR */}

                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-0
                                        h-full
                                        bg-red-500/20
                                    "
                                    style={{
                                        width: `${width}%`
                                    }}
                                />

                                {/* CONTENT */}

                                <div className="
                                    relative
                                    grid
                                    grid-cols-3
                                    px-2
                                    py-1.5
                                    text-sm
                                    hover:bg-red-500/10
                                    transition-all
                                    duration-200
                                ">

                                    <div className="
                                        text-red-400
                                        font-semibold
                                    ">
                                        {ask.price}
                                    </div>

                                    <div className="
                                        text-center
                                        text-slate-300
                                    ">
                                        {ask.quantity}
                                    </div>

                                    <div className="
                                        text-right
                                        text-slate-400
                                    ">
                                        {(ask.price * ask.quantity).toFixed(0)}
                                    </div>

                                </div>

                            </motion.div>
                        );
                    })}
            </div>

            {/* MID PRICE */}

            <div className="
                bg-slate-800/80
                border
                border-cyan-500/20
                rounded-xl
                py-3
                px-4
                mb-3
                text-center
                shadow-lg
            ">

                <div className="
                    text-slate-400
                    text-xs
                    uppercase
                    tracking-widest
                    mb-1
                ">
                    Spread
                </div>

                <div className="
                    text-3xl
                    font-bold
                    text-cyan-400
                ">
                    {spread}
                </div>

            </div>

            {/* BIDS */}

            <div className="space-y-1">

                {sortedBids.map((bid, index) => {

                    const width =
                        (bid.quantity / maxBidQty) * 100;

                    return (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="
                                relative
                                overflow-hidden
                                rounded-lg
                            "
                        >

                            {/* GREEN DEPTH BAR */}

                            <div
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    h-full
                                    bg-green-500/20
                                "
                                style={{
                                    width: `${width}%`
                                }}
                            />

                            {/* CONTENT */}

                            <div className="
                                relative
                                grid
                                grid-cols-3
                                px-2
                                py-1.5
                                text-sm
                                hover:bg-green-500/10
                                transition-all
                                duration-200
                            ">

                                <div className="
                                    text-green-400
                                    font-semibold
                                ">
                                    {bid.price}
                                </div>

                                <div className="
                                    text-center
                                    text-slate-300
                                ">
                                    {bid.quantity}
                                </div>

                                <div className="
                                    text-right
                                    text-slate-400
                                ">
                                    {(bid.price * bid.quantity).toFixed(0)}
                                </div>

                            </div>

                        </motion.div>
                    );
                })}

            </div>

        </div>
    );
}

export default OrderBook;