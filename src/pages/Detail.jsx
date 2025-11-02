import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Detail() {
    const location = useLocation()
    const navigate = useNavigate()
    const { coin } = location.state || {} // Ambil data coin dari state

    if (!coin) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500">No data found. Please go back.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Back
                </button>
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
                {coin.name} ({coin.symbol.toUpperCase()})
            </h1>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-20 h-20 mx-auto mb-4"
                />
                <p className="text-gray-700">
                    <strong>Rank:</strong> {coin.market_cap_rank}
                </p>
                <p className="text-gray-700">
                    <strong>Current Price:</strong> Rp{' '}
                    {coin.current_price.toLocaleString('id-ID')}
                </p>
                <p className="text-gray-700">
                    <strong>Market Cap:</strong> Rp{' '}
                    {coin.market_cap.toLocaleString('id-ID')}
                </p>
                <p
                    className={`text-gray-700 font-semibold ${
                        coin.price_change_percentage_24h >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                    }`}
                >
                    <strong>24h Change:</strong>{' '}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </p>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export default Detail

