import React, { useCallback, useEffect, useState } from "react";
import "./Search.css";
import { Drawer, Input, Button, List } from "antd";
import axios from "../api/axios";
import { PiMagnifyingGlass } from "react-icons/pi";
const { Search: AntdSearch } = Input;
import useScreenWidth from "./useScreenWidth";
import debounce from "lodash.debounce";

const Search = () => {
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ products: [], blogs: [] });
    // const [results, setResults] = useState([]);
    const screenWidth = useScreenWidth();

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    const performSearch = async (value) => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/search",
                {
                    params: { query: value },
                }
            );
            setResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    const debouncedSearch = useCallback(debounce(performSearch, 500), []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value); // Trigger search with debouncing
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
                height={400}
            >
                <AntdSearch
                    placeholder="Search for products or blogs..."
                    // enterButton="Search"
                    size="large"
                    value={query}
                    onChange={handleInputChange}
                />
                <div style={{ marginTop: 20 }}>
                    <h3>Products</h3>
                    <List
                        bordered
                        dataSource={results.products}
                        renderItem={(item) => (
                            <List.Item key={item.product_id_pkey}>
                                {item.product_name}
                            </List.Item>
                        )}
                    />

                    <h3 style={{ marginTop: 20 }}>Blogs</h3>
                    <List
                        bordered
                        dataSource={results.blogs}
                        renderItem={(item) => (
                            <List.Item key={item.id}>{item.title}</List.Item>
                        )}
                    />
                </div>
            </Drawer>
        </>
    );
};

export default Search;
