import { MdClose } from "react-icons/md"

import Tooltip from "@mui/material/Tooltip"

import { IcartItem } from "../App"
import { IitemData } from "../App"
import { Dispatch, useState } from "react"

type Props = {
    cartItem: IcartItem
    removeItem: (itemData: IitemData) => void
    getItem: ({}: IitemData) => void
    setDisplayCart: Dispatch<React.SetStateAction<boolean>>
}

export default function CartItem(props: Props) {
    const { name, imgUrl, price } = props.cartItem.itemData
    const { removeItem, getItem, setDisplayCart } = props

    const [isHovered, setIsHovered] = useState(false)

    const hoverImgOverlay = isHovered
        ? "bg-opacity-30 cursor-pointer"
        : "bg-opacity-0"

    const hoverImgIcon = isHovered ? "opacity-100 cursor-pointer" : "opacity-0"

    return (
        <>
            <div className="w-3/4 h-3/4 ">
                <img
                    onClick={() => {
                        getItem({ imgUrl, name, price })
                    }}
                    src={imgUrl}
                    alt=""
                    className="object-cover border-stroke rounded-lg"
                    id="close"
                />
            </div>
            <div className="relative">
                {name} <br /> <span className="font-bold">{price}$</span>
                <Tooltip
                    title="Remove Item"
                    placement="bottom-start"
                    arrow={true}
                >
                    <div className="absolute top-0 right-0 -translate-x-1/2 cursor-pointer text-stroke font-bold hover:text-strokehover transition-colors duration-200 ease-in-out">
                        <MdClose
                            onClick={() => removeItem(props.cartItem.itemData)}
                        />
                    </div>
                </Tooltip>
            </div>
        </>
    )
}
