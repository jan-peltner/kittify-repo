import { gsap } from "gsap"
import { Dispatch, useLayoutEffect, useRef } from "react"
import { NavLink } from "react-router-dom"

import CartItem from "./CartItem"

import { IcartItem, IitemData } from "../App"

type Props = {
    setDisplayCart: Dispatch<React.SetStateAction<boolean>>
    animationTrig: boolean
    setAnimationTrig: Dispatch<React.SetStateAction<boolean>>
    cartItems: IcartItem[]
    removeItem: (itemData: IitemData) => void
    getItem: ({}: IitemData) => void
}

export default function Cart(props: Props) {
    const {
        setDisplayCart,
        animationTrig,
        setAnimationTrig,
        cartItems,
        removeItem,
        getItem,
    } = props
    const overlayRef = useRef(null)
    const cartRef = useRef(null)
    console.log(props)
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
            removeItem={removeItem}
            getItem={getItem}
            setDisplayCart={setDisplayCart}
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
                className="flex flex-col justify-center items-center bg-pcol w-1/3 rounded-l-md absolute right-0 z-20"
                ref={cartRef}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex justify-center mb-3 border-b-2 border-b-stroke">
                    <h2 className="px-5 pt-5 pb-1 font-cursive font-bold text-stroke text-3xl ">
                        Checkout.
                    </h2>
                </div>
                {cartItems[0] ? (
                    <div className="w-full flex flex-col items-center">
                        <div className="grid grid-cols-2 gap-y-8 gap-x-6 px-3">
                            {cartItemArr}
                        </div>
                        <div className="pt-6 pb-3 font-bold">
                            Total Cost: {calcTotal(cartItems)}$
                        </div>
                        <button className="bg-btncol w-1/2 hover:bg-pinkhover text-bgcol rounded-md my-3 p-3 font-bold transition-colors duration-200 ease-in-out">
                            Buy meow
                        </button>
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center">
                        <div className="py-10 font-bold">
                            No items in cart. 😿
                        </div>
                        <button
                            onClick={handleClose}
                            className="bg-btncol w-1/2 hover:bg-pinkhover text-bgcol rounded-md my-3 p-3 font-bold transition-colors duration-200 ease-in-out"
                        >
                            <NavLink to="/store">Go to Store</NavLink>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
