import { Routes, Route } from "react-router-dom"
import { useState } from "react"

import Nav from "./components/Nav"
import Cart from "./components/Cart"
import Footer from "./components/Footer"
import FullscreenPic from "./components/FullscreenPic"
import Home from "./pages/Home"
import Store from "./pages/Store"
import About from "./pages/About"

export interface IitemData {
    _id?: number
    name: string
    imgUrl: string
    artist?: string
    price: number
}

export interface IcartItem {
    itemData: IitemData
    quantity?: number
}

export default function App() {
    const [fullPic, setFullPic] = useState(""),
        [displayCart, setDisplayCart] = useState(false),
        [animationTrig, setAnimationTrig] = useState(false),
        [cartItems, setCartItems] = useState<IcartItem[]>([])

    function triggerCartAnimation(): void {
        setAnimationTrig(true)
    }

    function getItem(itemData: IitemData): void {
        const { imgUrl } = itemData
        setFullPic(imgUrl)
    }

    function addItem(itemData: IitemData): void {
        setCartItems((prev) => {
            if (!prev.some((item) => item.itemData.name === itemData.name)) {
                return [...prev, { itemData, quantity: 1 }]
            } else {
                return [...prev, { itemData }]
            }
        })
    }

    function removeItem(itemData: IitemData): void {
        setCartItems((prev) => {
            const newArr = prev.filter(
                (item) => item.itemData.name !== itemData.name
            )
            return newArr
        })
    }

    function incQnt(itemData: IitemData): void {
        const { name } = itemData
        setCartItems((prev) => {
            const newArr = prev.map((item) => {
                if (item.itemData.name !== name) {
                    return item
                } else {
                    return {
                        ...item,
                        quantity:
                            item.quantity === 5
                                ? item.quantity
                                : (item.quantity ?? 1) + 1,
                    }
                }
            })
            return newArr
        })
    }

    function decQnt(itemData: IitemData): void {
        const { name } = itemData
        if (
            cartItems.some(
                (item) => item.itemData.name === name && item.quantity === 1
            )
        ) {
            removeItem(itemData)
        }
        setCartItems((prev) => {
            const newArr = prev.map((item) => {
                if (item.itemData.name !== name) {
                    return item
                } else {
                    return {
                        ...item,
                        quantity: (item.quantity ?? 2) - 1,
                    }
                }
            })
            return newArr
        })
    }

    return (
        <div className="flex flex-col bg-bgcol h-screen font-serif overflow-hidden">
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
                    cartItems={cartItems}
                    removeItem={removeItem}
                    getItem={getItem}
                />
            )}
            <div className="relative">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/store"
                        element={
                            <Store
                                getItem={getItem}
                                addItem={addItem}
                                cartItems={cartItems}
                                incQnt={incQnt}
                                decQnt={decQnt}
                            />
                        }
                    ></Route>
                    <Route path="/about" element={<About />}></Route>
                </Routes>
            </div>
            <Footer />
        </div>
    )
}
