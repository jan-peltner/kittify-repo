import { gsap } from "gsap"
import { useRef, useLayoutEffect } from "react"

import { MdClose } from "react-icons/md"

export default function FullscreenPic(props: {
    imgUrl: string
    setFullPic: any
}) {
    const { setFullPic } = props

    const overlayRef = useRef(null)
    const fullscreenRef = useRef(null)

    function handleClose() {
        gsap.to(overlayRef.current, {
            opacity: 0,
            ease: "power1.out",
            duration: 0.125,
        })
        gsap.to(fullscreenRef.current, {
            scale: 0.75,
            ease: "power1.out",
            duration: 0.25,
            onComplete: () => setFullPic(""),
        })
    }

    useLayoutEffect(() => {
        gsap.from(overlayRef.current, {
            opacity: 0,
            ease: "power1.out",
            duration: 0.25,
        })
        gsap.from(fullscreenRef.current, {
            scale: 0.5,
            ease: "elastic.out(1, 1)",
            duration: 0.5,
        })
    }, [])

    return (
        <div
            className="overlay absolute w-screen h-screen bg-[#000000]/70 z-10"
            onClick={handleClose}
            ref={overlayRef}
        >
            <div
                className="absolute image-container w-5/6 h-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                ref={fullscreenRef}
            >
                {" "}
                <img
                    className="object-cover w-full h-full"
                    src={props.imgUrl}
                    alt=""
                    onClick={(e) => e.stopPropagation()}
                />
                <MdClose
                    className="absolute scale-[2] top-5 right-5 -translate-x-1/2 cursor-pointer text-stroke font-bold hover:text-strokehover transition-colors duration-200 ease-in-out"
                    onClick={handleClose}
                />
            </div>
        </div>
    )
}
