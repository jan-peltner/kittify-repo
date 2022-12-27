import { Routes, Route } from "react-router-dom"
import { useState } from "react"

import { itemData } from "./data/items"

import Nav from "./components/Nav"
import Cart from "./components/Cart"
import FullscreenPic from "./components/FullscreenPic"
import Home from "./pages/Home"
import Store from "./pages/Store"
import About from "./pages/About"

export default function App() {
    const [fullPic, setFullPic] = useState("")
    const [displayCart, setDisplayCart] = useState(false)
    const [animationTrig, setAnimationTrig] = useState(false)

    function triggerCartAnimation(): void {
        setAnimationTrig(true)
    }

    function getItem(obj: itemData): void {
        const { imgUrl } = obj
        setFullPic(imgUrl)
    }
    return (
        <div className="bg-bgcol h-screen font-serif overflow-hidden">
            {fullPic && (
                <div>
                    <FullscreenPic imgUrl={fullPic} setFullPic={setFullPic} />
                </div>
            )}

            <Nav
                displayCart={displayCart}
                setDisplayCart={setDisplayCart}
                triggerCartAnimation={triggerCartAnimation}
            />
            {displayCart && (
                <Cart
                    setDisplayCart={setDisplayCart}
                    animationTrig={animationTrig}
                    setAnimationTrig={setAnimationTrig}
                />
            )}
            <div className="relative">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/store"
                        element={<Store getItem={getItem} />}
                    ></Route>
                    <Route path="/about" element={<About />}></Route>
                </Routes>
            </div>
        </div>
    )
}
