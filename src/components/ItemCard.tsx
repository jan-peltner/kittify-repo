import { MdFullscreen, MdOutlineAddShoppingCart } from "react-icons/md"
import { useState } from "react"
import { RiShoppingCartLine } from "react-icons/ri"
import { itemData } from "../data/items"

export default function ItemCard(
    props: itemData & { getItem: (obj: itemData) => void }
) {
    const [isHovered, setIsHovered] = useState(false)

    const hoverImgOverlay = isHovered
        ? "bg-opacity-30 cursor-pointer"
        : "bg-opacity-0"

    const hoverImgIcon = isHovered ? "opacity-100 cursor-pointer" : "opacity-0"

    return (
        <>
            <div className="item-container flex flex-col items-center shadow-stroke shadow-lg bg-main border-stroke border-2 rounded-md hover:-translate-y-1 transition-transform duration-200 ease-out">
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => props.getItem(props)}
                    className=" image-container relative w-11/12 h-4/6 border-stroke border-2 mt-3 rounded-md hover:scale-[1.025] transition-transform duration-200 ease-in-out"
                >
                    <div
                        className={`absolute w-full h-full ${hoverImgOverlay} bg-bgcol transition-all duration-200 ease-out`}
                    ></div>
                    <div
                        className={`scale-[2.5] absolute ${hoverImgIcon} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stroke transition-all duration-200 ease-out`}
                    >
                        <MdFullscreen className="hover:scale-125 transition-transform duration-200 ease-out" />
                    </div>
                    <img
                        className="object-cover w-full h-full"
                        src={props.imgUrl}
                        alt=""
                    />
                </div>
                <div className="pt-3 flex gap-7 text-stroke">
                    <div className="">{props.name}</div>
                    <div className="font-bold">{props.price}$</div>
                </div>

                <button className="flex justify-center items-center gap-3.5 w-3/4 bg-btncol hover:bg-pinkhover text-bgcol rounded-md my-3 p-3 font-bold transition-colors duration-200 ease-in-out">
                    Add to Cart{" "}
                    <span>
                        <RiShoppingCartLine className="scale-150" />
                    </span>
                </button>
            </div>
        </>
    )
}
