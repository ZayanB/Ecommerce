import React from "react";
import SingleProduct from "../components/SingleProduct";
import useScreenWidth from "../components/useScreenWidth";
import SingleProductMobile from "../components/SingleProductMobile";
const SingleProductPage = () => {
    const screenWidth = useScreenWidth();
    return (
        <>{screenWidth > 800 ? <SingleProduct /> : <SingleProductMobile />}</>
    );
};

export default SingleProductPage;
