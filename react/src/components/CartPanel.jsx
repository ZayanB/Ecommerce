import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { RiShoppingCartLine } from "react-icons/ri";
import { PiXCircle } from "react-icons/pi";
import axios from "../api/axios";
import "./CartPanel.css";

const CartPanel = () => {
    const [visible, setVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    // const [cartItem, setCartItem] = useState(null);

    const handleRemoveItem = async (itemId) => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/removeCartItem",
                { productid: itemId },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Handle successful response
                console.log("Item removed successfully:", response.data);
                // Update your cartItems state here if needed
            } else {
                console.error("Failed to remove item:", response.data);
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

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
                setTotalCartItems(response.data.cart_items_count);
                setTotalCartPrice(response.data.cart_total_price);
                // setItemId(response.data.cart_item_id);

                // console.log(cartItems);
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
            <Button
                type="primary"
                onClick={showDrawer}
                ghost="true"
                size="large"
                style={{ color: "black" }}
                className="cart-button"
            >
                <RiShoppingCartLine size={25} className="cart-hover" />
                <div>Cart: {totalCartItems}</div>
            </Button>
            <Drawer
                title={`My Cart (${totalCartItems})`}
                placement="right"
                onClose={onClose}
                visible={visible}
            >
                <div className="cart-main-container">
                    <div className="cart-product-list">
                        {cartItems.map((item, index) => {
                            return (
                                <div className="cart-product">
                                    <div
                                        key={index}
                                        style={{ width: "30%", height: "30%" }}
                                    >
                                        <img
                                            src={
                                                item.product_image[0].image_url
                                            }
                                            alt="img1"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </div>
                                    <div className="product">
                                        <div>{item.product_name}</div>
                                        <div className="product-price-quantity">
                                            <div>Qty: {item.quantity}</div>
                                            <div>$ {item.product_price}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <PiXCircle
                                            size={25}
                                            onClick={() =>
                                                handleRemoveItem(
                                                    item.cart_item_id
                                                )
                                            }
                                            className="remove-item"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/*             */}
                    <div className="cart-total">
                        <div className="pg">
                            <div>Total Price:</div>
                            <div>$ {totalCartPrice}</div>
                        </div>

                        <button className="view-button">VIEW CART</button>
                        <button className="checkout-button">CHECKOUT</button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default CartPanel;
