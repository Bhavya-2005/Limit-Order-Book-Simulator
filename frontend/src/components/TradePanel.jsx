import React, {
    useState
} from "react";

import axios from "axios";
import {
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

function TradePanel({
    refreshOrderBook
}) {

    const [side, setSide] =
        useState("BUY");

    const [price, setPrice] =
        useState("");

    const [quantity, setQuantity] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const BACKEND_URL =
        "https://lob-backend.onrender.com";

    const submitOrder =
        async () => {

            if (!price || !quantity)
                return;

            try {

                setLoading(true);

                await axios.post(
                    `${BACKEND_URL}/order`,
                    {
                        side,
                        price:
                            parseFloat(price),

                        quantity:
                            parseInt(quantity)
                    }
                );

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
                    Execute Market Orders
                </p>

            </div>

            {/* BUY / SELL TOGGLE */}

            <div className="
                grid
                grid-cols-2
                gap-3
                mb-5
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

            {/* INPUTS */}

            <div className="
                flex
                flex-col
                gap-4
            ">

                {/* PRICE */}

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
                            transition-all
                        "
                    />

                </div>

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
                            transition-all
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
                        : `${side} ORDER`
                    }

                </button>

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
                    Exchange Mode
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