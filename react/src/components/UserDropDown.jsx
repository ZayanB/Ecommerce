import React from "react";
import { Menu, Dropdown, notification } from "antd";
import { Link } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import "./UserDropDown.css";
import axios from "../api/axios";
import { useCart } from "../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";

const UserDropDown = () => {
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

    const menu = (
        <Menu>
            {token ? (
                <>
                    <Menu.Item className="dropdown-menu-item" key="checkout">
                        <Link to="/buyProduct/cart">Checkout</Link>
                    </Menu.Item>
                    <Menu.Item className="dropdown-menu-item" key="my-account">
                        <Link to="/MyAccount">My Account</Link>
                    </Menu.Item>
                </>
            ) : (
                <></>
            )}
            {token ? (
                <></>
            ) : (
                <>
                    <Menu.Item className="dropdown-menu-item" key="sign-in">
                        <Link to="/signIn">Sign In</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="create-account"
                        className="dropdown-menu-item"
                    >
                        <Link to="/createAcc">Create Account</Link>
                    </Menu.Item>
                </>
            )}

            {token ? (
                <Menu.Item key="sign-out" onClick={logout}>
                    <Link> Sign Out</Link>
                </Menu.Item>
            ) : (
                <></>
            )}
        </Menu>
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={["hover"]}
            overlayClassName="custom-dropdown"
            overlayStyle={{ width: "200px" }}
            placement="bottomLeft"
        >
            <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
            >
                <PiUserCircle />
            </a>
        </Dropdown>
    );
};

export default UserDropDown;
