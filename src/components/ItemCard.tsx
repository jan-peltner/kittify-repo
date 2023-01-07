import { useState } from "react"

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
    incQnt: ({}: IitemData) => void
    decQnt: ({}: IitemData) => void
}

export default function ItemCard(props: Props) {
    const { imgUrl, name, price } = props.itemData
    const { cartItems, getItem, addItem, incQnt, decQnt } = props
    const [isHovered, setIsHovered] = useState(false)

    const quantClass = !isInCart(cartItems, name)
        ? "hover:scale-110 w-12"
        : "w-36"
    const plusTooltip = !isInCart(cartItems, name)
        ? "Add to Cart"
        : "Increase Quantity"
    const minusTooltip =
        getQnt(cartItems, name) > 1 ? "Decrease Quantity" : "Remove Item"

    const hoverImgOverlay = isHovered
        ? "bg-opacity-30 cursor-pointer"
        : "bg-opacity-0"

    const hoverImgIcon = isHovered ? "opacity-100 cursor-pointer" : "opacity-0"

    function isInCart(cartItems: IcartItem[], name: string): boolean {
        return cartItems.some((item) => item.itemData.name === name)
    }

    function getQnt(cartItems: IcartItem[], name: string): number {
        let qnt = 0
        cartItems.forEach((item) => {
            if (item.itemData.name === name) {
                qnt = item.quantity ?? 1
            }
        })
        return qnt
    }

    function handleAdd(): void {
        isInCart(cartItems, name)
            ? incQnt(props.itemData)
            : addItem(props.itemData)
    }

    return (
        <>
            <div className="item-container flex flex-col justify-between items-center shadow-stroke shadow-lg bg-main rounded-xl hover:-translate-y-1 transition-transform duration-200 ease-out">
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
                        <Tooltip title="Fullscreen" placement="bottom" arrow>
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
                        {isInCart(cartItems, name) && (
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
                        {isInCart(cartItems, name) && (
                            <p className="font-bold text-stroke text-2xl">
                                {getQnt(cartItems, name)}
                            </p>
                        )}
                        <Tooltip title={plusTooltip} placement="bottom" arrow>
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
        </>
    )
}

/* {!isInCart(cartItems, name) ? (
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
                    </div> */
