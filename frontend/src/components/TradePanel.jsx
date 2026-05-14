import React, {
    useState
} from "react";

import axios from "axios";

function TradePanel({
    refreshOrderBook
}) {

    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const placeBuyOrder = async () => {

        await axios.get(
            `http://127.0.0.1:8000/add_buy_order?price=${price}&quantity=${quantity}`
        );

        refreshOrderBook();
    };

    const placeSellOrder = async () => {

        await axios.get(
            `http://127.0.0.1:8000/add_sell_order?price=${price}&quantity=${quantity}`
        );

        refreshOrderBook();
    };

    return (

        <div>

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Trade Panel
            </h2>

            <div className="flex flex-col gap-4">

                <input
                    className="bg-slate-800 border border-slate-600 p-3 rounded-lg"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                />

                <input
                    className="bg-slate-800 border border-slate-600 p-3 rounded-lg"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(e.target.value)
                    }
                />

                <div className="flex gap-4">

                    <button
                        onClick={placeBuyOrder}
                        className="bg-green-500 hover:bg-green-600 p-3 rounded-lg w-full font-bold"
                    >
                        BUY
                    </button>

                    <button
                        onClick={placeSellOrder}
                        className="bg-red-500 hover:bg-red-600 p-3 rounded-lg w-full font-bold"
                    >
                        SELL
                    </button>

                </div>

            </div>

        </div>
    );
}

export default TradePanel;