import React from "react";
import "./ProductsPage.css";
import { GoEye } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { FaBalanceScale } from "react-icons/fa";
import { SlBag } from "react-icons/sl";
import { PiSquaresFour, PiList, PiCaretDown } from "react-icons/pi";
// import productImages from "../assets/data/FeaturedProducts.json";
import { useState, useEffect } from "react";
import axios from "../api/axios";
// import { parseISO, isWithinInterval, subDays } from "date-fns";

const ProductsPage = () => {
    const [menu, setMenu] = useState(false);

    const onMenuClick = () => setMenu(!menu);

    const [view, setView] = useState("grid");

    const onGridClick = () => setView("grid");
    const onListClick = () => setView("list");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filter, setFilters] = useState("/products/category/fashion");

    const onArtClick = () => setFilters("/products/category/artDecor");
    const onDocksClick = () => setFilters("/products/category/casesDocks");
    const onCosmeticClick = () => setFilters("/products/category/cosmetic");
    const onfashionClick = () => setFilters("/products/category/fashion");
    const onfurnitureClick = () => setFilters("/products/category/furniture");
    const onJewelryClick = () => setFilters("/products/category/jewelry");
    const onPotteryClick = () => setFilters("/products/category/pottery");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(filter);
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filter]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(products);

    // const isNewProduct = (createdAt) => {
    //     const createdDate = parseISO(createdAt);
    //     return isWithinInterval(createdDate, {
    //         start: subDays(new Date(), 30),
    //         end: new Date(),
    //     });
    // };

    // const parseProductSize = (sizeString) => {
    //     if (!sizeString) {
    //         return [];
    //     }
    //     return sizeString.replace(/[{}]/g, "").split(",");
    // };

    // const [filter, setFilters] =useState({sort:'none', sizes:'none'});

    return (
        <div className="productsMainContainer">
            <div>
                <ul>
                    <li
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        COLLECTIONS <PiCaretDown onClick={onMenuClick} />
                        <ul
                            className={
                                menu
                                    ? "collectionContent"
                                    : "collectionContent-hidden"
                            }
                        >
                            <li onClick={onArtClick}>Art + Decor</li>
                            <li onClick={onDocksClick}>Cases & Docks</li>
                            <li onClick={onCosmeticClick}>Cosmetic</li>
                            <li onClick={onfashionClick}>Fashion</li>
                            <li onClick={onfurnitureClick}>Furniture</li>
                            <li onClick={onJewelryClick}>Jewelry</li>
                            <li onClick={onPotteryClick}>Pottery</li>
                        </ul>
                    </li>
                    <li className="colorCategory">
                        COLOR <PiCaretDown />
                    </li>
                    <li className="materialCategory">
                        MATERIAL <PiCaretDown />
                    </li>
                    <li className="priceCategory">
                        PRICE <PiCaretDown />
                    </li>
                    <li className="sizeCategory">
                        SIZE <PiCaretDown />
                    </li>
                    <li className="brandCategory">
                        BRAND <PiCaretDown />
                    </li>
                </ul>
            </div>
            <div className="rowColProd">
                <div className="viewContainer">
                    <div className="viewGridList">
                        VIEW AS
                        <div>
                            <PiSquaresFour
                                size={30}
                                style={{ cursor: "pointer" }}
                                onClick={onGridClick}
                                color={view == "grid" ? "black" : "gray"}
                            />
                        </div>
                        <div>
                            <PiList
                                size={30}
                                style={{ cursor: "pointer" }}
                                onClick={onListClick}
                                color={view == "list" ? "black" : "gray"}
                            />
                        </div>
                    </div>
                    <div style={{ cursor: "pointer", marginRight: "20px" }}>
                        SORT BY ALPHABETICALLY,A-Z <PiCaretDown />
                    </div>
                </div>
                <div className="rowProductContainer">
                    {products.map((product, index) => {
                        return (
                            <div
                                className={
                                    view == "list"
                                        ? "allProducts-list"
                                        : "allProducts-grid"
                                }
                            >
                                <figure
                                    className={
                                        view == "list"
                                            ? "productFigureContainerList"
                                            : "productFigureContainerGrid"
                                    }
                                >
                                    <div className="product-card">
                                        <img
                                            key={index}
                                            src={
                                                product.image &&
                                                product.image.length > 0
                                                    ? product.image[0].image_url
                                                    : "https://cleversoft-moleez.myshopify.com/cdn/shop/products/moleez-product-2a.jpg?v=1524713950"
                                            }
                                            alt="photo"
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
                                    </div>
                                    <figcaption
                                        className={
                                            view == "list"
                                                ? "figCapList"
                                                : "figCapGrid"
                                        }
                                    >
                                        <h3
                                            style={{ marginBottom: "0rem" }}
                                            key={index}
                                        >
                                            {product.product_name}
                                        </h3>
                                        <p
                                            style={{
                                                textIndent: "0",
                                                margin: "0",
                                            }}
                                            className={
                                                view == "list"
                                                    ? "prod-description"
                                                    : "prod-description-hidden"
                                            }
                                        >
                                            {product.product_description}
                                        </p>
                                        <p key={index}>
                                            ${product.product_price}
                                        </p>

                                        {/* <div
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
                                    </div> */}
                                    </figcaption>
                                </figure>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
