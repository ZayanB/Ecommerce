import { React, useEffect, useState } from "react";
import "./BuyProduct.css";
import { Form, Input, Checkbox, Select, Button } from "antd";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const BuyProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
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
    return (
        <div className="buy-product-parent">
            <div className="contact-info">
                <Form
                    layout="vertical"
                    style={{ width: "40vw", marginLeft: "5rem" }}
                >
                    {/* Contact Section */}
                    <h2>Contact</h2>
                    <Form.Item
                        name="emailOrPhone"
                        label="Email or mobile phone number"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter your email or mobile phone number",
                            },
                        ]}
                    >
                        <Input placeholder="Email or mobile phone number" />
                    </Form.Item>
                    <Form.Item name="newsOffers" valuePropName="checked">
                        <Checkbox>Email me with news and offers</Checkbox>
                    </Form.Item>

                    {/* Delivery Section */}
                    <h2>Delivery</h2>
                    <Form.Item
                        name="country"
                        label="Country/Region"
                        rules={[
                            {
                                required: true,
                                message: "Please select your country/region",
                            },
                        ]}
                    >
                        <Select placeholder="Select your country/region">
                            <Option value="Lebanon">Lebanon</Option>
                            {/* Add more options here */}
                        </Select>
                    </Form.Item>
                    <Form.Item name="firstName">
                        <Input placeholder="First name (optional)" />
                    </Form.Item>
                    <Form.Item name="lastName">
                        <Input placeholder="Last name" />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your address",
                            },
                        ]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                    <Form.Item name="apartment">
                        <Input placeholder="Apartment, suite, etc. (optional)" />
                    </Form.Item>
                    <Form.Item name="city">
                        <Input placeholder="City" />
                    </Form.Item>
                    <Form.Item name="postalCode">
                        <Input placeholder="Postal code (optional)" />
                    </Form.Item>
                    <Form.Item name="saveInfo" valuePropName="checked">
                        <Checkbox>Save this information for next time</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Continue to shipping
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="buy-summary">
                <h2>{product.product_name}</h2>
            </div>
        </div>
    );
};

export default BuyProduct;
