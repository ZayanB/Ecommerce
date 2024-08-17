import React, { useState } from "react";
import "./NavbarList.css";
import { NavLink } from "react-router-dom";
import HomeDropDown from "./HomeDropDown";
import useScreenWidth from "./useScreenWidth";
import { PiPlus, PiMinus } from "react-icons/pi";

const NavbarList = ({ onClose }) => {
    const [hoverDrop, setHoverDrop] = useState(true);
    const onMouseOver = () => setHoverDrop(true);
    const onMouseLeave = () => setHoverDrop(false);
    const screenWidth = useScreenWidth();
    const [productMenu, setProductMenu] = useState(false);

    const onProductMenuClick = () => setProductMenu(!productMenu);

    const linkClass = ({ isActive }) => (isActive ? "nav-active" : "nav-non");

    const myData = {
        sort: "dateNewOld",
    };

    return (
        <>
            <div onMouseLeave={onMouseLeave}>
                <div
                    className={
                        screenWidth > 800
                            ? "ListContainer-desktop-list"
                            : "ListContainer-desktop-mobile"
                    }
                >
                    <div className="arrowDown">
                        <NavLink className={linkClass} to="/" onClick={onClose}>
                            HOME
                        </NavLink>
                    </div>
                    {screenWidth > 800 ? (
                        <div
                            onMouseOver={onMouseOver}
                            className={`arrowDown dropDown`}
                        >
                            <NavLink
                                className={linkClass}
                                to="/allProducts"
                                onClick={onClose}
                            >
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
                    ) : (
                        <div className="product-plus-container">
                            <div className="product-plus">
                                <div>
                                    <NavLink
                                        className={linkClass}
                                        to="/allProducts"
                                        onClick={onClose}
                                    >
                                        PRODUCT
                                    </NavLink>
                                </div>
                                {productMenu ? (
                                    <div>
                                        <PiMinus
                                            size={20}
                                            style={{
                                                transform: "translateY(1px)",
                                            }}
                                            onClick={onProductMenuClick}
                                        />
                                    </div>
                                ) : (
                                    <PiPlus
                                        size={20}
                                        style={{ transform: "translateY(1px)" }}
                                        onClick={onProductMenuClick}
                                    />
                                )}
                            </div>
                            <div
                                className={
                                    productMenu
                                        ? "show-product-menu"
                                        : "hide-display"
                                }
                            >
                                <ul className="product-plus-list-style">
                                    <NavLink
                                        className="product-plus-list-items"
                                        to="/allProducts"
                                        onClick={onClose}
                                    >
                                        <li>SHOP</li>
                                    </NavLink>
                                    <NavLink
                                        className="product-plus-list-items"
                                        onClick={onClose}
                                    >
                                        <li>OUR FAVORITES</li>
                                    </NavLink>

                                    <NavLink
                                        className="product-plus-list-items"
                                        to="/allProducts"
                                        state={myData}
                                        onClick={onClose}
                                    >
                                        <li>NEW ARRIVALS</li>
                                    </NavLink>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="arrowDown">
                        <NavLink
                            to="/#reviews-section"
                            className="nav-non"
                            onClick={onClose}
                        >
                            REVIEWS
                        </NavLink>
                    </div>
                    <div className="arrowDown" onClick={onClose}>
                        <NavLink className="nav-non">BLOG</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarList;
