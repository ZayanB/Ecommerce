import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { RiShoppingCartLine } from "react-icons/ri";

const CartDrawer = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
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
                <p>Cart Item 1</p>
                <p>Cart Item 2</p>
                <p>Cart Item 3</p>
                {/* Add your cart items here */}
            </Drawer>
        </div>
    );
};

export default CartDrawer;
