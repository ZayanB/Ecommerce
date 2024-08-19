import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import "./SingleProductMobile.css";
import { Tabs, Rate, Input } from "antd";
import SizePopUp from "./SizePopUp";
import DeliveryPopUp from "./DeliveryPopUp";
import AskAboutPopUp from "./AskAboutPopUp";
import Spinner from "./Spinner";
import { parseISO, isWithinInterval, subDays } from "date-fns";
import { PiTruckLight } from "react-icons/pi";
import { useCart } from "../../Contexts/CartContext";
import { ReviewsContext } from "../../Contexts/ReviewContext";

const SingleProductMobile = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeliveryVisible, setIsDeliveryVisible] = useState(false);
    const [isAskVisible, setIsAskVisible] = useState(false);

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

    const { handleAddToCart } = useCart();

    const handleClick = (product) => {
        handleAddToCart(product.product_id_pkey, product.product_price);
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
                // console.log(response.data);
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

    const sizes = parseProductSize(product.product_size);
    const isNewProduct = (createdAt) => {
        const createdDate = parseISO(createdAt);
        return isWithinInterval(createdDate, {
            start: subDays(new Date(), 30),
            end: new Date(),
        });
    };

    const { addReview } = useContext(ReviewsContext);
    const [addReviewData, setAddReviewData] = useState({
        productid: productId,
        rating: "",
        description: "",
    });

    const handleRateChange = (value) => {
        setAddReviewData({
            ...addReviewData,
            rating: value,
        });
    };

    const handleDescriptionChange = (e) => {
        setAddReviewData({
            ...addReviewData,
            description: e.target.value,
        });
    };

    const handleSubmitReview = () => {
        addReview(addReviewData);
    };
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="prod-main-container-mobile">
                    <div className="single-prod-img-mobile">
                        {product.image && product.image.length > 0 && (
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    overflow: "hidden",
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
                    <div className="single-prod-status-mobile">
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
                    </div>
                    <div>
                        <h2 style={{ fontSize: "28px", marginLeft: "1rem" }}>
                            {product.product_name}
                        </h2>
                    </div>
                    <div style={{ marginLeft: "1rem" }}>SKU: {product.sku}</div>
                    <div
                        style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            marginLeft: "1rem",
                        }}
                    >
                        ${product.product_price}
                    </div>
                    <div
                        className={
                            sizes.length === 0
                                ? "single-prod-size-hidden"
                                : "single-prod-size"
                        }
                    >
                        <div style={{ marginLeft: "1rem" }}>Size:</div>
                        <div className="sizes-option-mobile">
                            {sizes.map((size, index) => (
                                <button key={index}>{size}</button>
                            ))}
                        </div>
                    </div>
                    <div className="size-guide-mobile">
                        <div>
                            <SizePopUp
                                isModalVisible={isModalVisible}
                                showModal={showModal}
                                handleCancel={handleCancel}
                            />
                        </div>
                        <div>
                            <DeliveryPopUp
                                isModalVisible={isDeliveryVisible}
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
                    <div>
                        <div style={{ margin: "0.5rem 1rem 0.5rem 1rem" }}>
                            <button
                                className="single-add-to-cart"
                                onClick={() => handleClick(product)}
                            >
                                ADD TO CART
                            </button>
                        </div>
                        <div style={{ marginLeft: "1rem" }}>
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={handleCheckboxChange}
                            />
                            I agree with terms and conditions
                        </div>
                        <div style={{ margin: "0.5rem 1rem 0 1rem" }}>
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
                        </div>
                    </div>
                    <div className="mobile-single-product-rate">
                        <div className="single-shipping-free">
                            <div>
                                <PiTruckLight size={22} />{" "}
                            </div>
                            <div>
                                Spend{" "}
                                <span style={{ color: "red" }}>$1.00</span> to
                                get Free Shipping
                            </div>
                        </div>
                        <div>Category: {product.category.category_name}</div>
                        <div>
                            Rate this product:
                            <div style={{ marginTop: "0.5rem" }}>
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
                                    onClick={handleSubmitReview}
                                >
                                    SUBMIT REVIEW
                                </button>
                            </div>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            <div className="bottom-tabs-mobile">
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
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleProductMobile;
