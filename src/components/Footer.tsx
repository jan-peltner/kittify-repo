import { Link } from "react-router-dom"
import Tooltip from "@mui/material/Tooltip"

import { AiFillTwitterCircle } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { AiFillYoutube } from "react-icons/ai"
import { AiFillInstagram } from "react-icons/ai"
import { AiFillGithub } from "react-icons/ai"
import { BsFillSuitHeartFill } from "react-icons/bs"

export default function Footer() {
    return (
        <footer className="relative flex flex-col items-center gap-6 py-10 border-t-[1px] border-btncol w-full mt-auto bg-stroke">
            <ul className="flex gap-12 text-hcol">
                <li className="hover:text-grayhover transition-all ease-in-out">
                    <Link to="/">Home</Link>
                </li>

                <li className="hover:text-grayhover transition-all ease-in-out">
                    <Link to="/store">Store</Link>
                </li>
                <li className="hover:text-grayhover transition-all ease-in-out">
                    <Link to="/about">About</Link>
                </li>
                <li className="hover:text-grayhover transition-all ease-in-out">
                    <a href="#">Experience</a>
                </li>
                <li className="hover:text-grayhover transition-all ease-in-out">
                    <a href="#">Jobs</a>
                </li>
                <li className="hover:text-grayhover transition-all ease-in-out">
                    <a href="#">Contact</a>
                </li>
            </ul>
            <ul className="flex gap-5 text-lg">
                <li>
                    <Tooltip title="Twitter" arrow>
                        <a href="#">
                            <AiFillTwitterCircle className="fill-hcol scale-[1.143] hover:fill-grayhover transition-all ease-in-out" />
                        </a>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title="Facebook" arrow>
                        <a href="#">
                            <BsFacebook className="fill-hcol hover:fill-grayhover transition-all ease-in-out" />
                        </a>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title="YouTube" arrow>
                        <a href="#">
                            <AiFillYoutube className="fill-hcol scale-x-[1.143] scale-y-[1.63] hover:fill-grayhover transition-all ease-in-out" />
                        </a>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title="Instagram" arrow>
                        <a href="#">
                            <AiFillInstagram className="fill-hcol scale-[1.281] hover:fill-grayhover transition-all ease-in-out" />
                        </a>
                    </Tooltip>
                </li>
            </ul>
            <p className="inline-flex gap-2 items-center text-hcol text-sm tracking-wide">
                Made with{" "}
                <BsFillSuitHeartFill className="fill-btncol scale-x-[1.286] scale-y-[1.5]" />{" "}
                by Pelly.
            </p>

            <a
                href="https://github.com/Pellyyy/kittify-repo"
                target="_blank"
                className="absolute right-5 bottom-10 w-50 bg-hcol hover:bg-grayhover transition-all ease-in-out text-stroke font-bold rounded-full p-3"
            >
                View on GitHub!
                <span className="pl-[0.33rem] float-right translate-y-1/4">
                    <AiFillGithub className="fill-stroke scale-x-[1.287] scale-y-[1.322]" />
                </span>
            </a>
        </footer>
    )
}
