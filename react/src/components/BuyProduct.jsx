import { React, useEffect, useState } from "react";
import "./BuyProduct.css";
import { Form, Radio, Flex } from "antd";
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
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [shippingMethod, setShippingMethod] = useState(5);
    const productPrice = parseFloat(product.product_price);
    const shippingFee = parseFloat(shippingMethod);
    const totalPrice = (productPrice + shippingFee).toFixed(2);
    const [hasAddress, setHasAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAddress, setNewAddress] = useState(false);

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

    const onChange = (e) => {
        console.log(`radio checked:${e.target.value}`);
    };

    const onShippingChange = (e) => {
        setShippingMethod(e.target.value);
    };

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
                                        <Radio.Group style={{ width: "40vw" }}>
                                            {hasAddress &&
                                            hasAddress.length > 0 ? (
                                                hasAddress.map(
                                                    (address, index) => (
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
                                                <p>No addresses found.</p>
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
                                        onChange={onShippingChange}
                                        value={shippingMethod}
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
                                            onChange={onChange} //onChange function to choose payment
                                            defaultValue="a"
                                        >
                                            <Radio.Button
                                                value="a"
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
                                                value="b"
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
                                                value="c"
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
                                                value="d"
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
                                                height: "2rem",
                                                marginTop: "1rem",
                                            }}
                                            // onClick={submitPayment}//TO BE ADDED LATER
                                        >
                                            Pay Now
                                        </button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        {/*  */}
                        <div className="buy-summary">
                            <div className="buy-product-image">
                                <div>
                                    {product.image &&
                                    product.image.length > 0 &&
                                    product.image[0].image_url ? (
                                        <img
                                            src={product.image[0].image_url}
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
                            <div>${shippingMethod}</div>
                            <div style={{ fontWeight: "bold" }}>Total</div>
                            <div>
                                <span style={{ fontSize: "11px" }}>USD</span>{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    ${totalPrice}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default BuyProduct;
