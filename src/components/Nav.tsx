import { NavLink } from "react-router-dom"
import { MdShoppingCart } from "react-icons/md"
import React, { Dispatch } from "react"

export default function Nav({
  setDisplayCart,
}: {
  setDisplayCart: Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <nav className="flex justify-between items-center shadow-stroke p-5 shadow-md">
      <ul
        id="nav-left"
        className="flex gap-3 first-line:font-bold text-lg text-hcol sm:gap-7"
      >
        <li className="hover:text-grayhover transition-all ease-in-out">
          <NavLink
            to="/store"
            className={({ isActive }) =>
              isActive ? "text-btncol hover:text-pinkhover" : undefined
            }
          >
            Store
          </NavLink>
        </li>
        <li className="hover:text-grayhover transition-all ease-in-out">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-btncol hover:text-pinkhover" : undefined
            }
          >
            About
          </NavLink>
        </li>
      </ul>
      <div
        id="logo"
        className="text-lg text-hcol font-cursive font-light hover:text-grayhover transition-all ease-in-out"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-btncol hover:text-pinkhover " : undefined
          }
        >
          <div id="logo-container" className="scale-150 flex gap-2 px-5">
            <svg
              fill="#eebbc3"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.5 11c0 .552-.449 1-1 1-.551 0-1-.448-1-1s.449-1 1-1c.551 0 1 .448 1 1zm9 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm3.639 4.526l-3.471 1c-.635.187-.913-.778-.277-.961l3.47-1c.637-.185.911.779.278.961zm-1.477 3.446l-2.284-.728c-.63-.2-.33-1.148.303-.953l2.284.728c.637.203.316 1.147-.303.953zm-5.162-7.972c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm.956 7.351c-.548 1.214-2.471 1.831-3.456.543-.987 1.289-2.91.67-3.456-.543-.271-.601.639-1.015.912-.411.336.747 2.033 1.302 2.044-.796v-.505c-.615-.218-1.062-.798-1.062-1.313 0-.646.7-.935 1.562-.935.861 0 1.562.289 1.562.935 0 .515-.447 1.094-1.062 1.313v.505c.009 2.119 1.713 1.532 2.044.796.27-.602 1.184-.192.912.411zm-9.956-7.351c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm1.123 7.244l-2.285.728c-.625.192-.937-.751-.304-.953l2.285-.728c.636-.197.93.753.304.953zm-3.484-3.679l3.47 1c.638.184.356 1.148-.277.961l-3.471-1c-.638-.183-.354-1.147.278-.961zm15.589-14.565c-2.082 1.814-3.082 3.044-4.546 5.261-1.213-.298-3.206-.293-4.364 0-1.401-2.11-2.405-3.344-4.546-5.261-3.068 4.042-5.272 8.939-5.272 13.565 0 5.759 3.397 10.435 12 10.435s12-4.676 12-10.435c0-4.578-2.207-9.502-5.272-13.565z" />
            </svg>
            <h1>Kittify.</h1>
          </div>
        </NavLink>
      </div>
      <button>
        <MdShoppingCart
          onClick={() => setDisplayCart((prev) => !prev)}
          className="scale-150 text-btncol"
        />
      </button>
    </nav>
  )
}