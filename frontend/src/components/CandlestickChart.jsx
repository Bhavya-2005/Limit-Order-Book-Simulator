import React from "react";

function CandlestickChart({
    chartData
}) {

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                OHLC Candlestick Chart
            </h2>

            <div className="flex items-end gap-2 h-80 overflow-x-auto">

                {
                    chartData.map(
                        (candle, index) => {

                            const isBullish =
                                candle.close >= candle.open;

                            const bodyHeight =
                                Math.abs(
                                    candle.close
                                    -
                                    candle.open
                                ) * 8;

                            const wickHeight =
                                (
                                    candle.high
                                    -
                                    candle.low
                                ) * 8;

                            return (

                                <div
                                    key={index}
                                    className="flex flex-col items-center"
                                >

                                    {/* HIGH */}
                                    <div
                                        className="w-[2px] bg-white"
                                        style={{
                                            height: wickHeight
                                        }}
                                    />

                                    {/* BODY */}
                                    <div
                                        className={
                                            isBullish
                                                ? "bg-green-500 w-6"
                                                : "bg-red-500 w-6"
                                        }
                                        style={{
                                            height:
                                                bodyHeight || 4
                                        }}
                                    />

                                    <span className="text-xs mt-2">
                                        {index + 1}
                                    </span>

                                </div>

                            );
                        }
                    )
                }

            </div>

        </div>
    );
}

export default CandlestickChart;