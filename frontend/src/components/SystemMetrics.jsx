import React from "react";
import {
    Cpu,
    Activity,
    Wifi,
    Gauge
} from "lucide-react";

function SystemMetrics() {

    const metrics = [

        {
            title: "Latency",
            value: "12ms",
            icon: <Gauge size={20} />,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10"
        },

        {
            title: "Orders/sec",
            value: "1,284",
            icon: <Activity size={20} />,
            color: "text-green-400",
            bg: "bg-green-500/10"
        },

        {
            title: "CPU Usage",
            value: "34%",
            icon: <Cpu size={20} />,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
        },

        {
            title: "WebSocket",
            value: "LIVE",
            icon: <Wifi size={20} />,
            color: "text-green-400",
            bg: "bg-green-500/10"
        }

    ];

    return (

        <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-5
        ">

            {metrics.map(
                (metric, index) => (

                    <div
                        key={index}
                        className={`
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-cyan-500/10
                            backdrop-blur-xl
                            p-5
                            ${metric.bg}
                            shadow-[0_0_30px_rgba(0,255,255,0.03)]
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

                        {/* CONTENT */}

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
                                    {metric.title}
                                </p>

                                <h3 className={`
                                    text-3xl
                                    font-bold
                                    ${metric.color}
                                `}>
                                    {metric.value}
                                </h3>

                            </div>

                            <div className={`
                                p-3
                                rounded-xl
                                ${metric.bg}
                                ${metric.color}
                            `}>
                                {metric.icon}
                            </div>

                        </div>

                    </div>
                )
            )}

        </div>
    );
}

export default SystemMetrics;