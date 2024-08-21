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
} from "react-icons/pi";
import { useCart } from "../../Contexts/CartContext";
import { Select, Drawer, Button, notification } from "antd";
const { Option } = Select;
import useScreenWidth from "./useScreenWidth";
import ProductsPageSidebar from "./ProductsPageSidebar";

const ProductsPage = ({ product }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const location = useLocation();
    const screenWidth = useScreenWidth();
    const [view, setView] = useState("grid");

    const onGridClick = () => setView("grid");
    const onListClick = () => setView("list");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let initialFilter = {};
    if (location.state) {
        initialFilter = { sort: "dateNewOld" };
    }

    const [filters, setFilters] = useState(initialFilter);

    const onSortClicked = (sort) => {
        setFilters((prevState) => ({
            ...prevState,
            sort: sort,
        }));
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

                if (filters?.sort) {
                    url += `sort=${filters.sort}&`;
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

    const { handleAddToCart } = useCart();

    const handleClick = (product) => {
        handleAddToCart(product.product_id_pkey, product.product_price);
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    const addToCompare = async (product_id_pkey) => {
        const token = localStorage.getItem("access_token");

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/addProductCompare/${product_id_pkey}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            notification.success({
                message: "Success",
                description: "Product added for comparison",
                placement: "topRight",
                duration: 2,
            });
        } catch (error) {
            notification.error({
                message: "Error",
                description: "Product cannot be added for comparison",
                placement: "topRight",
                duration: 2,
            });
            console.error(
                "Error adding product to compare:",
                error.response ? error.response.data : error.message
            );
        }
    };

    return (
        <div className="productsMainContainer">
            {screenWidth > 800 ? (
                <ProductsPageSidebar
                    filters={filters}
                    setFilters={setFilters}
                />
            ) : (
                <></>
            )}
            <div className="rowColProd">
                <div className="category-Name">
                    {filters.categoryName} ({products.length})
                </div>
                <div
                    className={
                        screenWidth > 800
                            ? "viewContainer"
                            : "viewContainer-mobile"
                    }
                >
                    <div className="viewGridList">
                        <span
                            className={screenWidth > 800 ? "" : "hide-display"}
                        >
                            VIEW AS
                        </span>
                        <div
                            className={
                                screenWidth > 800
                                    ? "hide-display"
                                    : "mobile-filter"
                            }
                        >
                            <Button
                                type="primary"
                                ghost="true"
                                size="large"
                                style={{ color: "black" }}
                                className="cart-button"
                                onClick={showDrawer}
                            >
                                <PiList
                                    style={{ transform: "translateY(2px)" }}
                                />{" "}
                                FILTER
                            </Button>
                            <Drawer
                                title="Filters"
                                placement="left"
                                onClose={onClose}
                                visible={drawerVisible}
                            >
                                <ProductsPageSidebar
                                    filters={filters}
                                    setFilters={setFilters}
                                    onClose={onClose}
                                />
                            </Drawer>
                        </div>

                        <div
                            className={screenWidth > 800 ? "" : "hide-display"}
                        >
                            <PiSquaresFour
                                size={30}
                                style={{
                                    cursor: "pointer",
                                    transform: "translateY(3px)",
                                }}
                                onClick={onGridClick}
                                color={view == "grid" ? "orange" : "gray"}
                            />
                        </div>
                        <div
                            className={screenWidth > 800 ? "" : "hide-display"}
                        >
                            <PiList
                                size={30}
                                style={{
                                    cursor: "pointer",
                                    transform: "translateY(2px)",
                                }}
                                onClick={onListClick}
                                color={view == "list" ? "orange" : "gray"}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            cursor: "pointer",
                            marginRight: screenWidth > 800 ? "20px" : "5px",
                        }}
                    >
                        <Select
                            defaultValue="A-Z"
                            onChange={onSortClicked}
                            style={{ width: 240 }}
                        >
                            <Option value="A-Z">
                                SORT BY ALPHABETICALLY, A-Z
                            </Option>
                            <Option value="Z-A">
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
                {screenWidth > 800 ? (
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
                                                                    view ==
                                                                    "list"
                                                                        ? "image-list"
                                                                        : "image-grid"
                                                                }
                                                            >
                                                                <Link
                                                                    to={`/allProducts/${product.product_id_pkey}`}
                                                                >
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
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
                                                                <button
                                                                    className="overlayButton"
                                                                    onClick={() =>
                                                                        addToCompare(
                                                                            product.product_id_pkey
                                                                        )
                                                                    }
                                                                >
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
                                                                    view ==
                                                                    "list"
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
                                                                            {
                                                                                size
                                                                            }
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
                ) : (
                    <div className="mobile-products-page">
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
                                            <div className="allProducts-grid-mobile">
                                                <div className="image-caption-grid-mobile">
                                                    <div className="product-card-mobile">
                                                        <div className="image-size-mobile">
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
                                                    <div className="price-size-grid">
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
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
