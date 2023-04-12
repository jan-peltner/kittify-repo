import React, { Dispatch, useRef, useEffect, useState } from "react"

type Props = {
    setAccess: Dispatch<React.SetStateAction<boolean>>
}

export default function LandingPage(props: Props) {
    const pTextEl: any = useRef(null)

    function resize() {
        // recursive function to match the top text to the size of the viewport
        console.log("runs")
        const windowSize = window.innerWidth
        const elSize = pTextEl.current?.offsetWidth
        if (windowSize - elSize > 420) {
            pTextEl.current.innerText += " KITTY ART"
            resize()
        }
        if (windowSize === elSize) {
            pTextEl.current.innerText = ""
            resize()
        }
    }

    useEffect(() => {
        resize()
        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    const { setAccess } = props

    return (
        <div className="relative w-screen h-screen bg-[url('/bglanding.png')] bg-no-repeat bg-cover">
            <p
                ref={pTextEl}
                className="text-hcol text-7xl pl-2 pt-2 w-fit text-opacity-90 tracking-widest select-none"
            ></p>
            <button
                className="absolute left-1/2 bottom-1/3 -translate-x-1/2 bg-main opacity-90 text-stroke text-xl font-bold max-w-[300px] w-1/6 h-14 rounded-xl hover:brightness-125 transition-all duration-200 ease-in-out"
                onClick={() => {
                    setAccess(true)
                }}
            >
                Enter
            </button>
        </div>
    )
}
