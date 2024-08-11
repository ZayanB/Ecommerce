import { React, useEffect, useState } from "react";
import "./BuyProduct.css";
import { Form, Input, Checkbox, Select, Button, Radio, Flex } from "antd";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { PiMoney } from "react-icons/pi";
import { PiPaypalLogo } from "react-icons/pi";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";

const BuyProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [shippingMethod, setShippingMethod] = useState(4);
    const productPrice = parseFloat(product.product_price);
    const shippingFee = parseFloat(shippingMethod);
    const totalPrice = (productPrice + shippingFee).toFixed(2);

    const { Option } = Select;
    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];

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
    console.log(shippingMethod);

    return (
        <div className="buy-product-parent">
            <div className="contact-info">
                <Form
                    layout="vertical"
                    style={{ width: "40vw", marginLeft: "7rem" }}
                >
                    {/* Contact Section */}
                    <h2>Contact</h2>
                    <Form.Item
                        name="Phone"
                        label="Mobile phone number"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter your mobile phone number",
                            },
                        ]}
                    >
                        <Input placeholder="Mobile phone number" />
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
                                message: "Please select your country",
                            },
                        ]}
                    >
                        <Select placeholder="Select your country">
                            {countries.map((country) => (
                                <Option key={country} value={country}>
                                    {country}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="firstName">
                        <Input placeholder="First name (optional)" />
                    </Form.Item>
                    <Form.Item name="lastName">
                        <Input placeholder="Last name" />
                    </Form.Item>
                    <Form.Item
                        name="State"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your State",
                            },
                        ]}
                    >
                        <Input placeholder="State" />
                    </Form.Item>
                    <Form.Item name="city">
                        <Input placeholder="City" />
                    </Form.Item>
                    <Form.Item name="Street">
                        <Input placeholder="Street" />
                    </Form.Item>
                    <Form.Item name="Building">
                        <Input placeholder="Building" />
                    </Form.Item>
                    <Form.Item name="postalCode">
                        <Input placeholder="Postal code (optional)" />
                    </Form.Item>
                    <Form.Item name="saveInfo" valuePropName="checked">
                        <Checkbox>Save this information for next time</Checkbox>
                    </Form.Item>
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
                    <div style={{ marginTop: "0px", marginBottom: "0.5rem" }}>
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
                        <Button
                            type="default"
                            htmlType="submit"
                            className="buy-shipping-button"
                        >
                            Pay Now
                        </Button>
                    </Form.Item>
                </Form>
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
