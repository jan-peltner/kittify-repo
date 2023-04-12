import { NavLink } from "react-router-dom"
import React, { Dispatch } from "react"
import Tooltip from "@mui/material/Tooltip"

import { BiShoppingBag } from "react-icons/bi"

import { IcartItem } from "../App"

type Props = {
    displayCart: boolean
    setDisplayCart: Dispatch<React.SetStateAction<boolean>>
    triggerCartAnimation: () => void
    cartItems: IcartItem[]
}

export default function Nav(props: Props) {
    const { displayCart, setDisplayCart, triggerCartAnimation, cartItems } =
        props

    function handleClick(): void {
        if (!displayCart) {
            setDisplayCart(true)
        } else {
            triggerCartAnimation()
        }
    }
    return (
        <nav className="flex justify-between items-center bg-gradient-to-b from-stroke to-bgcol p-5">
            <div
                id="logo"
                className="text-lg text-hcol font-cursive font-light  hover:text-grayhover transition-all ease-in-out"
            >
                <NavLink to="/">
                    <div
                        id="logo-container"
                        className="flex w-52 items-center gap-2"
                    >
                        <img
                            className="w-12 h-auto"
                            src="./logo_transp.png"
                            alt=""
                        />
                        <h1 className="text-2xl">Kittify.</h1>
                    </div>
                </NavLink>
            </div>
            <ul
                id="nav-left"
                className="flex gap-3 first-line:font-bold text-lg text-hcol sm:gap-7"
            >
                <li className="hover:text-grayhover transition-all ease-in-out">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-btncol hover:text-pinkhover"
                                : undefined
                        }
                    >
                        Store
                    </NavLink>
                </li>
                <li className="hover:text-grayhover transition-all ease-in-out">
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-btncol hover:text-pinkhover"
                                : undefined
                        }
                    >
                        About
                    </NavLink>
                </li>
            </ul>
            <div className="w-52 flex justify-end">
                <Tooltip title="Open Shopping Cart" placement="left" arrow>
                    <button className="w-10 h-10 flex items-center justify-center relative hover:brightness-125">
                        <BiShoppingBag
                            onClick={handleClick}
                            className="scale-[2] text-hcol"
                        />
                        {cartItems.length > 0 && (
                            <div className="absolute text-stroke font-bold text-sm top-0 right-0 z-10 before:absolute before:bg-pinkhover before:w-[20px] before:h-full before:-translate-x-[6px] before:rounded-full before:-z-10">
                                {cartItems.length}
                            </div>
                        )}
                    </button>
                </Tooltip>
            </div>
        </nav>
    )
}
