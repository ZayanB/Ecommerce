import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import CartPanel from "./CartPanel";
import useScreenWidth from "./useScreenWidth";
import { PiScales, PiList } from "react-icons/pi";
import UserDropDown from "./UserDropDown";
import NavbarList from "./NavbarList";
import NavListPanel from "./NavListPanel";

const NavBar = () => {
    // const linkClass = ({ isActive }) => (isActive ? "nav-active" : "nav-non");

    const screenWidth = useScreenWidth();
    const mainContainerClass =
        screenWidth < 768
            ? "MainContainerNavBar-mobile-nav"
            : "MainContainerNavBar-desktop-nav";
    const listContainerClass =
        screenWidth < 900
            ? "ListContainer-mobile-list"
            : "ListContainer-desktop-list";
    const ulClass = screenWidth < 768 ? "mobile-ul" : "desktop-ul";
    const arrowDownClass = screenWidth < 768 ? "mobile-arrow" : "desktop-arrow";
    const ShopName = screenWidth < 768 ? "ShopName-mobile" : "ShopName-desktop";
    return (
        <nav className={mainContainerClass}>
            <div
                className={screenWidth > 800 ? "hide-display" : "show-nav-list"}
            >
                {/* <PiList size={32} style={{ transform: "translateY(6px)" }} /> */}
                <NavListPanel />
            </div>
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
            <div className={screenWidth < 800 ? "hide-display" : ""}>
                <NavbarList />
            </div>

            <div>
                <div className="navbar-addToCart">
                    <div className={screenWidth > 800 ? "" : "nav-user-hide"}>
                        <UserDropDown />
                    </div>
                    <div>
                        <PiScales
                            className={
                                screenWidth > 800
                                    ? "CartHover"
                                    : "nav-user-hide"
                            }
                        />
                    </div>
                    <div
                        style={{
                            transform:
                                screenWidth < 800 ? "translateY(5px)" : "",
                        }}
                    >
                        <CartPanel />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
