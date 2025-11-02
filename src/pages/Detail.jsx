import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Detail() {
    const location = useLocation()
    const navigate = useNavigate()
    const { coin } = location.state || {}

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
        <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-10">
                {/* HEADER */}
                <div className="text-center mb-6">
                    <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-20 h-20 mx-auto mb-3"
                    />
                    <h1 className="text-3xl font-bold text-gray-800">
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </h1>
                    <p className="text-gray-500">
                        Rank #{coin.market_cap_rank}
                    </p>
                </div>

                {/* HARGA SEKARANG */}
                <div className="text-center mb-8">
                    <p className="text-gray-500 text-sm">Current Price</p>
                    <h2 className="text-4xl font-bold text-blue-600">
                        Rp {coin.current_price.toLocaleString('id-ID')}
                    </h2>
                    <p
                        className={`mt-1 font-semibold ${
                            coin.price_change_percentage_24h >= 0
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                        24h Change:{' '}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </div>

                {/* DATA GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Market Cap */}
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800">
                            💰 Market Cap
                        </h3>
                        <p className="text-gray-700">
                            Total nilai pasar dari semua koin yang beredar.
                        </p>
                        <p className="mt-2 font-bold text-blue-700">
                            Rp {coin.market_cap.toLocaleString('id-ID')}
                        </p>
                    </div>

                    {/* Volume 24H */}
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800">
                            🔄 Total Volume (24H)
                        </h3>
                        <p className="text-gray-700">
                            Jumlah total transaksi coin dalam 24 jam terakhir.
                        </p>
                        <p className="mt-2 font-bold text-blue-700">
                            Rp {coin.total_volume.toLocaleString('id-ID')}
                        </p>
                    </div>

                    {/* ATH */}
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800">
                            🚀 All-Time High (ATH)
                        </h3>
                        <p className="text-gray-700 text-sm mb-1">
                            Harga tertinggi yang pernah dicapai coin ini.
                        </p>
                        <p className="font-bold text-green-700">
                            Rp {coin.ath.toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(coin.ath_date).toLocaleString('id-ID', {
                                dateStyle: 'long',
                                timeStyle: 'short',
                            })}
                        </p>
                        <p
                            className={`text-sm font-semibold ${
                                coin.ath_change_percentage >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {coin.ath_change_percentage.toFixed(2)}%
                            dari puncak
                        </p>
                    </div>

                    {/* ATL */}
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800">
                            📉 All-Time Low (ATL)
                        </h3>
                        <p className="text-gray-700 text-sm mb-1">
                            Harga terendah sepanjang sejarah coin ini.
                        </p>
                        <p className="font-bold text-red-700">
                            Rp {coin.atl.toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(coin.atl_date).toLocaleString('id-ID', {
                                dateStyle: 'long',
                                timeStyle: 'short',
                            })}
                        </p>
                        <p
                            className={`text-sm font-semibold ${
                                coin.atl_change_percentage >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {coin.atl_change_percentage.toFixed(2)}%
                            dari dasar
                        </p>
                    </div>

                    {/* SUPPLY INFO */}
                    <div className="bg-gray-100 rounded-lg p-4 sm:col-span-2">
                        <h3 className="font-semibold text-gray-800">
                            🪙 Coin Supply
                        </h3>
                        <p className="text-gray-700 text-sm">
                            Jumlah koin yang beredar dan total maksimum yang
                            akan pernah ada.
                        </p>
                        <ul className="mt-2 text-gray-800">
                            <li>
                                <strong>Circulating Supply:</strong>{' '}
                                {coin.circulating_supply.toLocaleString('id-ID')}
                            </li>
                            <li>
                                <strong>Total Supply:</strong>{' '}
                                {coin.total_supply?.toLocaleString('id-ID') ??
                                    'N/A'}
                            </li>
                            <li>
                                <strong>Max Supply:</strong>{' '}
                                {coin.max_supply?.toLocaleString('id-ID') ??
                                    'N/A'}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm mb-3">
                        Terakhir diperbarui:{' '}
                        {new Date(coin.last_updated).toLocaleString('id-ID', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                        })}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        ← Kembali
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Detail
