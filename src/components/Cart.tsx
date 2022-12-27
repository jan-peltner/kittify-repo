import { gsap } from "gsap"
import { Dispatch, useLayoutEffect, useRef } from "react"
import CartItem from "./CartItem"

export default function Cart({
    setDisplayCart,
    animationTrig,
    setAnimationTrig,
}: {
    setDisplayCart: Dispatch<React.SetStateAction<boolean>>
    animationTrig: boolean
    setAnimationTrig: Dispatch<React.SetStateAction<boolean>>
}) {
    const overlayRef = useRef(null)
    const cartRef = useRef(null)

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
                <div className="grid grid-cols-2 gap-5">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <button className="bg-btncol w-1/2 hover:bg-pinkhover text-bgcol rounded-md my-3 p-3 font-bold transition-colors duration-200 ease-in-out">
                    Buy now
                </button>
            </div>
        </div>
    )
}
