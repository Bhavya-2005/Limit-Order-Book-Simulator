import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import OrderBook from "./components/OrderBook";
import TradePanel from "./components/TradePanel";
import Trades from "./components/Trades";
import StatsPanel from "./components/StatsPanel";
import DepthChart from "./components/DepthChart";
import CandlestickChart from "./components/CandlestickChart";
import RiskPanel from "./components/RiskPanel";
import ExecutionPanel from "./components/ExecutionPanel";
import TickerBar from "./components/TickerBar";
import SystemMetrics from "./components/SystemMetrics";
import ActivityFeed from "./components/ActivityFeed";

function App() {

    const [bids, setBids] = useState([]);
    const [asks, setAsks] = useState([]);
    const [trades, setTrades] = useState([]);
    const [chartData, setChartData] = useState([]);

    const [risk, setRisk] = useState({
        inventory: 0,
        cash: 0,
        realized_pnl: 0,
        unrealized_pnl: 0,
        inventory_risk: 0
    });

    const BACKEND_URL =
        "https://lob-backend.onrender.com";

    const fetchOrderBook = async () => {

        try {

            const response =
                await axios.get(
                    `${BACKEND_URL}/orderbook`
                );

            setBids(response.data.bids || []);
            setAsks(response.data.asks || []);
            setTrades(response.data.trades || []);

        } catch (error) {

            console.error(
                "Error fetching orderbook:",
                error
            );
        }
    };

    useEffect(() => {

        fetchOrderBook();

        const socket = new WebSocket(
            `wss://lob-backend.onrender.com/ws`
        );

        socket.onopen = () => {

            console.log(
                "WebSocket connected"
            );
        };

        socket.onmessage = (event) => {

            try {

                const data =
                    JSON.parse(event.data);

                setBids(data.bids || []);
                setAsks(data.asks || []);
                setTrades(data.trades || []);

                setRisk(data.risk || {
                    inventory: 0,
                    cash: 0,
                    realized_pnl: 0,
                    unrealized_pnl: 0,
                    inventory_risk: 0
                });

                if (
                    data.trades &&
                    data.trades.length > 0
                ) {

                    const latestTrade =
                        data.trades[
                            data.trades.length - 1
                        ];

                    setChartData(prev => {

                        const lastCandle =
                            prev[
                                prev.length - 1
                            ];

                        if (!lastCandle) {

                            return [
                                {
                                    open:
                                        latestTrade.price,

                                    high:
                                        latestTrade.price,

                                    low:
                                        latestTrade.price,

                                    close:
                                        latestTrade.price
                                }
                            ];
                        }

                        const updatedCandle = {

                            ...lastCandle,

                            high: Math.max(
                                lastCandle.high,
                                latestTrade.price
                            ),

                            low: Math.min(
                                lastCandle.low,
                                latestTrade.price
                            ),

                            close:
                                latestTrade.price
                        };

                        if (
                            data.trades.length % 5 === 0
                        ) {

                            return [
                                ...prev,
                                {
                                    open:
                                        latestTrade.price,

                                    high:
                                        latestTrade.price,

                                    low:
                                        latestTrade.price,

                                    close:
                                        latestTrade.price
                                }
                            ];
                        }

                        return [
                            ...prev.slice(0, -1),
                            updatedCandle
                        ];
                    });
                }

            } catch (error) {

                console.error(
                    "WebSocket message error:",
                    error
                );
            }
        };

        socket.onerror = (error) => {

            console.error(
                "WebSocket error:",
                error
            );
        };

        socket.onclose = () => {

            console.log(
                "WebSocket disconnected"
            );
        };

        return () => socket.close();

    }, []);

    return (

        <div className="min-h-screen p-5 text-white">

            {/* HEADER */}

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="
                    flex
                    flex-col
                    lg:flex-row
                    items-start
                    lg:items-center
                    justify-between
                    gap-6
                    mb-6
                    bg-slate-900/70
                    backdrop-blur-xl
                    border
                    border-cyan-500/10
                    rounded-2xl
                    px-6
                    py-5
                    shadow-[0_0_30px_rgba(0,255,255,0.05)]
                "
            >

                <div>

                    <h1 className="
                        text-4xl
                        font-bold
                        text-cyan-400
                    ">
                        LOB/USD
                    </h1>

                    <p className="
                        text-slate-400
                        mt-1
                    ">
                        Professional Market Simulator
                    </p>

                </div>

                <div className="
                    flex
                    flex-wrap
                    gap-6
                ">

                    <div>

                        <p className="
                            text-slate-400
                            text-sm
                        ">
                            Market Price
                        </p>

                        <p className="
                            text-green-400
                            text-2xl
                            font-bold
                        ">
                            107.28
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-slate-400
                            text-sm
                        ">
                            Spread
                        </p>

                        <p className="
                            text-cyan-400
                            text-2xl
                            font-bold
                        ">
                            0.02
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-slate-400
                            text-sm
                        ">
                            Volume
                        </p>

                        <p className="
                            text-yellow-400
                            text-2xl
                            font-bold
                        ">
                            14,281
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-slate-400
                            text-sm
                        ">
                            WebSocket
                        </p>

                        <p className="
                            text-green-400
                            font-bold
                        ">
                            ● Connected
                        </p>

                    </div>

                </div>

            </motion.div>

            {/* TICKER BAR */}

            <TickerBar />

            {/* SYSTEM METRICS */}

            <SystemMetrics />

            {/* MAIN GRID */}

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-12
                gap-5
            ">

                {/* TRADE PANEL */}

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="
                        xl:col-span-2
                        bg-slate-900/70
                        backdrop-blur-xl
                        p-5
                        rounded-2xl
                        border
                        border-cyan-500/10
                        shadow-[0_0_30px_rgba(0,255,255,0.05)]
                    "
                >

                    <TradePanel
                        refreshOrderBook={
                            fetchOrderBook
                        }
                    />

                </motion.div>

                {/* ORDER BOOK */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="
                        xl:col-span-3
                        bg-slate-900/70
                        backdrop-blur-xl
                        p-5
                        rounded-2xl
                        border
                        border-cyan-500/10
                        shadow-[0_0_30px_rgba(0,255,255,0.05)]
                    "
                >

                    <OrderBook
                        bids={bids}
                        asks={asks}
                    />

                </motion.div>

                {/* CHART */}

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="
                        xl:col-span-7
                        bg-slate-900/70
                        backdrop-blur-xl
                        p-5
                        rounded-2xl
                        border
                        border-cyan-500/10
                        shadow-[0_0_30px_rgba(0,255,255,0.05)]
                    "
                >

                    <div className="h-[500px]">

                        <CandlestickChart
                            chartData={chartData}
                        />

                    </div>

                </motion.div>

                {/* LOWER PANELS */}

                <div className="
                    xl:col-span-12
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                ">

                    <div className="
                        bg-slate-900/70
                        backdrop-blur-xl
                        p-5
                        rounded-2xl
                        border
                        border-cyan-500/10
                    ">

                        <Trades
                            trades={trades}
                        />

                    </div>

                    <div className="
                        bg-slate-900/70
                        backdrop-blur-xl
                        p-5
                        rounded-2xl
                        border
                        border-cyan-500/10
                    ">

                        <StatsPanel
                            bids={bids}
                            asks={asks}
                            trades={trades}
                        />

                    </div>

                    <div className="
                        bg-slate-900/70
                        backdrop-blur-xl
                        p-5
                        rounded-2xl
                        border
                        border-cyan-500/10
                    ">

                        <RiskPanel
                            risk={risk}
                        />

                    </div>

                    <div className="
                        bg-slate-900/70
                        backdrop-blur-xl
                        p-5
                        rounded-2xl
                        border
                        border-cyan-500/10
                    ">

                        <ExecutionPanel
                            trades={trades}
                        />

                    </div>

                </div>

                {/* DEPTH + ACTIVITY */}

                <div className="
                    xl:col-span-12
                    grid
                    grid-cols-1
                    xl:grid-cols-3
                    gap-5
                ">

                    {/* DEPTH CHART */}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="
                            xl:col-span-2
                            bg-slate-900/70
                            backdrop-blur-xl
                            p-5
                            rounded-2xl
                            border
                            border-cyan-500/10
                            shadow-[0_0_30px_rgba(0,255,255,0.05)]
                        "
                    >

                        <DepthChart
                            bids={bids}
                            asks={asks}
                        />

                    </motion.div>

                    {/* ACTIVITY FEED */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                        transition={{
                            duration: 0.6
                        }}
                    >

                        <ActivityFeed />

                    </motion.div>

                </div>

            </div>

        </div>
    );
}

export default App;