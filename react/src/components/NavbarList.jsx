import React, { useState } from "react";
import "./NavbarList.css";
import { NavLink } from "react-router-dom";
import HomeDropDown from "./HomeDropDown";
import useScreenWidth from "./useScreenWidth";
import { PiPlus, PiMinus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useCart } from "../../Contexts/CartContext";
import { notification } from "antd";
import { Link } from "react-router-dom";

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

    const { dispatch } = useCart();
    const navigate = useNavigate();

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const token = localStorage.getItem("access_token");
    const logout = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("No access token found");

            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            clearCart();
            localStorage.removeItem("access_token");

            notification.success({
                message: "Success",
                description: "Signed Out!",
                placement: "topRight",
                duration: 2,
            });
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
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
                    <span className={token ? "" : "hide-display"}>
                        <div
                            className={
                                screenWidth < 800 ? "arrowDown" : "hide-display"
                            }
                            onClick={onClose}
                        >
                            <NavLink className="nav-non" to="/buyProduct/cart">
                                CHECKOUT
                            </NavLink>
                        </div>
                    </span>
                    <span className={token ? "" : "hide-display"}>
                        <div
                            className={
                                screenWidth < 800 ? "arrowDown" : "hide-display"
                            }
                            onClick={onClose}
                        >
                            <NavLink to="/MyAccount" className="nav-non">
                                MY ACCOUNT
                            </NavLink>
                        </div>
                    </span>
                    <span className={!token ? "" : "hide-display"}>
                        <div
                            className={
                                screenWidth < 800 ? "arrowDown" : "hide-display"
                            }
                            onClick={onClose}
                        >
                            <NavLink to="/signIn" className="nav-non">
                                SIGN IN
                            </NavLink>
                        </div>
                    </span>
                    <span className={!token ? "" : "hide-display"}>
                        <div
                            className={
                                screenWidth < 800 ? "arrowDown" : "hide-display"
                            }
                            onClick={onClose}
                        >
                            <NavLink to="/createAcc" className="nav-non">
                                CREATE ACCOUNT
                            </NavLink>
                        </div>
                    </span>
                    <span className={token ? "" : "hide-display"}>
                        <div
                            className={
                                screenWidth < 800 ? "arrowDown" : "hide-display"
                            }
                            onClick={onClose}
                        >
                            <NavLink className="nav-non" onClick={logout}>
                                SIGN OUT
                            </NavLink>
                        </div>
                    </span>
                </div>
            </div>
        </>
    );
};

export default NavbarList;
