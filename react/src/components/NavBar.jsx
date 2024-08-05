import React from "react";
import { useState } from "react";
import HomeDropDown from "./HomeDropDown";
import { CiSearch } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaScaleBalanced } from "react-icons/fa6";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { isAfter } from "date-fns";

const NavBar = () => {
    const [hoverDrop, setHoverDrop] = useState(false);
    const onMouseOver = () => setHoverDrop(true);
    const onMouseLeave = () => setHoverDrop(false);

    const [signDrop, setSignDrop] = useState(false);
    const onSignOver = () => setSignDrop(true);
    const onSignLeave = () => setSignDrop(false);

    const linkClass = ({ isActive }) => (isActive ? "nav-active" : "nav-non");

    return (
        <nav className="MainContainerNavBar">
            <div>
                <h1 className="ShopName">
                    <NavLink
                        style={{ color: "black", marginLeft: "1rem" }}
                        to="/"
                    >
                        MOLEEZ
                    </NavLink>
                </h1>
            </div>
            <div onMouseLeave={onMouseLeave}>
                <div className="ListContainer">
                    <ul className="uList">
                        <li
                            onMouseOver={onMouseOver}
                            className={`arrowDown dropDown`}
                        >
                            <NavLink
                                className={linkClass}
                                to="/"
                            >
                                HOME
                            </NavLink>
                            {<MdKeyboardArrowDown />}
                            <div
                                onMouseOver={onMouseOver}
                                onMouseLeave={onMouseLeave}
                                className={`dropDownContent ${
                                    hoverDrop ? "d-block" : ""
                                }`}
                                style={{ color: "black" }}
                            >
                                <HomeDropDown
                                    onMouseOver={onMouseOver}
                                    onMouseLeave={onMouseLeave}
                                />
                            </div>
                        </li>

                        <li className="arrowDown">
                            SHOP {<MdKeyboardArrowDown />}
                        </li>
                        <li className="arrowDown">
                            <NavLink
                                className={linkClass}
                                to="/allProducts"
                            >
                                PRODUCTS
                            </NavLink>
                            {<MdKeyboardArrowDown />}
                        </li>
                        <li className="arrowDown">
                            PAGES {<MdKeyboardArrowDown />}
                        </li>
                        <li className="arrowDown">
                            BLOG {<MdKeyboardArrowDown />}
                        </li>
                        <li className="arrowDown">
                            BUY {<MdKeyboardArrowDown />}
                        </li>
                    </ul>
                </div>
            </div>

            <div onMouseLeave={onSignLeave}>
                <ul className="uList uCart">
                    <li>
                        <CiSearch className="CartHover" />
                    </li>
                    <li onMouseOver={onSignOver} className="dropdown">
                        <IoPersonCircleSharp className="CartHover" />
                        <div
                            onMouseOver={onSignOver}
                            onMouseLeave={onSignLeave}
                            className={`dropdown-content ${
                                signDrop ? "d-block" : ""
                            }`}
                        >
                            <ul>
                                <li>My Wishlist</li>
                                <li>Checkout</li>
                                <li>
                                    <NavLink
                                        className="signIn-drop"
                                        to="/signIn"
                                    >
                                        Sign In
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="signIn-drop"
                                        to="/createAcc"
                                    >
                                        Create Account
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
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
