import React, { useState } from "react";
import { Drawer, Button, Badge } from "antd";
import { PiXCircle, PiShoppingCart } from "react-icons/pi";
import axios from "../api/axios";
import "./CartPanel.css";
import { Link } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import useScreenWidth from "./useScreenWidth";

const CartPanel = () => {
    const screenWidth = useScreenWidth();
    const [visible, setVisible] = useState(false);

    const { items, handleRemoveItem } = useCart();
    // console.log(items);
    const itemsArray = Object.values(items);

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
                {screenWidth > 800 ? (
                    <PiShoppingCart size={22} className="cart-hover" />
                ) : (
                    <Badge count={items.totalItemCount} showZero>
                        <PiShoppingCart size={22} className="cart-hover" />
                    </Badge>
                )}

                <div className={screenWidth > 800 ? "" : "cart-qty-hide"}>
                    {" "}
                    {items.totalItemCount
                        ? `Cart: ${items.totalItemCount}`
                        : "Cart: 0"}
                </div>
            </Button>
            <Drawer
                s
                title={
                    items.totalItemCount
                        ? `My Cart (${items.totalItemCount})`
                        : "My Cart (0)"
                }
                placement="right"
                onClose={onClose}
                visible={visible}
            >
                <div className="cart-main-container">
                    <div className="cart-product-list">
                        {items && items.items && items.items.length > 0 ? (
                            items.items.map((item, index) => {
                                return (
                                    <div className="cart-product">
                                        <div
                                            key={index}
                                            style={{
                                                width: "30%",
                                                height: "30%",
                                            }}
                                        >
                                            <img
                                                src={
                                                    item.product_image[0]
                                                        .image_url
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
                                                <div>
                                                    $ {item.product_price}
                                                </div>
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
                            })
                        ) : (
                            <div>No items</div>
                        )}
                    </div>

                    <div className="cart-total">
                        <div className="pg">
                            <div>Total Price:</div>
                            <div>
                                {items.totalPrice
                                    ? `$ ${items.totalPrice}`
                                    : "$ 0"}
                            </div>
                        </div>

                        <button className="view-button">VIEW CART</button>
                        <Link to={"/buyProduct/cart"}>
                            <button
                                className="checkout-button"
                                onClick={onClose}
                            >
                                CHECKOUT
                            </button>
                        </Link>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default CartPanel;
