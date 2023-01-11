import ItemCard from "../components/ItemCard"

import { data } from "../data/items"
import { IcartItem, IitemData } from "../App"

import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { RxDot, RxDotFilled } from "react-icons/rx"
import { useState } from "react"
import Tooltip from "@mui/material/Tooltip"

type Props = {
    cartItems: IcartItem[]
    getItem: ({}: IitemData) => void
    addItem: ({}: IitemData) => void
    getQnt: (cartItems: IcartItem[], name: string) => number
    incQnt: ({}: IitemData) => void
    decQnt: ({}: IitemData) => void
}

export default function Store(props: Props) {
    const phrases = [
        "ART THAT MAKES YOU PURR.",
        "ART THAT MAKES YOU ROAR.",
        "ART THAT MAKES YOU GROWL.",
    ]

    const [phrase, setPhrase] = useState(phrases[0])
    const [collection, setCollection] = useState(0)
    const { cartItems, getItem, addItem, getQnt, incQnt, decQnt } = props
    const itemArr = data[collection].map((item) => (
        <ItemCard
            key={item._id}
            itemData={{
                name: item.name,
                imgUrl: item.imgUrl,
                artist: item.artist,
                price: item.price,
            }}
            cartItems={cartItems}
            getItem={getItem}
            addItem={addItem}
            getQnt={getQnt}
            incQnt={incQnt}
            decQnt={decQnt}
        />
    ))
    const dotArr = data.map((coll, idx) => {
        if (collection === idx) {
            return <RxDotFilled className="text-hcol scale-[2]" />
        } else {
            return <RxDot className="text-hcol scale-[1.5]" />
        }
    })

    function handleARClick(data: IitemData[][]): void {
        setCollection((prev) => {
            generateRandomPhrase(phrases, phrase)
            if (prev === data.length - 1) {
                return 0
            } else {
                return prev + 1
            }
        })
    }

    function handleALClick(data: IitemData[][]): void {
        generateRandomPhrase(phrases, phrase)
        setCollection((prev) => {
            if (prev === 0) {
                return data.length - 1
            } else {
                return prev - 1
            }
        })
    }

    function generateRandomPhrase(phrases: string[], oldPhrase: string): void {
        const newPhrase = phrases[Math.floor(Math.random() * phrases.length)]
        if (newPhrase === oldPhrase) {
            generateRandomPhrase(phrases, phrase)
            return
        }
        setPhrase(newPhrase)
    }

    return (
        <>
            <div className="flex justify-between h-[100px] items-center pr-28">
                <h1 className="text-hcol text-6xl py-5 tracking-widest pl-5">
                    {phrase}
                </h1>
                <div className="flex gap-16 h-full items-center relative">
                    <Tooltip title="Previous Collection" placement="top" arrow>
                        <div>
                            <BsArrowLeft
                                onClick={() => handleALClick(data)}
                                className="scale-[3.5]  cursor-pointer fill-hcol transition-all origin-center duration-200 ease-in-out hover:scale-[3.7] hover:brightness-125 active:scale-[3.5] active:brightness-50"
                            />
                        </div>
                    </Tooltip>
                    <Tooltip title="Next Collection" placement="top" arrow>
                        <div>
                            <BsArrowRight
                                onClick={() => handleARClick(data)}
                                className="scale-[3.5] cursor-pointer fill-hcol transition-all origin-center duration-200 ease-in-out hover:scale-[3.7] hover:brightness-125 active:scale-[3.5] active:brightness-50"
                            />
                        </div>
                    </Tooltip>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 justify-center">
                        {dotArr}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 auto-rows-[500px] p-5 gap-x-4 gap-y-8">
                {itemArr}
            </div>
        </>
    )
}

/* <RxDot className="text-hcol scale-125" />
                        <RxDot className="text-hcol scale-125" />
                        <RxDotFilled className="text-hcol scale-[1.75]" /> */
