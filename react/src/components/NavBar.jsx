import React from "react";
import { useState } from "react";
import HomeDropDown from "./HomeDropDown";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import CartPanel from "./CartPanel";
import useScreenWidth from "./useScreenWidth";
import { PiScales } from "react-icons/pi";
import UserDropDown from "./UserDropDown";

const NavBar = () => {
    const [hoverDrop, setHoverDrop] = useState(true);
    const onMouseOver = () => setHoverDrop(true);
    const onMouseLeave = () => setHoverDrop(false);

    const linkClass = ({ isActive }) => (isActive ? "nav-active" : "nav-non");

    const screenWidth = useScreenWidth();
    const mainContainerClass =
        screenWidth < 768
            ? "MainContainerNavBar-mobile-nav"
            : "MainContainerNavBar-desktop-nav";
    const listContainerClass =
        screenWidth < 768
            ? "ListContainer-mobile-list"
            : "ListContainer-desktop-list";
    const ulClass = screenWidth < 768 ? "mobile-ul" : "desktop-ul";
    const arrowDownClass = screenWidth < 768 ? "mobile-arrow" : "desktop-arrow";
    const ShopName = screenWidth < 768 ? "ShopName-mobile" : "ShopName-desktop";
    return (
        <nav className={mainContainerClass}>
            <div>
                <h1 className={ShopName}>
                    <NavLink
                        style={{ color: "black", marginLeft: "1rem" }}
                        to="/"
                    >
                        MOLEEZ
                    </NavLink>
                </h1>
            </div>
            <div onMouseLeave={onMouseLeave}>
                <div className={listContainerClass}>
                    <div className="arrowDown">
                        <NavLink className={linkClass} to="/">
                            HOME
                        </NavLink>
                    </div>

                    <div
                        onMouseOver={onMouseOver}
                        className={`arrowDown dropDown`}
                    >
                        <NavLink className={linkClass} to="/allProducts">
                            PRODUCT
                        </NavLink>
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
                    </div>
                    <div className="arrowDown">
                        <NavLink to="/#reviews-section" className="nav-non">
                            REVIEWS
                        </NavLink>
                    </div>
                    <div className="arrowDown">
                        <NavLink className="nav-non">BLOG</NavLink>
                    </div>
                </div>
            </div>

            <div>
                <div className="navbar-addToCart">
                    <UserDropDown />
                    <div>
                        <PiScales className="CartHover" />
                    </div>
                    <div>
                        <CartPanel />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
