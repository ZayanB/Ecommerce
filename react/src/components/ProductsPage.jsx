import React from "react";
import "./ProductsPage.css";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { parseISO, isWithinInterval, subDays } from "date-fns";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
    PiScales,
    PiHeart,
    PiEye,
    PiBag,
    PiSquaresFour,
    PiList,
    PiCaretDown,
} from "react-icons/pi";
import { useCart } from "../../Contexts/CartContext";
import { Select } from "antd";
const { Option } = Select;

const ProductsPage = ({ product }) => {
    const [menu, setMenu] = useState(false);
    const [menuSize, setMenuSize] = useState(false);
    const location = useLocation();
    const data = location.state;
    // console.log(data);

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
            <div className="products-sidebar">
                <div className="filter-panel">
                    <div
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
                    </div>
                    <div
                        className={
                            filters.categoryName || filters.size
                                ? "show-filters"
                                : "hide-filters"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={clearFilter}
                    >
                        <div className="clear-filter-box">CLEAR FILTER</div>
                    </div>
                    <div
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        COLLECTIONS <PiCaretDown onClick={onMenuClick} />
                        <div
                            className={
                                menu
                                    ? "collectionContent"
                                    : "collectionContent-hidden"
                            }
                        >
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="sidebar-categories"
                                    onClick={() =>
                                        onCategoryClicked(
                                            category.category_id_pkey,
                                            category.category_name
                                        )
                                    }
                                >
                                    {category.category_name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        SIZE <PiCaretDown onClick={onMenuSizeClick} />
                        <div
                            className={
                                menuSize
                                    ? "collectionContent"
                                    : "collectionContent-hidden"
                            }
                        >
                            <div
                                className="sidebar-categories"
                                onClick={() => onSizesClicked("XS")}
                            >
                                XS
                            </div>
                            <div
                                className="sidebar-categories"
                                onClick={() => onSizesClicked("S")}
                            >
                                S
                            </div>
                            <div
                                className="sidebar-categories"
                                onClick={() => onSizesClicked("M")}
                            >
                                M
                            </div>
                            <div
                                className="sidebar-categories"
                                onClick={() => onSizesClicked("L")}
                            >
                                L
                            </div>
                            <div
                                className="sidebar-categories"
                                onClick={() => onSizesClicked("XL")}
                            >
                                XL
                            </div>
                        </div>
                    </div>
                </div>
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
                                style={{
                                    cursor: "pointer",
                                    transform: "translateY(3px)",
                                }}
                                onClick={onGridClick}
                                color={view == "grid" ? "black" : "gray"}
                            />
                        </div>
                        <div>
                            <PiList
                                size={30}
                                style={{
                                    cursor: "pointer",
                                    transform: "translateY(2px)",
                                }}
                                onClick={onListClick}
                                color={view == "list" ? "black" : "gray"}
                            />
                        </div>
                    </div>
                    <div style={{ cursor: "pointer", marginRight: "20px" }}>
                        <Select
                            defaultValue="az"
                            onChange={onSortClicked}
                            style={{ width: 240 }}
                        >
                            <Option value="az">
                                SORT BY ALPHABETICALLY, A-Z
                            </Option>
                            <Option value="za">
                                SORT BY ALPHABETICALLY, Z-A
                            </Option>
                            <Option value="priceLowHigh">
                                SORT BY PRICE: LOW TO HIGH
                            </Option>
                            <Option value="priceHighLow">
                                SORT BY PRICE: HIGH TO LOW
                            </Option>
                            <Option value="dateOldNew">
                                SORT BY DATE: OLD TO NEW
                            </Option>
                            <Option value="dateNewOld">
                                SORT BY DATE: NEW TO OLD
                            </Option>
                        </Select>
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
                                            <div
                                                className={
                                                    view == "list"
                                                        ? "productFigureContainerList"
                                                        : "productFigureContainerGrid"
                                                }
                                            >
                                                <div
                                                    className={
                                                        view == "list"
                                                            ? "image-caption-list"
                                                            : "image-caption-grid"
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            view == "list"
                                                                ? "product-card-list"
                                                                : "product-card"
                                                        }
                                                    >
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
                                                                <PiEye className="overlayIcons" />
                                                            </button>
                                                            <button className="overlayButton">
                                                                <PiHeart className="overlayIcons" />
                                                            </button>
                                                            <button className="overlayButton">
                                                                <PiScales className="overlayIcons" />
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
                                                                    <PiBag
                                                                        size={
                                                                            20
                                                                        }
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
                                                    <div
                                                        className={
                                                            view == "list"
                                                                ? "price-size-list"
                                                                : "price-size-grid"
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                            key={index}
                                                        >
                                                            {
                                                                product.product_name
                                                            }
                                                        </div>
                                                        <div
                                                            className={
                                                                view == "list"
                                                                    ? "description-list"
                                                                    : "description-grid"
                                                            }
                                                        >
                                                            {
                                                                product.product_description
                                                            }
                                                        </div>
                                                        <div key={index}>
                                                            $
                                                            {
                                                                product.product_price
                                                            }
                                                        </div>
                                                        <div
                                                            key={index}
                                                            className={
                                                                sizes.length ===
                                                                0
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
                                                    </div>
                                                </div>
                                            </div>
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
