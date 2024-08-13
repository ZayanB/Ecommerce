import React from "react";
import "./FeaturedProducts.css";
import { GoEye } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { FaBalanceScale } from "react-icons/fa";
import { SlBag } from "react-icons/sl";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { notification } from "antd";
import { parseISO, isWithinInterval, subDays } from "date-fns";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItem, setCartItem] = useState({
        productid: "",
        productprice: "",
    });

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

    if (error) return <p>Error: {error}</p>;

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
            notification.error({
                message: "Error",
                description: "Cannot add item to cart",
                placement: "topRight",
                duration: 2,
            });
        }
    };

    const addToCart = (productid, productprice) => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                notification.error({
                    message: "Error",
                    description: "Cannot add item to cart",
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
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        {products.map((product, index) => {
                            const sizes = parseProductSize(
                                product.product_size
                            );
                            return (
                                <div className="all-products">
                                    <figure className="figureContainer">
                                        <div className="imageContainer">
                                            <div className="image-size">
                                                <Link
                                                    to={`/allProducts/${product.product_id_pkey}`}
                                                >
                                                    <img
                                                        key={index}
                                                        src={
                                                            product.image &&
                                                            product.image
                                                                .length > 0
                                                                ? product
                                                                      .image[0]
                                                                      .image_url
                                                                : "https://cleversoft-moleez.myshopify.com/cdn/shop/products/moleez-product-2a.jpg?v=1524713950"
                                                        }
                                                        alt="product"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                    />
                                                </Link>
                                            </div>
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
                                                <button
                                                    className="addToCart"
                                                    onClick={() =>
                                                        handleClick(
                                                            product.product_id_pkey,
                                                            product.product_price
                                                        )
                                                    }
                                                >
                                                    <div className="overlayCart">
                                                        <SlBag size={20} />
                                                    </div>
                                                    ADD TO CART
                                                </button>
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
                                                        isNewProduct(
                                                            product.created_at
                                                        )
                                                            ? "newContainer"
                                                            : "newContainer-hidden"
                                                    }
                                                >
                                                    NEW
                                                </div>
                                            </div>
                                        </div>
                                        <figcaption className="featured-figcaption">
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
                                                {sizes.map(
                                                    (size, sizeIndex) => (
                                                        <button key={sizeIndex}>
                                                            {size}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default FeaturedProducts;
