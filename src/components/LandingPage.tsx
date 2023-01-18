import React, { Dispatch } from "react"

type Props = {
    setAccess: Dispatch<React.SetStateAction<boolean>>
}

export default function LandingPage(props: Props) {
    const { setAccess } = props

    return (
        <div className="w-screen h-screen bg-[url('/bglanding.png')] bg-no-repeat bg-cover">
            <button
                onClick={() => {
                    setAccess(true)
                }}
            >
                Click me
            </button>
        </div>
    )
}
