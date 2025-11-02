import React, { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
const apiToken = import.meta.env.VITE_API_TOKEN;


function Calc() {
    const [coins, setCoins] = useState([]);
    const [holdings, setHoldings] = useState([{ name: "", amount: "" }]);
    const [totalAssets, setTotalAssets] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(
                    "/api/api/v3/coins/markets?vs_currency=idr",
                    {
                        headers: {
                            Authorization: `Bearer ${apiToken}`,
                        },
                    }
                );
                const data = await response.json();
                setCoins(data);
            } catch (error) {
                console.error("Error fetching coin data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoins();
    }, []);

    const handleChange = (index, field, value) => {
        const updatedHoldings = [...holdings];
        updatedHoldings[index][field] = value;
        setHoldings(updatedHoldings);
    };

    const addCoinField = () => {
        setHoldings([...holdings, { name: "", amount: "" }]);
    };

    const calculateAssets = () => {
        let total = 0;
        holdings.forEach((holding) => {
            const coin = coins.find(
                (c) =>
                    c.name.toLowerCase() === holding.name.toLowerCase() ||
                    c.symbol.toLowerCase() === holding.name.toLowerCase()
            );
            if (coin) {
                total += coin.current_price * Number(holding.amount || 0);
            }
        });
        setTotalAssets(total);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold text-center mb-8">
                Portofolio Calculator
            </h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading coin data...</p>
            ) : (
                <div className="max-w-3xl mx-auto space-y-4">
                    {holdings.map((holding, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                        >
                            <div className="flex flex-col w-full sm:w-1/2">
                                <label className="text-sm font-medium text-gray-600 mb-1">
                                    Total Coin {index + 1}
                                </label>
                                <input
                                    type="number"
                                    value={holding.amount}
                                    onChange={(e) =>
                                        handleChange(index, "amount", e.target.value)
                                    }
                                    placeholder="Masukkan jumlah coin"
                                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex flex-col w-full sm:w-1/2">
                                <label className="text-sm font-medium text-gray-600 mb-1">
                                    Coin Name
                                </label>
                                <input
                                    list={`coin-list-${index}`}
                                    value={holding.name}
                                    onChange={(e) =>
                                        handleChange(index, "name", e.target.value)
                                    }
                                    placeholder="Cari nama coin..."
                                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <datalist id={`coin-list-${index}`}>
                                    {coins.map((coin) => (
                                        <option key={coin.id} value={coin.name} />
                                    ))}
                                </datalist>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            onClick={addCoinField}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                        >
                            +
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={calculateAssets}
                            className="border border-gray-700 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Calculate Assets
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <h2 className="text-xl font-medium mb-2">Your Assets:</h2>
                        <p className="text-2xl font-bold text-indigo-700">
                            Rp {totalAssets.toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calc;

