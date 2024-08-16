import React, { useState } from "react";
import "./NavbarList.css";
import { NavLink } from "react-router-dom";
import HomeDropDown from "./HomeDropDown";
import useScreenWidth from "./useScreenWidth";

const NavbarList = ({ onClose }) => {
    const [hoverDrop, setHoverDrop] = useState(true);
    const onMouseOver = () => setHoverDrop(true);
    const onMouseLeave = () => setHoverDrop(false);
    const screenWidth = useScreenWidth();

    const linkClass = ({ isActive }) => (isActive ? "nav-active" : "nav-non");

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
