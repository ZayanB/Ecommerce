import React from "react";
import { Drawer, Button, List } from "antd";
import { RiShoppingCartLine } from "react-icons/ri";
import { useState } from "react";
// import "antd/dist/antd.css";

const CartPanel = () => {
    const [visible, setVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                <RiShoppingCartLine />
            </Button>
            <Drawer
                title="Shopping Cart"
                placement="right"
                onClose={onClose}
                visible={visible}
            >
                <p>dhsdhiou</p>
                <p>dhsdhiou</p>
                <p>dhsdhiou</p>
            </Drawer>
        </div>
    );
};

export default CartPanel;
