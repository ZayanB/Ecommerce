import React, { useEffect, useState } from "react";
import "./CompareProducts.css";
import { PiScales } from "react-icons/pi";
import { Modal, Button } from "antd";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const CompareProducts = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [comparedItems, setComparedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    console.log(response.data);
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
    // const sizes = parseProductSize(comparedItems.product_size);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                className="cart-button"
                ghost={true}
            >
                <PiScales size={23} style={{ transform: "translateX(6px)" }} />
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
                                                                    <div className="sizes-compare-display ">
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
