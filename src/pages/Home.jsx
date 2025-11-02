import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
// import { getCoinList } from '../api/coins.js'

const apiUrl = import.meta.env.VITE_API_URL
const apiToken = import.meta.env.VITE_API_TOKEN

function Home() {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
	const navigate = useNavigate();

    // ✅ Pindahkan ke luar useEffect biar bisa dipakai ulang
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `${apiUrl}/coins/markets?vs_currency=idr`,
                {
                    headers: {
                        Authorization: `Bearer ${apiToken}`,
                    },
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            const top10 = data
                .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
                .slice(0, 10)
            setCoins(top10)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleRefresh = () => {
        setRefreshing(true)
        fetchData()
    }

    return (
        <div className="p-8">
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-2xl font-bold text-center mb-3">
                    Top 10 Cryptocurrency Markets (IDR)
                </h1>
                <button
                    onClick={fetchData}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Refreshing...' : 'Refresh Data'}
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading data...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Rank
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Coin
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Price (IDR)
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Market Cap
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    24h Change (%)
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {coins.map((coin) => (
                                <tr key={coin.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                        {coin.market_cap_rank}
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-6 h-6"
                                        />
                                        <span className="font-medium">
                                            {coin.name}
                                        </span>
                                        <span className="uppercase text-gray-500 text-xs">
                                            ({coin.symbol})
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Rp{' '}
                                        {coin.current_price.toLocaleString(
                                            'id-ID'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Rp{' '}
                                        {coin.market_cap.toLocaleString(
                                            'id-ID'
                                        )}
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-sm font-semibold ${
                                            coin.price_change_percentage_24h >=
                                            0
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {coin.price_change_percentage_24h.toFixed(
                                            2
                                        )}
                                        %
                                    </td>

                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() =>
                                                navigate(`/coin/${coin.id}`, {
                                                    state: { coin },
                                                })
                                            }
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-800 transition"
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Home
