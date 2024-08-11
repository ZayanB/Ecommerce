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

const BuyProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [shippingMethod, setShippingMethod] = useState(5);
    const productPrice = parseFloat(product.product_price);
    const shippingFee = parseFloat(shippingMethod);
    const totalPrice = (productPrice + shippingFee).toFixed(2);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/${productId}`
                );

                setProduct(response.data);
                console.log(response.data);
                // setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                //setLoading(false);
            } finally {
                //setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const onChange = (e) => {
        console.log(`radio checked:${e.target.value}`);
    };

    const onShippingChange = (e) => {
        setShippingMethod(e.target.value);
    };

    return (
        <div className="buy-product-parent">
            <div className="contact-info">
                <div>
                    <CreateAddress />
                </div>

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
                                style={{
                                    display: "block",
                                    height: "4rem",
                                    marginBottom: "0.5rem",
                                    borderRadius: "6px",
                                    width: "100%",
                                    fontSize: "16px",
                                    textAlign: "left",
                                }}
                            >
                                <span>Local Shipping</span>
                                <span style={{ float: "right" }}>$5.00</span>
                            </Radio.Button>
                            <Radio.Button
                                value="20"
                                style={{
                                    display: "block",
                                    height: "4rem",
                                    borderRadius: "6px",
                                    width: "100%",
                                    fontSize: "16px",
                                    textAlign: "left",
                                }}
                            >
                                <span>International Shipping</span>
                                <span style={{ float: "right" }}>$20.00</span>
                            </Radio.Button>
                        </Radio.Group>

                        {/* Payment Section */}
                        <h2 style={{ marginBottom: "0px" }}>Payment</h2>
                        <div
                            style={{ marginTop: "0px", marginBottom: "0.5rem" }}
                        >
                            All transactions are secure and encrypted.
                        </div>

                        <Flex vertical gap="middle" style={{ width: "100%" }}>
                            <Radio.Group onChange={onChange} defaultValue="a">
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
                                            transform: "translateY(10px)",
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
                                            transform: "translateY(10px)",
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
                                            transform: "translateY(10px)",
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
                                            transform: "translateY(10px)",
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
                    <span style={{ fontWeight: "bold" }}>${totalPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default BuyProduct;
