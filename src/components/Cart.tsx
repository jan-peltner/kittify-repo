import { gsap } from "gsap"
import { Dispatch, useLayoutEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import Tooltip from "@mui/material/Tooltip"

import { BsCartX } from "react-icons/bs"

import CartItem from "./CartItem"

import { IcartItem, IitemData } from "../App"

type Props = {
    setDisplayCart: Dispatch<React.SetStateAction<boolean>>
    animationTrig: boolean
    setAnimationTrig: Dispatch<React.SetStateAction<boolean>>
    cartItems: IcartItem[]
    setCartItems: Dispatch<React.SetStateAction<IcartItem[]>>
    getItem: ({}: IitemData) => void
    getQnt: (cartItems: IcartItem[], name: string) => number
    incQnt: ({}: IitemData) => void
    decQnt: ({}: IitemData) => void
}

export default function Cart(props: Props) {
    const {
        setDisplayCart,
        animationTrig,
        setAnimationTrig,
        cartItems,
        setCartItems,
        getItem,
        getQnt,
        incQnt,
        decQnt,
    } = props

    const overlayRef = useRef(null)
    const cartRef = useRef(null)

    const cartItemArr = cartItems.map((item) => (
        <CartItem
            key={item.itemData._id}
            cartItem={{
                itemData: {
                    name: item.itemData.name,
                    imgUrl: item.itemData.imgUrl,
                    price: item.itemData.price,
                    artist: item.itemData.artist,
                },
                quantity: 1,
            }}
            cartItems={cartItems}
            getItem={getItem}
            setDisplayCart={setDisplayCart}
            getQnt={getQnt}
            incQnt={incQnt}
            decQnt={decQnt}
        />
    ))
    function calcTotal(cartItems: IcartItem[]): string {
        let total = 0
        cartItems.forEach((item) => {
            total += item.itemData.price * (item.quantity ?? 1)
        })
        return total.toFixed(2)
    }

    function handleClose(): void {
        gsap.to(overlayRef.current, {
            opacity: 0,
            ease: "power1.out",
            duration: 0.125,
        })
        gsap.to(cartRef.current, {
            x: 250,
            ease: "power1.out",
            duration: 0.25,
            onComplete: () => {
                setDisplayCart(false)
                setAnimationTrig(false)
            },
        })
    }

    useLayoutEffect(() => {
        gsap.from(overlayRef.current, {
            opacity: 0,
            ease: "power1.out",
            duration: 0.25,
        })
        gsap.from(cartRef.current, {
            opacity: 0,
            x: 250,
            ease: "elastic.out(1, 1)",
            duration: 0.5,
        })
    }, [])

    if (animationTrig) {
        handleClose()
    }

    return (
        <div
            className="overlay absolute w-screen h-screen bg-[#000000]/70 z-10"
            onClick={handleClose}
            ref={overlayRef}
        >
            <div
                className="flex flex-col justify-center items-center bg-bgcol w-1/3 rounded-l-md  absolute right-0 z-20"
                ref={cartRef}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex justify-center mb-3 border-b-[1px] border-b-btncol">
                    <h2 className="bg-stroke w-full text-center px-5 pt-5 pb-1 font-cursive font-bold text-hcol text-3xl ">
                        Checkout.
                    </h2>
                </div>
                {cartItems[0] ? (
                    <div className="w-full flex flex-col items-center">
                        <div className="flex flex-col items-center gap-6">
                            {cartItemArr}
                        </div>
                        <div className="w-full bg-stroke border-t-[2px] border-t-btncol">
                            <div className="pt-6 pb-3 font-bold text-hcol text-center">
                                Total Cost: {calcTotal(cartItems)}$
                            </div>
                            <div className="w-full flex justify-around items-center">
                                <button className="bg-btncol w-1/3 hover:bg-pinkhover text-bgcol rounded-md my-3 p-3 font-bold transition-colors duration-200 ease-in-out">
                                    Buy meow
                                </button>
                                <Tooltip
                                    title="Remove all Items from Cart"
                                    placement="top"
                                    arrow
                                >
                                    <div>
                                        <BsCartX
                                            onClick={() => setCartItems([])}
                                            className="fill-[#de1738] scale-150 cursor-pointer"
                                        ></BsCartX>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center justify-between">
                        <div className="pt-5 font-bold text-hcol">
                            No items in cart. 😿
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 400 300"
                            width="306"
                            height="206"
                        >
                            <g
                                id="_296_empty_inbox_outline"
                                data-name="#296_empty_inbox_outline"
                            >
                                <path
                                    d="M287.57,149.09l-32.58-44a7.2,7.2,0,0,0-5.8-2.92H150.81a7.2,7.2,0,0,0-5.8,2.92l-32.58,44v53.62a11,11,0,0,0,11,11H276.59a11,11,0,0,0,11-11Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M276.59,214.69H123.41a12,12,0,0,1-12-12V149.09a1,1,0,0,1,.19-.6l32.58-44a8.26,8.26,0,0,1,6.61-3.33h98.38a8.26,8.26,0,0,1,6.61,3.33l32.58,44a1,1,0,0,1,.19.6v53.62A12,12,0,0,1,276.59,214.69ZM113.43,149.42v53.29a10,10,0,0,0,10,10H276.59a10,10,0,0,0,10-10V149.42l-32.38-43.75a6.25,6.25,0,0,0-5-2.52H150.81a6.25,6.25,0,0,0-5,2.52Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M287.57,149.09v53.62a11,11,0,0,1-11,11H123.41a11,11,0,0,1-11-11V149.09h47.41l4.46,22a8.75,8.75,0,0,0,8.58,7h54.84a8.78,8.78,0,0,0,8.62-7.15l4.12-21.91Z"
                                    fill="#ac7151"
                                ></path>
                                <path
                                    d="M276.58,214.69H123.41a12,12,0,0,1-12-12V149.09a1,1,0,0,1,1-1h47.41a1,1,0,0,1,1,.8l4.46,22a7.77,7.77,0,0,0,7.6,6.23h54.84a7.77,7.77,0,0,0,7.63-6.34l4.12-21.91a1,1,0,0,1,1-.81h47.11a1,1,0,0,1,1,1v53.62A12,12,0,0,1,276.58,214.69Zm-163.15-64.6v52.62a10,10,0,0,0,10,10H276.58a10,10,0,0,0,10-10V150.09H241.29l-4,21.09a9.78,9.78,0,0,1-9.6,8H172.88a9.77,9.77,0,0,1-9.56-7.83L159,150.09Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M150.9,191.86H131.26a1,1,0,0,1,0-2H150.9a1,1,0,0,1,0,2Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M164.5,89a2,2,0,0,1-1.59-.8l-13.61-18a2,2,0,0,1,3.2-2.41l13.6,18a2,2,0,0,1-.39,2.8A2,2,0,0,1,164.5,89Z"
                                    fill="#dfeaef"
                                ></path>
                                <path
                                    d="M228.94,89a2.05,2.05,0,0,1-1.21-.41,2,2,0,0,1-.39-2.8l13.61-18a2,2,0,0,1,3.19,2.41l-13.6,18A2,2,0,0,1,228.94,89Z"
                                    fill="#dfeaef"
                                ></path>
                                <path
                                    d="M198.29,83a2,2,0,0,1-2-2V56.15a2,2,0,0,1,4,0V81A2,2,0,0,1,198.29,83Z"
                                    fill="#dfeaef"
                                ></path>
                                <rect
                                    x="231.96"
                                    y="184.22"
                                    width="65.37"
                                    height="34.09"
                                    rx="3.89"
                                    fill="#F4E3D7"
                                ></rect>
                                <path
                                    d="M293.44,219.32H235.85a4.9,4.9,0,0,1-4.89-4.89V188.11a4.9,4.9,0,0,1,4.89-4.89h57.59a4.9,4.9,0,0,1,4.89,4.89v26.32A4.9,4.9,0,0,1,293.44,219.32Zm-57.59-34.1a2.89,2.89,0,0,0-2.89,2.89v26.32a2.89,2.89,0,0,0,2.89,2.89h57.59a2.9,2.9,0,0,0,2.89-2.89V188.11a2.9,2.9,0,0,0-2.89-2.89Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M241.81,194.5h7.66v2.3h-5.18v2.1h4.89v2.29h-4.89v2.3h5.46v2.29h-7.94Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M251.44,198h2.3v1.05h0a1.59,1.59,0,0,1,.32-.44,2,2,0,0,1,.49-.4,3,3,0,0,1,.65-.29,2.92,2.92,0,0,1,.8-.11,3.06,3.06,0,0,1,1.44.33,2.15,2.15,0,0,1,.95,1.06,2.55,2.55,0,0,1,1-1.07,3.46,3.46,0,0,1,2.77-.06,2.27,2.27,0,0,1,.84.72,3,3,0,0,1,.45,1.07,6,6,0,0,1,.13,1.31v4.57h-2.39v-4.51a1.83,1.83,0,0,0-.23-.93.87.87,0,0,0-.82-.39,1.54,1.54,0,0,0-.69.14,1.1,1.1,0,0,0-.45.37,1.67,1.67,0,0,0-.24.56,2.87,2.87,0,0,0-.07.67v4.09h-2.39v-4.09c0-.14,0-.31,0-.51a1.94,1.94,0,0,0-.12-.58,1,1,0,0,0-.31-.46,1,1,0,0,0-.63-.19,1.47,1.47,0,0,0-.74.17,1.1,1.1,0,0,0-.44.44,1.86,1.86,0,0,0-.2.63,5.87,5.87,0,0,0,0,.74v3.85h-2.39Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M265.52,198h2.2v1h0a2.4,2.4,0,0,1,.38-.42,2.2,2.2,0,0,1,.54-.39,3.66,3.66,0,0,1,.67-.29,2.9,2.9,0,0,1,.79-.11,4.13,4.13,0,0,1,1.56.29,3.74,3.74,0,0,1,1.2.83,3.79,3.79,0,0,1,.77,1.27,4.61,4.61,0,0,1,.27,1.61,5,5,0,0,1-.24,1.55,4.25,4.25,0,0,1-.71,1.31,3.36,3.36,0,0,1-1.1.92,3.13,3.13,0,0,1-1.48.34,4,4,0,0,1-1.4-.23,2.18,2.18,0,0,1-1.06-.79h0v4.46h-2.39Zm2.2,3.87a2,2,0,0,0,.5,1.42,1.85,1.85,0,0,0,1.41.54,1.82,1.82,0,0,0,1.41-.54,2.27,2.27,0,0,0,0-2.84,1.82,1.82,0,0,0-1.41-.54,1.85,1.85,0,0,0-1.41.54A2,2,0,0,0,267.72,201.91Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M280.61,200H278.5v2.58a3.45,3.45,0,0,0,0,.58,1.08,1.08,0,0,0,.14.46.76.76,0,0,0,.34.29,1.48,1.48,0,0,0,.61.11c.13,0,.3,0,.51,0a.88.88,0,0,0,.47-.19v2a3.44,3.44,0,0,1-.83.19,6.15,6.15,0,0,1-.85.05,4.33,4.33,0,0,1-1.11-.13,2.5,2.5,0,0,1-.89-.4,1.86,1.86,0,0,1-.6-.73,2.47,2.47,0,0,1-.22-1.08V200h-1.53V198h1.53v-2.29h2.39V198h2.11Z"
                                    fill="#093f68"
                                ></path>
                                <path
                                    d="M286.28,207c-.16.41-.32.78-.47,1.1a2.35,2.35,0,0,1-.56.8,2.19,2.19,0,0,1-.87.5,4.75,4.75,0,0,1-1.38.16,5.63,5.63,0,0,1-1.79-.28l.32-2a2.71,2.71,0,0,0,1.11.24,2,2,0,0,0,.66-.09,1,1,0,0,0,.42-.26,1.5,1.5,0,0,0,.28-.4l.24-.56.17-.45L281,198h2.58l2,5.11h0l1.71-5.11h2.45Z"
                                    fill="#093f68"
                                ></path>
                            </g>
                        </svg>
                        <button
                            onClick={handleClose}
                            className="bg-btncol w-1/2 hover:bg-pinkhover text-stroke rounded-lg my-3 p-3 font-bold transition-colors duration-200 ease-in-out"
                        >
                            <NavLink to="/store">Go to Store</NavLink>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
