import React from "react";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import "./UserDropDown.css";

const UserDropDown = () => {
    const menu = (
        <Menu>
            <Menu.Item className="dropdown-menu-item" key="checkout">
                <Link to="/buyProduct/cart">Checkout</Link>
            </Menu.Item>
            <Menu.Item className="dropdown-menu-item" key="my-account">
                <Link to="/MyAccount">My Account</Link>
            </Menu.Item>
            <Menu.Item className="dropdown-menu-item" key="sign-in">
                <Link to="/signIn">Sign In</Link>
            </Menu.Item>
            <Menu.Item key="create-account">
                <Link to="/createAcc">Create Account</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={["hover"]}
            overlayClassName="custom-dropdown" // Custom class for styling
            overlayStyle={{ width: "200px" }} // Direct inline styles
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
