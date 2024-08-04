import React from "react";
import { useState } from "react";
import HomeDropDown from "./HomeDropDown";
import { CiSearch } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaScaleBalanced } from "react-icons/fa6";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./NavBar.css";

const NavBar = () => {
    const [hoverDrop, setHoverDrop] = useState(false);

    const onMouseOver = () => setHoverDrop(true);

    const onMouseLeave = () => setHoverDrop(false);

    return (
        <nav className="MainContainerNavBar">
            <div>
                <h1 className="ShopName">
                    <a style={{ color: "white" }} href="/">
                        MOLEEZ
                    </a>
                </h1>
            </div>
            <div>
                <a href="/signIn">Sign In </a>
            </div>
            <div>
                <a href="/createAcc">Create Account</a>
            </div>

            <div className="ListContainer" onMouseLeave={onMouseLeave}>
                <ul className="uList">
                    <li
                        onMouseOver={onMouseOver}
                        className={`arrowDown dropDown`}
                    >
                        <a href="/">HOME</a>
                        {<MdKeyboardArrowDown />}
                        <div
                            onMouseOver={onMouseOver}
                            onMouseLeave={onMouseLeave}
                            className={`dropDownContent ${
                                hoverDrop ? "d-block" : ""
                            }`}
                            style={{ color: "black" }}
                        >
                            <HomeDropDown />
                        </div>
                    </li>

                    <li className="arrowDown">
                        SHOP {<MdKeyboardArrowDown />}
                    </li>
                    <li className="arrowDown">
                        <a href="/allProducts">PRODUCTS</a>
                        {<MdKeyboardArrowDown />}
                    </li>
                    <li className="arrowDown">
                        PAGES {<MdKeyboardArrowDown />}
                    </li>
                    <li className="arrowDown">
                        BLOG {<MdKeyboardArrowDown />}
                    </li>
                    <li className="arrowDown">BUY {<MdKeyboardArrowDown />}</li>
                </ul>
            </div>

            <div>
                <ul className="uList uCart">
                    <li>
                        <CiSearch className="CartHover" />
                    </li>
                    <li>
                        <IoPersonCircleSharp className="CartHover" />
                    </li>
                    <li>
                        <FaScaleBalanced className="CartHover" />
                    </li>
                    <li>
                        <RiShoppingCartLine className="CartHover" />
                    </li>
                    <li className="cartFont">Cart(0)</li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
