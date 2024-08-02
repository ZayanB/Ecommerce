import React from "react";
import "./ProductsPage.css";
import { GoEye } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { FaBalanceScale } from "react-icons/fa";
import { SlBag } from "react-icons/sl";
import { PiSquaresFour, PiList, PiCaretDown } from "react-icons/pi";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { parseISO, isWithinInterval, subDays } from "date-fns";

const ProductsPage = () => {
    const [menu, setMenu] = useState(false);
    const [menuSize, setMenuSize] = useState(false);

    const onMenuClick = () => setMenu(!menu);
    const onMenuSizeClick = () => setMenuSize(!menuSize);

    const [view, setView] = useState("grid");

    const onGridClick = () => setView("grid");
    const onListClick = () => setView("list");

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({});

    const onCategoryClicked = (categoryId, categoryName) => {
        setFilters((prevState) => ({
            ...prevState,
            categoryId: categoryId,
            categoryName: categoryName,
        }));
    };

    const onSizesClicked = (size) => {
        setFilters((prevState) => ({
            ...prevState,
            size: size,
        }));
    };

    const clearFilter = () => {
        setFilters({});
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `/test?`;
                if (filters?.categoryId) {
                    url += `categoryId=${filters.categoryId}&`;
                }

                if (filters?.size) {
                    url += `size=${filters.size}&`;
                }

                const response = await axios.get(url);
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [filters]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/categories");
                setCategories(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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

    const productsCount = products.length;

    // console.log(categories);
    return (
        <div className="productsMainContainer">
            <div style={{ marginTop: "2rem" }}>
                <ul className="filter-panel">
                    <li style={{ cursor: "pointer" }} onClick={clearFilter}>
                        CLEAR FILTER
                    </li>
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
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        onCategoryClicked(
                                            category.category_id_pkey,
                                            category.category_name
                                        )
                                    }
                                >
                                    {category.category_name}
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        SIZE <PiCaretDown onClick={onMenuSizeClick} />
                        <ul
                            className={
                                menuSize ? "sizeContent" : "sizeContent-hidden"
                            }
                        >
                            <li onClick={() => onSizesClicked("XS")}>XS</li>
                            <li onClick={() => onSizesClicked("S")}>S</li>
                            <li onClick={() => onSizesClicked("M")}>M</li>
                            <li onClick={() => onSizesClicked("L")}>L</li>
                            <li onClick={() => onSizesClicked("XL")}>XL</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="rowColProd">
                <div className="category-Name">
                    {filters.categoryName} ({products.length})
                </div>
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
                    {productsCount > 0 ? (
                        products.map((product, index) => {
                            const sizes = parseProductSize(
                                product.product_size
                            );
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
                                                        ? product.image[0]
                                                              .image_url
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
                                                    textAlign: "left",
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
                        })
                    ) : (
                        <div className="no-products">
                            No products in {filters.categoryName}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
