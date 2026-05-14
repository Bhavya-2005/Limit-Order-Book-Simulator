import React, {
    useState
} from "react";

import axios from "axios";

import {
    ArrowUpRight,
    ArrowDownRight,
    Layers3
} from "lucide-react";

function TradePanel({
    refreshOrderBook
}) {

    const [side, setSide] =
        useState("BUY");

    const [orderType, setOrderType] =
        useState("LIMIT");

    const [price, setPrice] =
        useState("");

    const [quantity, setQuantity] =
        useState("");

    const [cancelOrderId, setCancelOrderId] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const BACKEND_URL =
        "https://lob-backend.onrender.com";

    // SUBMIT ORDER

    const submitOrder =
        async () => {

            if (!quantity)
                return;

            try {

                setLoading(true);

                // LIMIT ORDERS

                if (orderType === "LIMIT") {

                    if (!price)
                        return;

                    const endpoint =

                        side === "BUY"

                            ? "/add_buy_order"

                            : "/add_sell_order";

                    await axios.get(

                        `${BACKEND_URL}${endpoint}`,

                        {
                            params: {

                                price:
                                    parseFloat(price),

                                quantity:
                                    parseInt(quantity)
                            }
                        }
                    );

                }

                // MARKET ORDERS

                else {

                    const endpoint =

                        side === "BUY"

                            ? "/market_buy"

                            : "/market_sell";

                    await axios.get(

                        `${BACKEND_URL}${endpoint}`,

                        {
                            params: {

                                quantity:
                                    parseInt(quantity)
                            }
                        }
                    );
                }

                // RESET

                setPrice("");
                setQuantity("");

                refreshOrderBook();

            } catch (error) {

                console.error(
                    "Order Error:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

    // CANCEL ORDER

    const cancelOrder =
        async () => {

            if (!cancelOrderId)
                return;

            try {

                await axios.get(

                    `${BACKEND_URL}/cancel_order`,

                    {
                        params: {

                            order_id:
                                parseInt(
                                    cancelOrderId
                                )
                        }
                    }
                );

                setCancelOrderId("");

                refreshOrderBook();

            } catch (error) {

                console.error(
                    "Cancel Error:",
                    error
                );
            }
        };

    return (

        <div className="h-full flex flex-col">

            {/* HEADER */}

            <div className="mb-5">

                <h2 className="
                    text-2xl
                    font-bold
                    text-cyan-400
                ">
                    Trade Panel
                </h2>

                <p className="
                    text-slate-400
                    text-sm
                ">
                    Professional Exchange Terminal
                </p>

            </div>

            {/* BUY / SELL */}

            <div className="
                grid
                grid-cols-2
                gap-3
                mb-4
            ">

                <button
                    onClick={() =>
                        setSide("BUY")
                    }
                    className={`
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-3
                        rounded-xl
                        font-bold
                        transition-all
                        duration-300
                        ${
                            side === "BUY"
                                ? `
                                    bg-green-500
                                    text-white
                                    shadow-lg
                                    shadow-green-500/30
                                  `
                                : `
                                    bg-slate-800
                                    text-slate-400
                                  `
                        }
                    `}
                >

                    <ArrowUpRight size={20} />

                    BUY

                </button>

                <button
                    onClick={() =>
                        setSide("SELL")
                    }
                    className={`
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-3
                        rounded-xl
                        font-bold
                        transition-all
                        duration-300
                        ${
                            side === "SELL"
                                ? `
                                    bg-red-500
                                    text-white
                                    shadow-lg
                                    shadow-red-500/30
                                  `
                                : `
                                    bg-slate-800
                                    text-slate-400
                                  `
                        }
                    `}
                >

                    <ArrowDownRight size={20} />

                    SELL

                </button>

            </div>

            {/* ORDER TYPE */}

            <div className="
                grid
                grid-cols-2
                gap-3
                mb-5
            ">

                <button
                    onClick={() =>
                        setOrderType(
                            "LIMIT"
                        )
                    }
                    className={`
                        py-2
                        rounded-xl
                        font-semibold
                        transition-all
                        ${
                            orderType === "LIMIT"
                                ? `
                                    bg-cyan-500
                                    text-white
                                  `
                                : `
                                    bg-slate-800
                                    text-slate-400
                                  `
                        }
                    `}
                >
                    LIMIT
                </button>

                <button
                    onClick={() =>
                        setOrderType(
                            "MARKET"
                        )
                    }
                    className={`
                        py-2
                        rounded-xl
                        font-semibold
                        transition-all
                        ${
                            orderType === "MARKET"
                                ? `
                                    bg-yellow-500
                                    text-black
                                  `
                                : `
                                    bg-slate-800
                                    text-slate-400
                                  `
                        }
                    `}
                >
                    MARKET
                </button>

            </div>

            {/* INPUTS */}

            <div className="
                flex
                flex-col
                gap-4
            ">

                {/* PRICE */}

                {orderType === "LIMIT" && (

                    <div>

                        <label className="
                            text-sm
                            text-slate-400
                            mb-2
                            block
                        ">
                            Price
                        </label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(
                                    e.target.value
                                )
                            }
                            placeholder="Enter Price"
                            className="
                                w-full
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-cyan-400
                            "
                        />

                    </div>
                )}

                {/* QUANTITY */}

                <div>

                    <label className="
                        text-sm
                        text-slate-400
                        mb-2
                        block
                    ">
                        Quantity
                    </label>

                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(
                                e.target.value
                            )
                        }
                        placeholder="Enter Quantity"
                        className="
                            w-full
                            bg-slate-800
                            border
                            border-slate-700
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-cyan-400
                        "
                    />

                </div>

                {/* QUICK SIZE */}

                <div className="
                    grid
                    grid-cols-4
                    gap-2
                ">

                    {[1, 5, 10, 25].map(
                        (size) => (

                            <button
                                key={size}
                                onClick={() =>
                                    setQuantity(
                                        size
                                    )
                                }
                                className="
                                    py-2
                                    rounded-lg
                                    bg-slate-800
                                    hover:bg-cyan-500/20
                                    text-slate-300
                                    text-sm
                                    transition-all
                                "
                            >
                                {size}
                            </button>
                        )
                    )}

                </div>

                {/* SUBMIT */}

                <button
                    onClick={submitOrder}
                    disabled={loading}
                    className={`
                        mt-2
                        py-4
                        rounded-xl
                        font-bold
                        text-lg
                        transition-all
                        duration-300
                        ${
                            side === "BUY"
                                ? `
                                    bg-green-500
                                    hover:bg-green-400
                                    shadow-lg
                                    shadow-green-500/30
                                  `
                                : `
                                    bg-red-500
                                    hover:bg-red-400
                                    shadow-lg
                                    shadow-red-500/30
                                  `
                        }
                    `}
                >

                    {loading

                        ? "Processing..."

                        : `${side} ${orderType}`
                    }

                </button>

            </div>

            {/* CANCEL ORDER */}

            <div className="
                mt-6
                pt-6
                border-t
                border-slate-800
            ">

                <div className="
                    flex
                    items-center
                    gap-2
                    mb-3
                ">

                    <Layers3
                        size={18}
                        className="
                            text-yellow-400
                        "
                    />

                    <h3 className="
                        font-semibold
                        text-yellow-400
                    ">
                        Cancel Order
                    </h3>

                </div>

                <div className="
                    flex
                    gap-2
                ">

                    <input
                        type="number"
                        value={cancelOrderId}
                        onChange={(e) =>
                            setCancelOrderId(
                                e.target.value
                            )
                        }
                        placeholder="Order ID"
                        className="
                            flex-1
                            bg-slate-800
                            border
                            border-slate-700
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-yellow-400
                        "
                    />

                    <button
                        onClick={cancelOrder}
                        className="
                            px-4
                            rounded-xl
                            bg-yellow-500
                            text-black
                            font-bold
                            hover:bg-yellow-400
                            transition-all
                        "
                    >
                        Cancel
                    </button>

                </div>

            </div>

            {/* FOOTER */}

            <div className="
                mt-auto
                pt-5
                text-xs
                text-slate-500
                flex
                justify-between
            ">

                <span>
                    Exchange Engine
                </span>

                <span className="
                    text-green-400
                ">
                    ● LIVE
                </span>

            </div>

        </div>
    );
}

export default TradePanel;