import { useState } from "react"

import Tooltip from "@mui/material/Tooltip"
import { MdFullscreen } from "react-icons/md"
import { RiShoppingCartLine } from "react-icons/ri"

import { IcartItem, IitemData } from "../App"

type Props = {
    cartItems: IcartItem[]
    itemData: IitemData
    getItem: ({}: IitemData) => void
    addItem: ({}: IitemData) => void
    incQnt: ({}: IitemData) => void
    decQnt: ({}: IitemData) => void
}

export default function ItemCard(props: Props) {
    const { imgUrl, name, price } = props.itemData
    const { cartItems, getItem, addItem, incQnt, decQnt } = props
    const [isHovered, setIsHovered] = useState(false)

    const hoverImgOverlay = isHovered
        ? "bg-opacity-30 cursor-pointer"
        : "bg-opacity-0"

    const hoverImgIcon = isHovered ? "opacity-100 cursor-pointer" : "opacity-0"

    function isInCart(cartItems: IcartItem[], name: string): boolean {
        return cartItems.some((item) => item.itemData.name === name)
    }

    function displayQnt(cartItems: IcartItem[], name: string): number {
        let qnt = 0
        cartItems.forEach((item) => {
            if (item.itemData.name === name) {
                qnt = item.quantity ?? 1
            }
        })
        return qnt
    }

    return (
        <>
            <div className="item-container flex flex-col items-center shadow-stroke shadow-lg bg-main border-stroke border-2 rounded-lg hover:-translate-y-1 transition-transform duration-200 ease-out">
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => getItem({ imgUrl, name, price })}
                    className=" image-container relative w-11/12 h-4/6 border-stroke mt-3 rounded-lg hover:scale-[1.025] transition-transform duration-200 ease-in-out"
                >
                    <div
                        className={`absolute w-full h-full ${hoverImgOverlay} rounded-lg bg-bgcol transition-all duration-200 ease-out`}
                    ></div>
                    <div
                        className={`scale-[2.5] absolute ${hoverImgIcon} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stroke transition-all duration-200 ease-out`}
                    >
                        <MdFullscreen className="hover:scale-125 transition-transform duration-200 ease-out" />
                    </div>
                    <img
                        className="object-cover w-full h-full rounded-lg"
                        src={imgUrl}
                        alt=""
                    />
                </div>
                <div className="pt-3 flex gap-7 text-stroke">
                    <div className="">{name}</div>
                    <div className="font-bold">{price}$</div>
                </div>

                {!isInCart(cartItems, name) ? (
                    <button
                        className="flex justify-center items-center gap-3.5 w-3/4 bg-btncol hover:bg-pinkhover text-bgcol rounded-md my-3 p-3 font-bold transition-colors duration-200 ease-in-out"
                        onClick={() => addItem({ imgUrl, name, price })}
                    >
                        Add to Cart
                        <span>
                            <RiShoppingCartLine className="scale-150" />
                        </span>
                    </button>
                ) : (
                    <div className="flex my-5 gap-3.5 items-center font-bold">
                        <p className="font-normal">Quantity: </p>
                        <Tooltip
                            title="Decrease"
                            placement="bottom"
                            arrow={true}
                        >
                            <button
                                onClick={() => {
                                    decQnt(props.itemData)
                                }}
                                className="bg-btncol hover:bg-pinkhover text-bgcol rounded-lg px-2"
                            >
                                &#8722;
                            </button>
                        </Tooltip>
                        <p>{displayQnt(cartItems, name)}</p>
                        <Tooltip
                            title="Increase"
                            placement="bottom"
                            arrow={true}
                        >
                            <button
                                onClick={() => {
                                    incQnt(props.itemData)
                                }}
                                className="bg-btncol hover:bg-pinkhover text-bgcol rounded-lg px-2"
                            >
                                &#43;
                            </button>
                        </Tooltip>
                    </div>
                )}
            </div>
        </>
    )
}
