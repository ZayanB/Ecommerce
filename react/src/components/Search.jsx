import React, { useCallback, useEffect, useState } from "react";
import "./Search.css";
import { Drawer, Input, Button, List, Spin } from "antd";
import axios from "../api/axios";
import { PiMagnifyingGlass } from "react-icons/pi";
const { Search: AntdSearch } = Input;
import useScreenWidth from "./useScreenWidth";
import debounce from "lodash.debounce";
import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";

const Search = () => {
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ products: [], blogs: [] });
    const screenWidth = useScreenWidth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    const performSearch = async (value) => {
        try {
            setLoading(true);
            const response = await axios.get(
                "http://127.0.0.1:8000/api/search",
                {
                    params: { query: value },
                }
            );
            setResults(response.data);
            setMessage(response.data.message);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching search results", error);
            setLoading(false);
        }
    };

    const debouncedSearch = useCallback(debounce(performSearch, 500), []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={showDrawer}
                ghost={true}
                className="search-icon"
            >
                <PiMagnifyingGlass
                    size={22}
                    style={{
                        transform:
                            screenWidth < 800
                                ? "translateY(4px) translateX(-7px)"
                                : "",
                    }}
                />
            </Button>
            <Drawer
                title="Search"
                placement="top"
                closable={true}
                onClose={closeDrawer}
                visible={visible}
                // height={800}
                className="search-drawer"
            >
                <AntdSearch
                    placeholder="Search for products or blogs..."
                    enterButton={
                        loading ? (
                            <>
                                <Spin />
                            </>
                        ) : (
                            <>
                                <PiMagnifyingGlass
                                    size={22}
                                    style={{ transform: "translateY(2px)" }}
                                />
                            </>
                        )
                    }
                    size="large"
                    value={query}
                    onChange={handleInputChange}
                />
                <div style={{ marginTop: 20 }}>
                    {loading ? (
                        <div style={{ transform: "translateY(-50px)" }}>
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            {results.products.length !== 0 ? (
                                <>
                                    <h3>Products</h3>
                                    <List
                                        bordered
                                        dataSource={results.products}
                                        renderItem={(item) => (
                                            <NavLink
                                                to={`/allProducts/${item.product_id_pkey}`}
                                                onClick={closeDrawer}
                                            >
                                                <List.Item
                                                    key={item.product_id_pkey}
                                                >
                                                    <div className="product-search-result">
                                                        <div>
                                                            {item.image &&
                                                                item.image
                                                                    .length >
                                                                    0 && (
                                                                    <img
                                                                        src={
                                                                            item
                                                                                .image[0]
                                                                                .image_url
                                                                        }
                                                                        alt={
                                                                            item.product_name
                                                                        }
                                                                        style={{
                                                                            width: "50px",
                                                                            marginRight:
                                                                                "10px",
                                                                        }}
                                                                    />
                                                                )}
                                                        </div>
                                                        <div className="product-search-name-price">
                                                            <div>
                                                                {
                                                                    item.product_name
                                                                }
                                                            </div>
                                                            <div>
                                                                $
                                                                {
                                                                    item.product_price
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </List.Item>
                                            </NavLink>
                                        )}
                                    />
                                </>
                            ) : (
                                <>
                                    {message ===
                                    "No products or blogs found." ? (
                                        <>
                                            No products or blogs matching "
                                            {query}"
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}

                            {results.blogs.length !== 0 ? (
                                <>
                                    <h3 style={{ marginTop: 20 }}>Blogs</h3>
                                    <List
                                        bordered
                                        dataSource={results.blogs}
                                        renderItem={(item) => (
                                            <NavLink
                                                to={`/Blog/${item.blog_id}`}
                                                onClick={closeDrawer}
                                            >
                                                <List.Item key={item.blog_id}>
                                                    <div className="product-search-result">
                                                        <div>
                                                            {item.product &&
                                                                item.product
                                                                    .image &&
                                                                item.product
                                                                    .image
                                                                    .length >
                                                                    0 && (
                                                                    <img
                                                                        src={
                                                                            item
                                                                                .product
                                                                                .image[0]
                                                                                .image_url
                                                                        }
                                                                        alt={
                                                                            item.title
                                                                        }
                                                                        style={{
                                                                            width: "50px",
                                                                            marginRight:
                                                                                "10px",
                                                                        }}
                                                                    />
                                                                )}
                                                        </div>
                                                        <div className="product-search-name-price">
                                                            <div>
                                                                {item.title}
                                                            </div>
                                                            <div>
                                                                By:{" "}
                                                                {
                                                                    item.author_name
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </List.Item>
                                            </NavLink>
                                        )}
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </div>
            </Drawer>
        </>
    );
};

export default Search;
