import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import CartPanel from "./CartPanel";
import useScreenWidth from "./useScreenWidth";
import UserDropDown from "./UserDropDown";
import NavbarList from "./NavbarList";
import NavListPanel from "./NavListPanel";
import CompareProducts from "./CompareProducts";
import Search from "./Search";

const NavBar = () => {
    // const linkClass = ({ isActive }) => (isActive ? "nav-active" : "nav-non");

    const screenWidth = useScreenWidth();
    const mainContainerClass =
        screenWidth < 986
            ? "MainContainerNavBar-mobile-nav"
            : "MainContainerNavBar-desktop-nav";
    const listContainerClass =
        screenWidth < 800
            ? "ListContainer-mobile-list"
            : "ListContainer-desktop-list";
    const ulClass = screenWidth < 800 ? "mobile-ul" : "desktop-ul";
    const arrowDownClass = screenWidth < 800 ? "mobile-arrow" : "desktop-arrow";
    const ShopName = screenWidth < 800 ? "ShopName-mobile" : "ShopName-desktop";
    return (
        <nav className={mainContainerClass}>
            <div
                className={screenWidth > 986 ? "hide-display" : "show-nav-list"}
            >
                <div>
                    <NavListPanel />
                </div>
                <div>
                    <Search />
                </div>
            </div>
            <div>
                <h1
                    className={ShopName}
                    style={{
                        transform: screenWidth > 800 ? "" : "translateX(5px)",
                    }}
                >
                    <NavLink
                        style={{
                            color: "black",
                        }}
                        to="/"
                    >
                        ZYN
                        {/* <img
                            src="https://files.oaiusercontent.com/file-UVu7njKHZ7q90GQdZAHKNRPg?se=2024-08-20T09%3A19%3A31Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D85c02529-1cca-4abd-b0e0-6ac7de89e3a7.webp&sig=QA%2B%2B%2BnGHqZmC3zb5%2BKaJyihZbzZCEa41IpnkuvSRdmc%3D"
                            alt="rgr"
                            style={{ transform: "scale(0.5)" }}
                        /> */}
                    </NavLink>
                </h1>
            </div>
            <div
                className={
                    screenWidth < 986 ? "hide-display" : "center-nav-list"
                }
            >
                <NavbarList />
            </div>

            <div>
                <div className="navbar-addToCart">
                    {screenWidth > 800 ? (
                        <div>
                            <Search />
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className={screenWidth > 986 ? "" : "nav-user-hide"}>
                        <UserDropDown />
                    </div>
                    <div>
                        <CompareProducts />
                    </div>
                    <div
                        style={{
                            transform:
                                screenWidth < 986 ? "translateY(5px)" : "",
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
