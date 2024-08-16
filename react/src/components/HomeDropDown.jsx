import { React, useState, useEffect } from "react";
import "./HomeDropDown.css";
import axios from "../api/axios";
// import { Link } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import Spinner from "./Spinner";
import { parseISO, isWithinInterval, subDays } from "date-fns";
// import { useParams } from "react-router-dom";
import useScreenWidth from "./useScreenWidth";

const HomeDropDown = ({ onClose }) => {
    const screenWidth = useScreenWidth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const indexToRemove = 1;

    const updatedProducts = [
        ...products.slice(0, indexToRemove),
        ...products.slice(indexToRemove + 1),
    ];

    // const linkClass = ({ isActive }) => (isActive ? "nav-active" : "nav-non");
    const myData = {
        sort: "dateNewOld",
    };

    return (
        <>
            <div className="MainContainerDropdown">
                <div>
                    <ul className="columnList-dropdown">
                        <NavLink
                            className="dropdown-categories"
                            to="/allProducts"
                            
                        >
                            <li>SHOP</li>
                        </NavLink>
                        <NavLink className="dropdown-categories" >
                            <li>OUR FAVORITES</li>
                        </NavLink>

                        <NavLink
                            className="dropdown-categories"
                            to="/allProducts"
                            state={myData}
                        >
                            <li>NEW ARRIVALS</li>
                        </NavLink>
                    </ul>
                </div>
                <div
                    className={
                        screenWidth > 800
                            ? "dropdown-align-rows"
                            : "hide-display"
                    }
                >
                    <div style={{ paddingLeft: "3rem" }}>FEATURED PRODUCTS</div>
                    <div className="dropdown-products">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                {updatedProducts.map((product, index) => {
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
                                                                    product
                                                                        .image
                                                                        .length >
                                                                        0
                                                                        ? product
                                                                              .image[0]
                                                                              .image_url
                                                                        : "https://cleversoft-moleez.myshopify.com/cdn/shop/products/moleez-product-2a.jpg?v=1524713950"
                                                                }
                                                                alt="product"
                                                                className="dropdown-product-image"
                                                            />
                                                        </Link>
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
                                                    <p
                                                        style={{
                                                            marginBottom:
                                                                "0rem",
                                                            fontSize: "20px",
                                                            fontWeight: "500",
                                                        }}
                                                        key={index}
                                                    >
                                                        {product.product_name}
                                                    </p>
                                                    <p
                                                        style={{
                                                            marginTop: "0rem",
                                                            marginBottom:
                                                                "0rem",
                                                            fontSize: "15px",
                                                        }}
                                                        key={index}
                                                    >
                                                        ${product.product_price}
                                                    </p>
                                                </figcaption>
                                            </figure>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeDropDown;
