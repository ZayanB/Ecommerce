import React from "react";
import "./FeaturedProducts.css";
import { GoEye } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { FaBalanceScale } from "react-icons/fa";
import { SlBag } from "react-icons/sl";
import FeaturedProductsData from "../assets/data/FeaturedProducts.json";
const productsData1 = FeaturedProductsData.slice(0, 3);
const productsData2 = FeaturedProductsData.slice(-3);

const FeaturedProducts = () => {
    return (
        <div className="MainContainerFeaturedProducts">
            <div className="headerContainer">
                <h1 style={{ marginBottom: "0rem" }}>New Arrivals</h1>
                <h2 style={{ marginTop: "0rem" }}>We are all beautiful</h2>
            </div>
            <div className="rowContainer">
                {productsData1.map((product, index) => {
                    return (
                        <div style={{ width: "100%" }}>
                            <figure className="figureContainer">
                                <div className="imageContainer">
                                    <img
                                        key={index}
                                        src={product.URL}
                                        alt={product.alt}
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
                                            className={product.sale}
                                        >
                                            SALE
                                        </div>
                                        <div
                                            key={index}
                                            className={product.new}
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
                                        {product.name}
                                    </h3>
                                    <p
                                        style={{
                                            marginTop: "0rem",
                                            marginBottom: "0rem",
                                        }}
                                        key={index}
                                    >
                                        {product.price}
                                    </p>

                                    <div key={index} className={product.style}>
                                        <button key={index}>
                                            {product.size1}
                                        </button>
                                        <button key={index}>
                                            {product.size2}
                                        </button>
                                        <button key={index}>
                                            {product.size3}
                                        </button>
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
                    return (
                        <div style={{ width: "100%" }}>
                            <figure className="figureContainer">
                                <div className="imageContainer">
                                    <img
                                        key={index}
                                        src={product.URL}
                                        alt={product.alt}
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
                                            className={product.sale}
                                        >
                                            SALE
                                        </div>
                                        <div
                                            key={index}
                                            className={product.new}
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
                                        {product.name}
                                    </h3>
                                    <p
                                        style={{
                                            marginTop: "0rem",
                                            marginBottom: "0rem",
                                        }}
                                        key={index}
                                    >
                                        {product.price}
                                    </p>

                                    <div key={index} className={product.style}>
                                        <button key={index}>
                                            {product.size1}
                                        </button>
                                        <button key={index}>
                                            {product.size2}
                                        </button>
                                        <button key={index}>
                                            {product.size3}
                                        </button>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedProducts;
