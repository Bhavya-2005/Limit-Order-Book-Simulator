import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import OrderBook from "./components/OrderBook";
import TradePanel from "./components/TradePanel";
import Trades from "./components/Trades";
import StatsPanel from "./components/StatsPanel";
import DepthChart from "./components/DepthChart";
import CandlestickChart from "./components/CandlestickChart";
import RiskPanel from "./components/RiskPanel";
import ExecutionPanel from "./components/ExecutionPanel";

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

    const fetchOrderBook = async () => {

        const response =
            await axios.get(
                "https://lob-backend.onrender.com"
            );

        setBids(response.data.bids);
        setAsks(response.data.asks);
        setTrades(response.data.trades);
    };

    useEffect(() => {

        fetchOrderBook();

        const socket = new WebSocket(
            "wss://lob-backend.onrender.com/ws"
        );

        socket.onmessage = (event) => {

            const data =
                JSON.parse(event.data);

            setBids(data.bids);

            setAsks(data.asks);

            setTrades(data.trades || []);

            setRisk(data.risk);

            if (data.trades.length > 0) {

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
        };

        return () => socket.close();

    }, []);

    return (

        <div className="min-h-screen p-6 bg-slate-950 text-white">

            <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400">
                Limit Order Book Simulator
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                    <TradePanel refreshOrderBook={fetchOrderBook} />
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                    <OrderBook bids={bids} asks={asks} />
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                    <Trades trades={trades} />
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                    <StatsPanel
                        bids={bids}
                        asks={asks}
                        trades={trades}
                    />
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                    <RiskPanel risk={risk} />
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                    <ExecutionPanel trades={trades} />
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl lg:col-span-6">
                    <CandlestickChart chartData={chartData} />
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl lg:col-span-6">
                    <DepthChart bids={bids} asks={asks} />
                </div>

            </div>

        </div>
    );
}

export default App;