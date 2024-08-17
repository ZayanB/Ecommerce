import React, { useEffect, useState } from "react";
import useScreenWidth from "./useScreenWidth";
import axios from "../api/axios";
import { PiCaretDown } from "react-icons/pi";

const ProductsPageSidebar = ({ filters, setFilters, onClose }) => {
    const screenWidth = useScreenWidth();
    const [categories, setCategories] = useState([]);
    const [menu, setMenu] = useState(true);
    const [menuSize, setMenuSize] = useState(true);

    useEffect(() => {
        if (screenWidth > 700) {
            setMenu(false);
            setMenuSize(false);
        }
    }, [screenWidth]);

    const onCategoryClicked = (categoryId, categoryName) => {
        setFilters((prevState) => ({
            ...prevState,
            categoryId: categoryId,
            categoryName: categoryName,
        }));
        onClose();
    };

    const onSizesClicked = (size) => {
        setFilters((prevState) => ({
            ...prevState,
            size: size,
        }));
        onClose();
    };

    const keysToInclude = ["categoryName", "size"];

    const clearFilter = () => {
        setFilters({});
        onClose();
    };

    const onMenuClick = () => setMenu(!menu);
    const onMenuSizeClick = () => setMenuSize(!menuSize);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/categories");
                setCategories(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className={screenWidth > 800 ? "products-sidebar" : ""}>
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
                    <span className="sidebar-hover" onClick={onMenuClick}>
                        COLLECTIONS{" "}
                        <span
                            className={screenWidth > 800 ? "" : "hide-display"}
                        >
                            <PiCaretDown
                                style={{ transform: "translateY(2px)" }}
                            />
                        </span>
                    </span>
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
                    <span className="sidebar-hover" onClick={onMenuSizeClick}>
                        SIZE{" "}
                        <span
                            className={screenWidth > 800 ? "" : "hide-display"}
                        >
                            <PiCaretDown
                                style={{ transform: "translateY(2px)" }}
                            />
                        </span>
                    </span>
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
    );
};

export default ProductsPageSidebar;
