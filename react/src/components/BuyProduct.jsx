import { React, useEffect, useState } from "react";
import "./BuyProduct.css";
import { Form, Radio, Flex, notification, Spin, Badge } from "antd";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { PiMoney } from "react-icons/pi";
import { PiPaypalLogo } from "react-icons/pi";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import CreateAddress from "./CreateAddress";
import Spinner from "./Spinner";
import CreateAddressPopUp from "./CreateAddressPopUp";

const BuyProduct = () => {
    const params = useParams();

    const hasParams = Object.keys(params).length > 0;

    const productId = hasParams ? params.productId : null;

    const [cartItems, setCartItems] = useState([]);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

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
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [cartItems]);

    console.log(cartItems);

    const [product, setProduct] = useState([]);
    const [hasAddress, setHasAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAddress, setNewAddress] = useState(false);
    const [buyLoading, setBuyLoading] = useState(false);
    const [chooseAddressLoading, setChooseAddressLoading] = useState(false);

    const [orderAddress, setOrderAddress] = useState({
        orderAddressId: "",
    });

    const [placeOrder, setPlaceOrder] = useState({
        addressId: "",
        shippingMethod: "5",
        paymentMethod: "",
    });

    const productPrice = parseFloat(product.product_price);
    const shippingFee = parseFloat(placeOrder.shippingMethod);
    const totalPrice = (productPrice + shippingFee).toFixed(2);

    const handleAddressChange = (e) => {
        setPlaceOrder({
            ...placeOrder,
            addressId: e.target.value,
        });
    };

    const handleShippingChange = (e) => {
        setPlaceOrder({
            ...placeOrder,
            shippingMethod: e.target.value,
        });
    };
    const handlePaymentChange = (e) => {
        setPlaceOrder({
            ...placeOrder,
            paymentMethod: e.target.value,
        });
    };

    const showNewAddress = () => {
        setNewAddress(true);
    };

    const hideNewAddress = () => {
        setNewAddress(false);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/${productId}`
                );

                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const fetchAddress = async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/getAddress",
                    {},
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setHasAddress(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("error", error);
            }
        };
        fetchAddress();
    }, [hasAddress]);

    const submitOrderAddress = async (updatedOrderAddress) => {
        const token = localStorage.getItem("access_token");
        setChooseAddressLoading(true);

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/createOrderAddress",
                updatedOrderAddress,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setChooseAddressLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                for (const field in errors) {
                    notification.error({
                        message: "Validation Error",
                        description: `${field}: ${errors[field].join(", ")}`,
                        placement: "topRight",
                        duration: 2,
                    });
                }
            } else {
                notification.error({
                    message: "Error",
                    description:
                        "An unexpected error occurred. Cannot choose address. Please try again later.",
                    placement: "topRight",
                    duration: 2,
                });
            }
        }
    };

    const handleRadioChange = async (e) => {
        const updatedOrderAddress = {
            ...orderAddress,
            addressId: e.target.value,
        };

        setOrderAddress(updatedOrderAddress);

        await submitOrderAddress(updatedOrderAddress);
        handleAddressChange(e);
    };

    console.log(placeOrder);

    const submitOrder = async () => {
        const token = localStorage.getItem("access_token");
        setBuyLoading(true);

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/placeOrder",
                placeOrder,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBuyLoading(false);
            notification.success({
                message: "Success",
                description: "Order Placed successfully!",
                placement: "topRight",
                duration: 2,
            });
        } catch (error) {
            setBuyLoading(false);
            if (error.response) {
                const status = error.response.status;

                if (status === 422) {
                    const errors = error.response.data.errors;
                    for (const field in errors) {
                        notification.error({
                            message: "Validation Error",
                            description: `${field}: ${errors[field].join(
                                ", "
                            )}`,
                            placement: "topRight",
                            duration: 2,
                        });
                    }
                } else if (status === 401) {
                    notification.error({
                        message: "Unauthorized",
                        description:
                            "You are not authorized to perform this action. Please log in and try again.",
                        placement: "topRight",
                        duration: 2,
                    });
                } else {
                    notification.error({
                        message: "Error",
                        description: `An error occurred (${status}): ${
                            error.response.data.message ||
                            "Please try again later."
                        }`,
                        placement: "topRight",
                        duration: 2,
                    });
                }
            } else {
                notification.error({
                    message: "Network Error",
                    description:
                        "Unable to connect to the server. Please check your internet connection and try again.",
                    placement: "topRight",
                    duration: 2,
                });
            }
        }
    };

    const totalCartPriceUpdated = parseFloat(totalCartPrice);
    const totalCartePriceShipping = (
        totalCartPriceUpdated + shippingFee
    ).toFixed(2);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="buy-product-parent">
                        <div className="contact-info">
                            {hasAddress.length == 0 ? (
                                <>
                                    <div>
                                        <CreateAddress />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h2 style={{ color: "black" }}>
                                            Saved Addresses
                                        </h2>
                                        <Radio.Group
                                            style={{ width: "40vw" }}
                                            onChange={handleRadioChange}
                                            value={placeOrder.addressId}
                                        >
                                            {chooseAddressLoading ? (
                                                <Spin
                                                    style={{
                                                        transform:
                                                            "translateX(290px)",
                                                        marginBottom: "0.5rem",
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    {hasAddress &&
                                                    hasAddress.length > 0 ? (
                                                        hasAddress.map(
                                                            (
                                                                address,
                                                                index
                                                            ) => (
                                                                <Radio.Button
                                                                    key={index}
                                                                    value={
                                                                        address.user_address_id
                                                                    }
                                                                    className="buy-radio-style"
                                                                >
                                                                    <div>
                                                                        {
                                                                            address.country
                                                                        }
                                                                    </div>
                                                                    <div className="radio-button-style">
                                                                        <div>
                                                                            {
                                                                                address.state
                                                                            }
                                                                            ,
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                address.city
                                                                            }
                                                                            ,
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                address.street
                                                                            }
                                                                            ,
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                address.building
                                                                            }
                                                                            ,
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                address.zip_code
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </Radio.Button>
                                                            )
                                                        )
                                                    ) : (
                                                        <p>
                                                            No addresses found.
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </Radio.Group>
                                        <div>
                                            <CreateAddressPopUp
                                                isModalVisible={newAddress}
                                                showModal={showNewAddress}
                                                handleCancel={hideNewAddress}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div>
                                <Form style={{ width: "40vw" }}>
                                    {/* Shipping Section */}
                                    <h2>Shipping Method</h2>

                                    <Radio.Group
                                        style={{ width: "100%" }}
                                        // onChange={onShippingChange}
                                        // value={shippingMethod}
                                        onChange={handleShippingChange}
                                        value={placeOrder.shippingMethod}
                                    >
                                        <Radio.Button
                                            value="5"
                                            className="buy-radio-style"
                                        >
                                            <span>Local Shipping</span>
                                            <span style={{ float: "right" }}>
                                                $5.00
                                            </span>
                                        </Radio.Button>
                                        <Radio.Button
                                            value="20"
                                            className="buy-radio-style"
                                        >
                                            <span>International Shipping</span>
                                            <span style={{ float: "right" }}>
                                                $20.00
                                            </span>
                                        </Radio.Button>
                                    </Radio.Group>

                                    {/* Payment Section */}
                                    <h2 style={{ marginBottom: "0px" }}>
                                        Payment
                                    </h2>
                                    <div
                                        style={{
                                            marginTop: "0px",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        All transactions are secure and
                                        encrypted.
                                    </div>

                                    <Flex
                                        vertical
                                        gap="middle"
                                        style={{ width: "100%" }}
                                    >
                                        <Radio.Group
                                            onChange={handlePaymentChange}
                                            value={placeOrder.paymentMethod}
                                        >
                                            <Radio.Button
                                                value="1"
                                                style={{
                                                    width: "25%",
                                                    height: "5rem",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <PiMoney
                                                    size={55}
                                                    style={{
                                                        transform:
                                                            "translateY(10px)",
                                                    }}
                                                />
                                            </Radio.Button>
                                            <Radio.Button
                                                value="4"
                                                style={{
                                                    width: "25%",
                                                    height: "5rem",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <PiPaypalLogo
                                                    size={55}
                                                    style={{
                                                        transform:
                                                            "translateY(10px)",
                                                    }}
                                                />
                                            </Radio.Button>
                                            <Radio.Button
                                                value="2"
                                                style={{
                                                    width: "25%",
                                                    height: "5rem",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <RiVisaLine
                                                    size={55}
                                                    style={{
                                                        transform:
                                                            "translateY(10px)",
                                                    }}
                                                />
                                            </Radio.Button>
                                            <Radio.Button
                                                value="3"
                                                style={{
                                                    width: "25%",
                                                    height: "5rem",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <FaCcMastercard
                                                    size={55}
                                                    style={{
                                                        transform:
                                                            "translateY(10px)",
                                                    }}
                                                />
                                            </Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                    <Form.Item>
                                        <button
                                            style={{
                                                width: "100%",
                                                height: "2.5rem",
                                                marginTop: "1rem",
                                            }}
                                            onClick={submitOrder}
                                        >
                                            {buyLoading ? (
                                                <Spin />
                                            ) : (
                                                <div>Place Order</div>
                                            )}
                                        </button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        {/*  */}
                        <div
                            className={
                                productId
                                    ? "buy-summary-single"
                                    : "buy-summary-cart"
                            }
                        >
                            {productId ? (
                                <>
                                    <div className="buy-product-image">
                                        <div>
                                            {product.image &&
                                            product.image.length > 0 &&
                                            product.image[0].image_url ? (
                                                <img
                                                    src={
                                                        product.image[0]
                                                            .image_url
                                                    }
                                                    alt="product"
                                                    className="buy-image-resize"
                                                />
                                            ) : (
                                                <p>Image not available</p>
                                            )}
                                        </div>
                                        <div>{product.product_name}</div>
                                    </div>
                                    <div>${product.product_price}</div>
                                    <div>Subtotal</div>
                                    <div>${product.product_price}</div>
                                    <div>Shipping</div>
                                    <div>${placeOrder.shippingMethod}</div>
                                    <div style={{ fontWeight: "bold" }}>
                                        Total
                                    </div>
                                    <div>
                                        <span style={{ fontSize: "11px" }}>
                                            USD
                                        </span>{" "}
                                        <span style={{ fontWeight: "bold" }}>
                                            ${totalPrice}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {cartItems.map((item, index) => {
                                        return (
                                            <>
                                                <div className="buy-product-image-cart">
                                                    <div key={index}>
                                                        <Badge
                                                            count={
                                                                item.quantity
                                                            }
                                                            color="grey"
                                                        >
                                                            <img
                                                                src={
                                                                    item
                                                                        .product_image[0]
                                                                        .image_url
                                                                }
                                                                alt="product"
                                                                className="buy-image-resize-cart"
                                                            />
                                                        </Badge>
                                                    </div>
                                                    <div className="xyc">
                                                        <div>
                                                            {item.product_name}
                                                        </div>
                                                        <div>
                                                            $
                                                            {item.product_price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                    <div className="total-cart-shipping">
                                        <div>Subtotal</div>
                                        <div>${totalCartPrice}</div>
                                    </div>
                                    <div className="total-cart-shipping">
                                        <div>Shipping</div>
                                        <div>${placeOrder.shippingMethod}</div>
                                    </div>
                                    <div className="total-cart-shipping">
                                        <div style={{ fontWeight: "bold" }}>
                                            Total
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "11px" }}>
                                                USD
                                            </span>{" "}
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                ${totalCartePriceShipping}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default BuyProduct;
