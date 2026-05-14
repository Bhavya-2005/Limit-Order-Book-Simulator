import React from "react";
import {
    Bell,
    TrendingUp,
    AlertTriangle,
    Activity
} from "lucide-react";

function ActivityFeed() {

    const activities = [

        {
            type: "BUY",
            message:
                "Large BUY order executed at 107.22",
            icon: <TrendingUp size={18} />,
            color: "text-green-400",
            bg: "bg-green-500/10"
        },

        {
            type: "ALERT",
            message:
                "Spread widened to 0.04",
            icon: <AlertTriangle size={18} />,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10"
        },

        {
            type: "SYSTEM",
            message:
                "WebSocket latency stable at 12ms",
            icon: <Activity size={18} />,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10"
        },

        {
            type: "SELL",
            message:
                "Sell pressure increasing",
            icon: <Bell size={18} />,
            color: "text-red-400",
            bg: "bg-red-500/10"
        }

    ];

    return (

        <div className="
            bg-slate-900/70
            backdrop-blur-xl
            border
            border-cyan-500/10
            rounded-2xl
            p-5
            shadow-[0_0_30px_rgba(0,255,255,0.05)]
        ">

            {/* HEADER */}

            <div className="
                flex
                items-center
                justify-between
                mb-5
            ">

                <div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-cyan-400
                    ">
                        Activity Feed
                    </h2>

                    <p className="
                        text-slate-400
                        text-sm
                    ">
                        Real-Time Market Events
                    </p>

                </div>

                <div className="
                    text-green-400
                    text-sm
                    font-semibold
                    animate-pulse
                ">
                    ● LIVE
                </div>

            </div>

            {/* FEED */}

            <div className="
                flex
                flex-col
                gap-3
            ">

                {activities.map(
                    (activity, index) => (

                        <div
                            key={index}
                            className={`
                                flex
                                items-center
                                gap-4
                                p-4
                                rounded-xl
                                border
                                border-white/5
                                ${activity.bg}
                                hover:scale-[1.01]
                                transition-all
                                duration-300
                            `}
                        >

                            <div className={`
                                p-3
                                rounded-xl
                                ${activity.bg}
                                ${activity.color}
                            `}>
                                {activity.icon}
                            </div>

                            <div>

                                <p className={`
                                    font-semibold
                                    ${activity.color}
                                `}>
                                    {activity.type}
                                </p>

                                <p className="
                                    text-slate-300
                                    text-sm
                                ">
                                    {activity.message}
                                </p>

                            </div>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}

export default ActivityFeed;