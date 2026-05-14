import React, {
    useEffect,
    useRef
} from "react";

import {
    createChart,
    CandlestickSeries
} from "lightweight-charts";

function CandlestickChart({ chartData }) {

    const chartContainerRef =
        useRef(null);

    const chartRef =
        useRef(null);

    const candleSeriesRef =
        useRef(null);

    useEffect(() => {

        if (!chartContainerRef.current) return;

        const chart =
            createChart(
                chartContainerRef.current,
                {
                    width:
                        chartContainerRef.current
                            .clientWidth,

                    height: 500,

                    layout: {
                        background: {
                            color: "#020617"
                        },

                        textColor: "#CBD5E1"
                    },

                    grid: {
                        vertLines: {
                            color:
                                "rgba(255,255,255,0.05)"
                        },

                        horzLines: {
                            color:
                                "rgba(255,255,255,0.05)"
                        }
                    },

                    rightPriceScale: {
                        borderColor:
                            "rgba(255,255,255,0.1)"
                    },

                    timeScale: {
                        borderColor:
                            "rgba(255,255,255,0.1)",

                        timeVisible: true,

                        secondsVisible: true
                    }
                }
            );

        const candleSeries =
            chart.addSeries(
                CandlestickSeries,
                {
                    upColor: "#22c55e",

                    downColor: "#ef4444",

                    borderVisible: false,

                    wickUpColor: "#22c55e",

                    wickDownColor: "#ef4444"
                }
            );

        chartRef.current = chart;

        candleSeriesRef.current =
            candleSeries;

        const handleResize = () => {

            if (!chartContainerRef.current)
                return;

            chart.applyOptions({
                width:
                    chartContainerRef.current
                        .clientWidth
            });
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );

            chart.remove();
        };

    }, []);

    useEffect(() => {

        if (
            !candleSeriesRef.current ||
            !chartData ||
            !chartData.length
        ) return;

        const formattedData =
            chartData.map(
                (candle, index) => ({
                    time:
                        Math.floor(
                            Date.now() / 1000
                        ) + index,

                    open:
                        Number(candle.open),

                    high:
                        Number(candle.high),

                    low:
                        Number(candle.low),

                    close:
                        Number(candle.close)
                })
            );

        candleSeriesRef.current.setData(
            formattedData
        );

    }, [chartData]);

    return (

        <div className="h-full w-full">

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
                        Market Chart
                    </h2>

                    <p className="
                        text-slate-400
                        text-sm
                    ">
                        Live Candlestick Price Action
                    </p>

                </div>

                <div className="
                    flex
                    gap-2
                ">

                    <button className="
                        px-3
                        py-1
                        rounded-lg
                        bg-cyan-500/20
                        text-cyan-400
                        text-sm
                        border
                        border-cyan-500/20
                    ">
                        1S
                    </button>

                    <button className="
                        px-3
                        py-1
                        rounded-lg
                        bg-slate-800
                        text-slate-300
                        text-sm
                    ">
                        5S
                    </button>

                    <button className="
                        px-3
                        py-1
                        rounded-lg
                        bg-slate-800
                        text-slate-300
                        text-sm
                    ">
                        1M
                    </button>

                </div>

            </div>

            {/* CHART */}

            <div
                ref={chartContainerRef}
                className="
                    w-full
                    h-[430px]
                    rounded-xl
                    overflow-hidden
                "
            />

        </div>
    );
}

export default CandlestickChart;