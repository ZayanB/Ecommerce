import React, { useEffect, useState } from "react";
import "./CompareProducts.css";
import { PiScales, PiX } from "react-icons/pi";
import { Modal, Button, notification, Badge } from "antd";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import useScreenWidth from "./useScreenWidth";

const CompareProducts = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [comparedItems, setComparedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removeLoading, setRemoveLoading] = useState(false);
    const screenWidth = useScreenWidth();

    const parseProductSize = (sizeString) => {
        if (!sizeString) {
            return [];
        }
        return sizeString.replace(/[{}]/g, "").split(",");
    };

    useEffect(
        () => {
            const fetchItems = async () => {
                const token = localStorage.getItem("access_token");
                try {
                    const response = await axios.post(
                        "http://127.0.0.1:8000/api/getProductCompare",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    // console.log(response.data);
                    setComparedItems(response.data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchItems();
        },
        // []
        [comparedItems]
    );
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const removeCompare = async (compareItemId) => {
        const token = localStorage.getItem("access_token");
        setRemoveLoading(true);
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/deleteProductCompare/${compareItemId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRemoveLoading(false);
            notification.success({
                message: "Success",
                description: "Product removed from comparison",
                placement: "topRight",
                duration: 2,
            });
        } catch (error) {
            setRemoveLoading(false);
            setError(error.message);
            notification.error({
                message: "Error",
                description: "Cannot remove product from comparison",
                placement: "topRight",
                duration: 2,
            });
        } finally {
            setLoading(false);
        }
    };
    const productsToCompare = comparedItems.length;

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                className="cart-button"
                ghost={true}
            >
                <Badge
                    count={productsToCompare}
                    // size="small"
                    style={{
                        transform:
                            screenWidth < 800
                                ? "translateX(32px) translateY(-5px)"
                                : "translateX(17px) translateY(-9px)",
                    }}
                >
                    <PiScales
                        size={23}
                        style={{
                            transform:
                                screenWidth > 800
                                    ? "translateX(6px)"
                                    : "translateY(4px) translateX(20px) ",
                        }}
                    />
                </Badge>
            </Button>
            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                centered={true}
                // width="auto"
                width={900}
                className="compare-modal"
                closable={false}
            >
                <div>
                    {loading ? (
                        <>
                            <Spinner />
                        </>
                    ) : (
                        <>
                            {comparedItems.length > 0 ? (
                                <>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Product</th>
                                                {comparedItems.length > 0 ? (
                                                    comparedItems.map(
                                                        (item, index) => {
                                                            const product =
                                                                item.product;
                                                            const image =
                                                                product.image &&
                                                                product.image
                                                                    .length > 0
                                                                    ? product
                                                                          .image[0]
                                                                          .image_url
                                                                    : null;

                                                            return (
                                                                <td
                                                                    key={index}
                                                                    style={{
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {image && (
                                                                        <div
                                                                            style={{
                                                                                position:
                                                                                    "relative",
                                                                                display:
                                                                                    "inline-block",
                                                                            }}
                                                                        >
                                                                            <div className="remove-compare-icon">
                                                                                <PiX
                                                                                    onClick={() =>
                                                                                        removeCompare(
                                                                                            item.comapre_items_id_pkey
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Link
                                                                                    to={`/allProducts/${product.product_id_pkey}`}
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            image
                                                                                        }
                                                                                        alt={
                                                                                            product.product_name
                                                                                        }
                                                                                        style={{
                                                                                            width: "240px",
                                                                                            height: "270px",
                                                                                        }}
                                                                                    />
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <td>
                                                        No products to compare.
                                                    </td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th>Name</th>

                                                {comparedItems.length > 0 ? (
                                                    comparedItems.map(
                                                        (item, index) => {
                                                            const product =
                                                                item.product;
                                                            return (
                                                                <td
                                                                    key={index}
                                                                    style={{
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {
                                                                        product.product_name
                                                                    }
                                                                </td>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <td>
                                                        No products to compare.
                                                    </td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th>Price</th>

                                                {comparedItems.length > 0 ? (
                                                    comparedItems.map(
                                                        (item, index) => {
                                                            const product =
                                                                item.product;
                                                            return (
                                                                <td
                                                                    key={index}
                                                                    style={{
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    $
                                                                    {
                                                                        product.product_price
                                                                    }
                                                                </td>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <td>
                                                        No products to compare.
                                                    </td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th>Description</th>
                                                {comparedItems.length > 0 ? (
                                                    comparedItems.map(
                                                        (item, index) => {
                                                            const product =
                                                                item.product;
                                                            return (
                                                                <td
                                                                    key={index}
                                                                    style={{
                                                                        paddingLeft:
                                                                            "0.5rem",
                                                                    }}
                                                                >
                                                                    {
                                                                        product.product_description
                                                                    }
                                                                </td>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <td>
                                                        No products to compare.
                                                    </td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th>Rating</th>
                                                {comparedItems.length > 0 ? (
                                                    comparedItems.map(
                                                        (item, index) => {
                                                            const product =
                                                                item.product;
                                                            return (
                                                                <td
                                                                    key={index}
                                                                    style={{
                                                                        paddingLeft:
                                                                            "0.5rem",
                                                                    }}
                                                                >
                                                                    {product.average_rating !=
                                                                    0
                                                                        ? `Rated ${product.average_rating} on average`
                                                                        : "Not rated yet"}
                                                                </td>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <td>
                                                        No products to compare.
                                                    </td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th>Sizes</th>
                                                {comparedItems.length > 0 ? (
                                                    comparedItems.map(
                                                        (item, index) => {
                                                            const product =
                                                                item.product;
                                                            const sizes =
                                                                product.product_size &&
                                                                product
                                                                    .product_size
                                                                    .length > 0
                                                                    ? parseProductSize(
                                                                          product.product_size
                                                                      )
                                                                    : [];

                                                            return (
                                                                <td key={index}>
                                                                    <div className="sizes-compare-display">
                                                                        {sizes.length >
                                                                        0 ? (
                                                                            sizes.map(
                                                                                (
                                                                                    size,
                                                                                    sizeIndex
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            sizeIndex
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            size
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                            )
                                                                        ) : (
                                                                            <span>
                                                                                No
                                                                                sizes
                                                                                available
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <td>No sizes available.</td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th>Category</th>
                                                {comparedItems.length > 0 ? (
                                                    comparedItems.map(
                                                        (item, index) => {
                                                            const product =
                                                                item.product;
                                                            return (
                                                                <td
                                                                    key={index}
                                                                    style={{
                                                                        paddingLeft:
                                                                            "0.5rem",
                                                                    }}
                                                                >
                                                                    {
                                                                        product
                                                                            .category
                                                                            .category_name
                                                                    }
                                                                </td>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <td>
                                                        No products to compare.
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <div style={{ textAlign: "center" }}>
                                    No Products To Compare
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};
export default CompareProducts;
