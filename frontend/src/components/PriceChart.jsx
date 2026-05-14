import React from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function PriceChart({
    chartData
}) {

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Live Price Chart
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={chartData}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis dataKey="time" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={false}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default PriceChart;