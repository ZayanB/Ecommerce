import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import "./SingleProduct.css";
import { Tabs, notification, Rate, Input } from "antd";
import SizePopUp from "./SizePopUp";
import DeliveryPopUp from "./DeliveryPopUp";
import AskAboutPopUp from "./AskAboutPopUp";
import Spinner from "./Spinner";
import { parseISO, isWithinInterval, subDays } from "date-fns";
import { LiaShippingFastSolid } from "react-icons/lia";

const SingleProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeliveryVisible, setIsDeliveryVisible] = useState(false);
    const [isAskVisible, setIsAskVisible] = useState(false);
    const [cartItem, setCartItem] = useState({
        productid: "",
        productprice: "",
    });
    const [addReview, setAddReview] = useState({
        productid: productId,
        rating: "",
        description: "",
    });

    const { TabPane } = Tabs;

    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showDeliveryModal = () => {
        setIsDeliveryVisible(true);
    };

    const handleDelCancel = () => {
        setIsDeliveryVisible(false);
    };

    const showAskModel = () => {
        setIsAskVisible(true);
    };

    const handleAskCancel = () => {
        setIsAskVisible(false);
    };

    const parseProductSize = (sizeString) => {
        if (!sizeString) {
            return [];
        }
        return sizeString.replace(/[{}]/g, "").split(",");
    };

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
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleSubmit = async (cartItem, token) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/createItem",
                cartItem,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            notification.success({
                message: "Success",
                description: "Item added to cart successfully!",
                placement: "topRight",
                duration: 2,
            });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errorMessage = Object.values(
                    error.response.data.errors
                ).join(", ");
                notification.error({
                    message: "Error",
                    description: `Cannot add item to cart ${errorMessage}`,
                    placement: "topRight",
                    duration: 2,
                });
            }
        }
    };

    const addToCart = (productid, productprice) => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                notification.error({
                    message: "Error",
                    description:
                        "Cannot add item to cart. User not authenticated",
                    placement: "topRight",
                    duration: 2,
                });
                reject("User not authenticated");
                return;
            }

            const newCartItem = {
                productid: productid,
                productprice: productprice,
            };

            setCartItem(newCartItem);
            resolve({ cartItem: newCartItem, token });
        });
    };
    const handleClick = async (productid, productprice) => {
        try {
            const { cartItem, token } = await addToCart(
                productid,
                productprice
            );
            handleSubmit(cartItem, token);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };
    const sizes = parseProductSize(product.product_size);
    const isNewProduct = (createdAt) => {
        const createdDate = parseISO(createdAt);
        return isWithinInterval(createdDate, {
            start: subDays(new Date(), 30),
            end: new Date(),
        });
    };

    const handleRateChange = (value) => {
        setAddReview({
            ...addReview,
            rating: value, // Update the rating in the state
        });
    };

    const handleDescriptionChange = (e) => {
        setAddReview({
            ...addReview,
            description: e.target.value, // Update the description in the state
        });
    };

    const submitReview = async () => {
        try {
            const token = localStorage.getItem("access_token");

            const response = await axios.post(
                "http://127.0.0.1:8000/api/addProductReview",
                addReview,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            notification.success({
                message: "Success",
                description: "Review added successfully!",
                placement: "topRight",
                duration: 2,
            });
            setAddReview({
                productid: productId,
                rating: "",
                description: "",
            });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errorMessage = Object.values(
                    error.response.data.errors
                ).join(", ");
                notification.error({
                    message: "Error",
                    description: `Cannot add review: ${errorMessage}`,
                    placement: "topRight",
                    duration: 2,
                });
            } else {
                errorMessage = "User not authenticated";
                notification.error({
                    message: "Error",
                    description: `Cannot add review: ${errorMessage}`,
                    placement: "topRight",
                    duration: 2,
                });
            }

            notification.error({
                message: "Error",
                description: `Cannot add review: ${errorMessage}`,
                placement: "topRight",
                duration: 2,
            });
        }
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div
                    className={
                        loading
                            ? "prod-main-container-loading"
                            : "prod-main-container"
                    }
                >
                    <div className="single-prod-main">
                        <div className="single-prod-img">
                            {product.image && product.image.length > 0 && (
                                <div
                                    style={{
                                        height: "100%",
                                        width: "95%",
                                    }}
                                >
                                    {product.image.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img.image_url}
                                            alt={product.product_name}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="single-prod-description">
                            <div className="single-prod-status">
                                <div
                                    className={
                                        isNewProduct(product.created_at)
                                            ? "single-new-container"
                                            : "single-new-container-hidden"
                                    }
                                >
                                    New
                                </div>
                                <div
                                    className={
                                        product.product_sale
                                            ? "single-prod-sale-container"
                                            : "single-prod-sale-container-hidden"
                                    }
                                >
                                    Sale
                                </div>
                                {/* <div> In Stock</div> */}
                            </div>
                            <h2>{product.product_name}</h2>
                            <ul
                                className="single-product-list"
                                style={{ paddingLeft: "0" }}
                            >
                                <li>SKU: {product.sku}</li>
                                <li
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ${product.product_price}
                                </li>
                                <li>
                                    <div
                                        className={
                                            sizes.length === 0
                                                ? "single-prod-size-hidden"
                                                : "single-prod-size "
                                        }
                                    >
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Size:
                                        </div>
                                        <div className="sizes-option">
                                            {sizes.map((size, index) => (
                                                <button key={index}>
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="size-guide">
                                        <div>
                                            <SizePopUp
                                                isModalVisible={isModalVisible}
                                                showModal={showModal}
                                                handleCancel={handleCancel}
                                            />
                                        </div>
                                        <div>
                                            <DeliveryPopUp
                                                isModalVisible={
                                                    isDeliveryVisible
                                                }
                                                showModal={showDeliveryModal}
                                                handleCancel={handleDelCancel}
                                            />
                                        </div>
                                        <div>
                                            <AskAboutPopUp
                                                isModalVisible={isAskVisible}
                                                showModal={showAskModel}
                                                handleCancel={handleAskCancel}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button
                                        className="single-add-to-cart"
                                        onClick={() =>
                                            handleClick(
                                                product.product_id_pkey,
                                                product.product_price
                                            )
                                        }
                                    >
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
                                    <Link to={`/buyProduct/${productId}`}>
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
                                    </Link>
                                </li>
                                <li className="single-shipping-free">
                                    <div>
                                        <LiaShippingFastSolid size={22} />{" "}
                                    </div>
                                    <div>
                                        Spend{" "}
                                        <span style={{ color: "red" }}>
                                            $1.00
                                        </span>{" "}
                                        to get Free Shipping
                                    </div>
                                </li>
                                <li>
                                    Category: {product.category.category_name}
                                </li>
                                <li>
                                    Rate this product:
                                    <div>
                                        <Rate
                                            onChange={handleRateChange}
                                            value={addReview.rating}
                                        />
                                        <Input.TextArea
                                            rows={4}
                                            value={addReview.description}
                                            onChange={handleDescriptionChange}
                                            placeholder="Write your review"
                                            style={{
                                                resize: "none",
                                                borderRadius: "0%",
                                            }}
                                        />
                                        <button
                                            className="submit-review-button"
                                            onClick={submitReview}
                                        >
                                            SUBMIT REVIEW
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bottom-tabs">
                        <Tabs
                            defaultActiveKey="1"
                            tabPosition="top"
                            style={{ height: "30vh" }}
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
            )}
        </>
    );
};

export default SingleProduct;
