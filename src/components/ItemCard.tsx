import { useState } from "react"
import { useIsInCart } from "../hooks/useIsInCart"

import Tooltip from "@mui/material/Tooltip"
import { MdFullscreen } from "react-icons/md"
import { BsPlusLg, BsFillTrashFill } from "react-icons/bs"
import { HiMinus } from "react-icons/hi"

import { IcartItem, IitemData } from "../App"

type Props = {
    cartItems: IcartItem[]
    itemData: IitemData
    getItem: ({}: IitemData) => void
    addItem: ({}: IitemData) => void
    getQnt: (cartItems: IcartItem[], name: string) => number
    incQnt: ({}: IitemData) => void
    decQnt: ({}: IitemData) => void
}

export default function ItemCard(props: Props) {
    const { imgUrl, name, price } = props.itemData
    const { cartItems, getItem, addItem, getQnt, incQnt, decQnt } = props

    const [isHovered, setIsHovered] = useState(false)

    const quantClass = !useIsInCart(cartItems, name)
        ? "hover:scale-110 w-12"
        : "w-36"
    const plusTooltip = !useIsInCart(cartItems, name)
        ? "Add to Cart"
        : "Increase Quantity"
    const minusTooltip =
        getQnt(cartItems, name) > 1 ? "Decrease Quantity" : "Remove Item"

    const hoverImgOverlay = isHovered
        ? "bg-opacity-30 cursor-pointer"
        : "bg-opacity-0"

    const hoverImgIcon = isHovered ? "opacity-100 cursor-pointer" : "opacity-0"

    function handleAdd(): void {
        useIsInCart(cartItems, name)
            ? incQnt(props.itemData)
            : addItem(props.itemData)
    }

    const img = new Image()
    img.src = imgUrl

    return (
        <>
            <div className="target item-container flex flex-col justify-between items-center">
                <div className="w-full h-full hover:-translate-y-1 shadow-stroke shadow-lg bg-main rounded-xl transition-transform duration-200 ease-out">
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => getItem({ imgUrl, name, price })}
                        className="image-container relative w-full h-[90%] overflow-hidden origin-bottom scale-y-[1.005] transition-transform duration-200 ease-in-out"
                    >
                        <div
                            className={`absolute w-full h-full ${hoverImgOverlay} bg-bgcol rounded-t-xl transition-all duration-200 ease-out`}
                        ></div>
                        <div
                            className={`scale-[2.5] absolute ${hoverImgIcon} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stroke transition-all duration-200 ease-out`}
                        >
                            <Tooltip
                                title="Fullscreen"
                                placement="bottom"
                                arrow
                            >
                                <div className="hover:scale-125 transition-transform duration-200 ease-out">
                                    <MdFullscreen />
                                </div>
                            </Tooltip>
                        </div>
                        <img
                            className="object-cover w-full h-full rounded-t-xl"
                            src={imgUrl}
                            alt=""
                        />

                        <div
                            className={`${quantClass} select-none flex justify-around items-center h-12 bg-hcol drop-shadow-sm cursor-pointer absolute bottom-5 right-5 rounded-xl transition-all origin-right duration-300 ease-out`}
                        >
                            {useIsInCart(cartItems, name) && (
                                <Tooltip
                                    title={minusTooltip}
                                    placement="bottom"
                                    arrow
                                >
                                    <div>
                                        {getQnt(cartItems, name) > 1 ? (
                                            <HiMinus
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    decQnt(props.itemData)
                                                }}
                                                className=" fill-pinkhover scale-x-[2.14] scale-y-[2] hover:brightness-125 transition-all ease-in-out duration-200"
                                            />
                                        ) : (
                                            <BsFillTrashFill
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    decQnt(props.itemData)
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
                            <Tooltip
                                title={plusTooltip}
                                placement="bottom"
                                arrow
                            >
                                <div>
                                    <BsPlusLg
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleAdd()
                                        }}
                                        className=" fill-pinkhover scale-150 hover:brightness-125 transition-all ease-in-out duration-200"
                                    />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="pb-1 px-7 w-full flex justify-between items-center text-stroke">
                        <div className="text-xl">{name}</div>
                        <div className="font-bold text-2xl">{price}$</div>
                    </div>
                </div>
            </div>
        </>
    )
}
