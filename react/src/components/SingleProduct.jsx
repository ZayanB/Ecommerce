import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import "./SingleProduct.css";
import { Link } from "react-router-dom";
import { Tabs } from "antd";

const SingleProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const { TabPane } = Tabs;

    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    };

    const parseProductSize = (sizeString) => {
        if (!sizeString) {
            return [];
        }
        return sizeString.replace(/[{}]/g, "").split(",");
    };

    useEffect(() => {
        // Function to fetch product data
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/products/${productId}`
                );

                setProduct(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const sizes = parseProductSize(product.product_size);

    return (
        // <div>
        //     <ul>
        //         <li>{product.product_name}</li>
        //         <li>${product.product_price}</li>
        //         <li>{product.created_at}</li>
        //         <li>{product.product_description}</li>
        //         <li>{product.product_sale}</li>
        //         <li>{product.product_size}</li>
        //         {/* <li>{product.image[0].image_url}</li> */}
        //         <li>{product.product_rating}</li>
        //         <li>{product.sku}</li>
        //     </ul>
        // </div>
        <div className="XX">
            <div className="single-prod-main">
                <div className="single-prod-img">
                    {product.image && product.image.length > 0 && (
                        <div style={{ height: "100%", width: "95%" }}>
                            {product.image.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.image_url}
                                    alt={product.product_name}
                                    style={{ height: "100%", width: "100%" }}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="single-prod-description">
                    <h2>{product.product_name}</h2>
                    <ul>
                        <li>SKU: {product.sku}</li>
                        <li>${product.product_price}</li>
                        <li>
                            <div
                                className={
                                    sizes.length === 0
                                        ? "single-prod-size-hidden"
                                        : "single-prod-size "
                                }
                            >
                                Size:
                                {sizes.map((size, index) => (
                                    <button key={index}>{size}</button>
                                ))}
                            </div>
                        </li>
                        <li>
                            <div className="size-guide">
                                <Link style={{ fontSize: "12px" }} to={""}>
                                    SIZE GUIDE
                                </Link>
                                <Link style={{ fontSize: "12px" }} to={""}>
                                    DELIVERY & RETURN
                                </Link>
                                <Link style={{ fontSize: "12px" }} to={""}>
                                    ASK ABOUT THIS PRODUCT
                                </Link>
                            </div>
                        </li>
                        <li>
                            <button className="single-add-to-cart">
                                ADD TO CART
                            </button>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={handleCheckboxChange}
                            />
                            I agree with terms and conditions
                        </li>
                        <li>
                            <button
                                className={
                                    agreeTerms
                                        ? "single-buy-now"
                                        : "single-buy-now-not"
                                }
                                disabled={!agreeTerms}
                            >
                                BUY IT NOW
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bottom-tabs">
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="top"
                    style={{ height: "100vh" }}
                >
                    <TabPane tab="DESCRIPTION" key="1">
                        {product.product_description}
                    </TabPane>
                    <TabPane tab="RATING" key="2">
                        Customers rated {product.product_name}{" "}
                        {product.product_rating} out of 5
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default SingleProduct;
