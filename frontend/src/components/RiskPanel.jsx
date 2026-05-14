import React from "react";

function RiskPanel({
    risk
}) {

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Risk Engine
            </h2>

            <div className="grid grid-cols-1 gap-4">

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Inventory
                    </p>

                    <h3 className="text-2xl font-bold text-yellow-400">
                        {risk.inventory}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Cash Balance
                    </p>

                    <h3 className="text-2xl font-bold text-green-400">
                        ${risk.cash}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Realized PnL
                    </p>

                    <h3 className="text-2xl font-bold text-cyan-400">
                        ${risk.realized_pnl}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Unrealized PnL
                    </p>

                    <h3 className="text-2xl font-bold text-purple-400">
                        ${risk.unrealized_pnl}
                    </h3>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">

                    <p className="text-gray-400">
                        Inventory Risk
                    </p>

                    <h3 className="text-2xl font-bold text-red-400">
                        {risk.inventory_risk}
                    </h3>

                </div>

            </div>

        </div>
    );
}

export default RiskPanel;