import { Routes, Route } from "react-router-dom"
import { useState } from "react"

import { data } from "./data/items"

import LandingPage from "./components/LandingPage"
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

//---------------------------------------------------------------------------------------------------------------------------------------
// a cache for all images in the data array in order to smooth out animations (avoid unncecessary GET requests/validations)
// for bigger datasets, images would need to be added to the cache dynamically (via the store page/component) to avoid large FCP times
// O(n) time complexity; n = number of overall items in dataset

function getImages() {
    const imgArr: JSX.Element[] = []
    imgArr.push(<img key="bg" src="/bglanding.png"></img>)
    data.forEach((collection) =>
        collection.forEach((item) => {
            imgArr.push(<img key={item.name} src={item.imgUrl}></img>)
        })
    )
    return imgArr
}

const imgCache = getImages()

//---------------------------------------------------------------------------------------------------------------------------------------

export default function App() {
    const [fullPic, setFullPic] = useState(""),
        [displayCart, setDisplayCart] = useState(false),
        [animationTrig, setAnimationTrig] = useState(false),
        [cartItems, setCartItems] = useState<IcartItem[]>([]),
        [access, setAccess] = useState(false)

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

    function getQnt(cartItems: IcartItem[], name: string): number {
        let qnt = 0
        cartItems.forEach((item) => {
            if (item.itemData.name === name) {
                qnt = item.quantity ?? 1
            }
        })
        return qnt
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
        <>
            {/* img cache */}
            <div className="hidden">{imgCache}</div>

            {access ? (
                <div className="flex flex-col bg-bgcol h-screen font-serif overflow-x-hidden scrollbar-thin scrollbar-thumb-btncol scrollbar-thumb-rounded-full">
                    {fullPic && (
                        <div>
                            <FullscreenPic
                                imgUrl={fullPic}
                                setFullPic={setFullPic}
                            />
                        </div>
                    )}

                    <Nav
                        displayCart={displayCart}
                        setDisplayCart={setDisplayCart}
                        triggerCartAnimation={triggerCartAnimation}
                        cartItems={cartItems}
                    />
                    {displayCart && (
                        <Cart
                            setDisplayCart={setDisplayCart}
                            animationTrig={animationTrig}
                            setAnimationTrig={setAnimationTrig}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            getItem={getItem}
                            getQnt={getQnt}
                            incQnt={incQnt}
                            decQnt={decQnt}
                        />
                    )}
                    <div className="w-full h-full">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Store
                                        getItem={getItem}
                                        addItem={addItem}
                                        cartItems={cartItems}
                                        getQnt={getQnt}
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
            ) : (
                <LandingPage setAccess={setAccess} />
            )}
        </>
    )
}
