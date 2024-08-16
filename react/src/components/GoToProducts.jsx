import React from "react";
import "./GoToProducts.css";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useEffect } from "react";
import useScreenWidth from "./useScreenWidth";
const GoToProducts = () => {
    const screenWidth = useScreenWidth();
    useEffect(() => {
        const handleScroll = () => {
            const parallax = document.querySelector(".parallax-container");
            const scrollPosition = window.pageYOffset;
            parallax.style.backgroundPositionY = `${scrollPosition * 0.009}px`;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={screenWidth>800?"parallax-container":"parallax-container-mobile"}>
            <div className="content">
                <h1>Home Plant</h1>
                <h3>Fresh your home space</h3>
                <Link to="/allProducts">
                    <button className="parallax-button">
                        DISCOVER NOW{" "}
                        <BsArrowRight
                            size={15}
                            style={{ transform: "translateY(2px)" }}
                        />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default GoToProducts;
