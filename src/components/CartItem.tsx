import Tooltip from "@mui/material/Tooltip"

import { IcartItem } from "../App"
import { IitemData } from "../App"
import { Dispatch } from "react"
import { useIsInCart } from "../hooks/useIsInCart"

import { BsPlusLg, BsFillTrashFill } from "react-icons/bs"
import { HiMinus } from "react-icons/hi"

type Props = {
    cartItem: IcartItem
    cartItems: IcartItem[]
    getItem: ({}: IitemData) => void
    setDisplayCart: Dispatch<React.SetStateAction<boolean>>
    getQnt: (cartItems: IcartItem[], name: string) => number
    incQnt: ({}: IitemData) => void
    decQnt: ({}: IitemData) => void
}

export default function CartItem(props: Props) {
    const { name, imgUrl, price } = props.cartItem.itemData
    const { cartItems, getItem, getQnt, incQnt, decQnt } = props

    const minusTooltip =
        getQnt(cartItems, name) > 1 ? "Decrease Quantity" : "Remove Item"

    const borderClass = isLastInCart(name, cartItems)
        ? "border-double border-b-[3px] border-opacity-100"
        : "border-dotted border-b-[1px]"

    function isLastInCart(name: string, cartItems: IcartItem[]): boolean {
        let isLast = false
        cartItems.forEach((item, idx) => {
            if (item.itemData.name === name && idx === cartItems.length - 1) {
                isLast = true
            }
        })

        return isLast
    }

    return (
        <div
            className={`${borderClass} flex justify-center w-3/4 pb-3 gap-10 border-b-stroke border-opacity-50`}
        >
            <div className="w-2/5">
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
            <div className="flex flex-col justify-between items-start gap-1 pb-3">
                <div className="flex flex-col gap-1">
                    <div>{name}</div>
                    <div className="font-bold">{price}$</div>
                </div>
                <div
                    className={
                        "flex w-32 select-none justify-around items-center h-12 scale-75  bg-hcol drop-shadow-sm cursor-pointer rounded-xl transition-all duration-300 ease-out"
                    }
                >
                    {useIsInCart(cartItems, name) && (
                        <Tooltip title={minusTooltip} placement="bottom" arrow>
                            <div>
                                {getQnt(cartItems, name) > 1 ? (
                                    <HiMinus
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            decQnt(props.cartItem.itemData)
                                        }}
                                        className=" fill-pinkhover scale-x-[2.14] scale-y-[2] hover:brightness-125 transition-all ease-in-out duration-200"
                                    />
                                ) : (
                                    <BsFillTrashFill
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            decQnt(props.cartItem.itemData)
                                        }}
                                        className=" fill-pinkhover scale-x-[1.85] scale-y-[1.6] hover:brightness-125 transition-all ease-in-out duration-200"
                                    />
                                )}
                            </div>
                        </Tooltip>
                    )}
                    {useIsInCart(cartItems, name) && (
                        <p className="font-bold text-stroke text-2xl">
                            {getQnt(cartItems, name)}
                        </p>
                    )}
                    <Tooltip title="Increase Quantity" placement="bottom" arrow>
                        <div>
                            <BsPlusLg
                                onClick={(e) => {
                                    e.stopPropagation()
                                    incQnt(props.cartItem.itemData)
                                }}
                                className=" fill-pinkhover scale-150 hover:brightness-125 transition-all ease-in-out duration-200"
                            />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
