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
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";


const ProductsPage = ({ product }) => {
    const [menu, setMenu] = useState(false);
    const [menuSize, setMenuSize] = useState(false);
    const location = useLocation();
    const data = location.state;
    console.log(data);

    const onMenuClick = () => setMenu(!menu);
    const onMenuSizeClick = () => setMenuSize(!menuSize);

    const [view, setView] = useState("grid");

    const onGridClick = () => setView("grid");
    const onListClick = () => setView("list");

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let initialFilter = {};
    if (location.state) {
        initialFilter = { sort: "dateNewOld" };
    }

    const [filters, setFilters] = useState(initialFilter);

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

    const onSortClicked = (sort) => {
        setFilters((prevState) => ({
            ...prevState,
            sort: sort,
        }));
    };

    const keysToMap = ["categoryName", "size"];
    const filteredKeys = Object.keys(filters).filter((key) =>
        keysToMap.includes(key)
    );

    const clearFilter = () => {
        setFilters({});
    };

    useEffect(() => {
        const fetchProducts = async () => {
            console.log(filters);
            try {
                let url = `/test?`;

                if (filters?.categoryId) {
                    url += `categoryId=${filters.categoryId}&`;
                }

                if (filters?.size) {
                    url += `size=${filters.size}&`;
                }

                if (filters?.sort) {
                    url += `sort=${filters.sort}&`;
                }

                const response = await axios.get(url);
                setProducts(response.data);
                console.log(response.data);
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

    const keysToInclude = ["categoryName", "size"];

    const { handleAddToCart } = useCart();

    const handleClick = (product) => {
        handleAddToCart(product.product_id_pkey, product.product_price);
    };

    return (
        <div className="productsMainContainer">
            <div style={{ marginTop: "2rem" }}>
                <ul className="filter-panel">
                    <li
                        className={
                            filters.categoryName || filters.size
                                ? "show-filters"
                                : "hide-filters"
                        }
                    >
                        <div className="filter-by-box">Filter By:</div>

                        <div>
                            {Object.keys(filters)
                                .filter((key) => keysToInclude.includes(key))
                                .map((key, index) => (
                                    <div key={index} className="filter-box">
                                        {filters[key]}
                                    </div>
                                ))}
                        </div>
                    </li>
                    <li
                        className={
                            filters.categoryName || filters.size
                                ? "show-filters"
                                : "hide-filters"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={clearFilter}
                    >
                        <div className="clear-filter-box">CLEAR FILTER</div>
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
                        <select onChange={(e) => onSortClicked(e.target.value)}>
                            <option value="az">
                                SORT BY ALPHABETICALLY,A-Z
                            </option>
                            <option value="za">
                                SORT BY ALPHABETICALLY,Z-A
                            </option>
                            <option value="priceLowHigh">
                                SORT BY PRICE: LOW TO HIGH
                            </option>
                            <option value="priceHighLow">
                                SORT BY PRICE: HIGH TO LOW
                            </option>
                            <option value="dateOldNew">
                                SORT BY DATE: OLD TO NEW
                            </option>
                            <option value="dateNewOld">
                                SORT BY DATE: NEW TO OLD
                            </option>
                        </select>
                    </div>
                </div>
                <div className="rowProductContainer">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
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
                                                    <div
                                                        className={
                                                            view == "list"
                                                                ? "image-list"
                                                                : "image-grid"
                                                        }
                                                    >
                                                        <Link
                                                            to={`/allProducts/${product.product_id_pkey}`}
                                                        >
                                                            <img
                                                                key={index}
                                                                src={
                                                                    product.image &&
                                                                    product
                                                                        .image
                                                                        .length >
                                                                        0
                                                                        ? product
                                                                              .image[0]
                                                                              .image_url
                                                                        : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                                                                }
                                                                alt="photo"
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
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            <div className="overlayCart">
                                                                <SlBag
                                                                    size={20}
                                                                />
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
                                                <figcaption
                                                    className={
                                                        view == "list"
                                                            ? "figCapList"
                                                            : "figCapGrid"
                                                    }
                                                >
                                                    <h3
                                                        style={{
                                                            marginBottom:
                                                                "0rem",
                                                        }}
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
                                                        {
                                                            product.product_description
                                                        }
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
                                                            (
                                                                size,
                                                                sizeIndex
                                                            ) => (
                                                                <button
                                                                    key={
                                                                        sizeIndex
                                                                    }
                                                                >
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
