import React from "react";
import "./FeaturedProducts.css";
import { GoEye } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { FaBalanceScale } from "react-icons/fa";
import { SlBag } from "react-icons/sl";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { parseISO, isWithinInterval, subDays } from "date-fns";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/products");
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const productsData1 = products.slice(0, 3);
    const productsData2 = products.slice(-3);

    const isNewProduct = (createdAt) => {
        const createdDate = parseISO(createdAt);
        return isWithinInterval(createdDate, {
            start: subDays(new Date(), 30),
            end: new Date(),
        });
    };

    const parseProductSize = (sizeString) => {
        if (!sizeString) {
            return [];
        }
        return sizeString.replace(/[{}]/g, "").split(",");
    };

    return (
        <div className="MainContainerFeaturedProducts">
            <div className="headerContainer">
                <h1 style={{ marginBottom: "0rem" }}>New Arrivals</h1>
                <h2 style={{ marginTop: "0rem" }}>We are all beautiful</h2>
            </div>
            <div className="rowContainer">
                {productsData1.map((product, index) => {
                    const sizes = parseProductSize(product.product_size);
                    return (
                        <div style={{ width: "100%" }}>
                            <figure className="figureContainer">
                                <div className="imageContainer">
                                    <img
                                        key={index}
                                        src={
                                            product.image &&
                                            product.image.length > 0
                                                ? product.image[0].image_url
                                                : "https://cleversoft-moleez.myshopify.com/cdn/shop/products/moleez-product-2a.jpg?v=1524713950"
                                        }
                                        alt="product"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    <div className="overlayButtons">
                                        <button className="overlayButton">
                                            <GoEye className="overlayIcons" />
                                        </button>
                                        <button className="overlayButton">
                                            <CiHeart className="overlayIcons" />
                                        </button>
                                        <button className="overlayButton">
                                            <FaBalanceScale className="overlayIcons" />
                                        </button>
                                    </div>
                                    <div className="addToCart">
                                        <div className="overlayCart">
                                            <SlBag size={20} />
                                        </div>
                                        ADD TO CART
                                    </div>
                                    <div className="statusContainer">
                                        <div
                                            key={index}
                                            className={
                                                product.product_sale
                                                    ? "saleContainer"
                                                    : "saleContainer-hidden"
                                            }
                                        >
                                            SALE
                                        </div>
                                        <div
                                            key={index}
                                            className={
                                                isNewProduct(product.created_at)
                                                    ? "newContainer"
                                                    : "newContainer-hidden"
                                            }
                                        >
                                            NEW
                                        </div>
                                    </div>
                                </div>
                                <figcaption>
                                    <h3
                                        style={{ marginBottom: "0rem" }}
                                        key={index}
                                    >
                                        {product.product_name}
                                    </h3>
                                    <p
                                        style={{
                                            marginTop: "0rem",
                                            marginBottom: "0rem",
                                        }}
                                        key={index}
                                    >
                                        ${product.product_price}
                                    </p>

                                    <div
                                        className={
                                            sizes.length === 0
                                                ? "sizeOptions-hidden"
                                                : "sizeOptions"
                                        }
                                    >
                                        {sizes.map((size, sizeIndex) => (
                                            <button key={sizeIndex}>
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    );
                })}
            </div>
            {/*  */}
            <div className="rowContainer">
                {productsData2.map((product, index) => {
                    const sizes = parseProductSize(product.product_size);
                    return (
                        <div style={{ width: "100%" }}>
                            <figure className="figureContainer">
                                <div className="imageContainer">
                                    <img
                                        key={index}
                                        src={
                                            product.image &&
                                            product.image.length > 0
                                                ? product.image[0].image_url
                                                : "https://cleversoft-moleez.myshopify.com/cdn/shop/products/moleez-product-2a.jpg?v=1524713950"
                                        }
                                        alt="product"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    <div className="overlayButtons">
                                        <button className="overlayButton">
                                            <GoEye className="overlayIcons" />
                                        </button>
                                        <button className="overlayButton">
                                            <CiHeart className="overlayIcons" />
                                        </button>
                                        <button className="overlayButton">
                                            <FaBalanceScale className="overlayIcons" />
                                        </button>
                                    </div>
                                    <div className="addToCart">
                                        <div className="overlayCart">
                                            <SlBag size={20} />
                                        </div>
                                        ADD TO CART
                                    </div>
                                    <div className="statusContainer">
                                        <div
                                            key={index}
                                            className={
                                                product.product_sale
                                                    ? "saleContainer"
                                                    : "saleContainer-hidden"
                                            }
                                        >
                                            SALE
                                        </div>
                                        <div
                                            key={index}
                                            className={
                                                isNewProduct(product.created_at)
                                                    ? "newContainer"
                                                    : "newContainer-hidden"
                                            }
                                        >
                                            NEW
                                        </div>
                                    </div>
                                </div>
                                <figcaption>
                                    <h3
                                        style={{ marginBottom: "0rem" }}
                                        key={index}
                                    >
                                        {product.product_name}
                                    </h3>
                                    <p
                                        style={{
                                            marginTop: "0rem",
                                            marginBottom: "0rem",
                                        }}
                                        key={index}
                                    >
                                        ${product.product_price}
                                    </p>

                                    <div
                                        className={
                                            sizes.length === 0
                                                ? "sizeOptions-hidden"
                                                : "sizeOptions"
                                        }
                                    >
                                        {sizes.map((size, sizeIndex) => (
                                            <button key={sizeIndex}>
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    );
                })}
            </div>

            {/*  */}
        </div>
    );
};

export default FeaturedProducts;
