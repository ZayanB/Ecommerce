import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { PiList } from "react-icons/pi";
import NavbarList from "./NavbarList";
const NavListPanel = () => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <div>
            <Button
                type="primary"
                onClick={showDrawer}
                ghost="true"
                size="large"
                style={{ color: "black" }}
                className="cart-button"
            >
                <PiList size={32} style={{ transform: "translateY(6px)" }} />
            </Button>
            <Drawer
                // title=""
                placement="left"
                onClose={onClose}
                visible={visible}
            >
                <NavbarList onClose={onClose} />
            </Drawer>
        </div>
    );
};

export default NavListPanel;
