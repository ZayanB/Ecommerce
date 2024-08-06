import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { RiShoppingCartLine } from "react-icons/ri";
import axios from "../api/axios";
import "./CartPanel.css";

const CartPanel = () => {
    const [visible, setVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                console.error("No access token found");
                return;
            }

            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/getCart",
                    {
                        key: "value",
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCartItems(response.data.cart_items);
                console.log(cartItems);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [cartItems]);

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
                <div className="cart-main-container">
                    {cartItems.map((item, index) => {
                        // <li key={index}>
                        //     {item.product_name} - {item.product_price}-
                        //     {item.product_image[0].image_url}
                        // </li>
                        return (
                            <div className="cart-product">
                                <div
                                    key={index}
                                    style={{ width: "30%", height: "30%" }}
                                >
                                    <img
                                        src={item.product_image[0].image_url}
                                        alt="img1"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <div className="product">
                                    <div>{item.product_name}</div>
                                    <div>$  {item.product_price}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Drawer>
        </div>
    );
};

export default CartPanel;
