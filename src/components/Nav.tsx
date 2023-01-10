import { NavLink } from "react-router-dom"
import React, { Dispatch } from "react"
import Tooltip from "@mui/material/Tooltip"

import { MdShoppingCart } from "react-icons/md"

type Props = {
    displayCart: boolean
    setDisplayCart: Dispatch<React.SetStateAction<boolean>>
    triggerCartAnimation: () => void
}

export default function Nav(props: Props) {
    const { displayCart, setDisplayCart, triggerCartAnimation } = props

    function handleClick(): void {
        if (!displayCart) {
            setDisplayCart(true)
        } else {
            triggerCartAnimation()
        }
    }
    return (
        <nav className="flex justify-between items-center bg-stroke border-b-btncol border-b-[1px] p-5">
            <div
                id="logo"
                className="text-lg text-hcol font-cursive font-light hover:text-grayhover transition-all ease-in-out"
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
                        Home
                    </NavLink>
                </li>
                <li className="hover:text-grayhover transition-all ease-in-out">
                    <NavLink
                        to="/store"
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
                    <button>
                        <MdShoppingCart
                            onClick={handleClick}
                            className="scale-150 text-btncol"
                        />
                    </button>
                </Tooltip>
            </div>
        </nav>
    )
}
