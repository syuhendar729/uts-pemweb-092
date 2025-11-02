import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Filter from './pages/Filter'
import Calc from './pages/Calc'
import Detail from './pages/Detail'
import Navbar from './components/Navbar'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/filter" element={<Filter />} />
                    <Route path="/calc" element={<Calc />} />
                    {/* <Route path="/detail" element={<Detail />} /> */}
					<Route path="/coin/:symbol" element={<Detail />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
