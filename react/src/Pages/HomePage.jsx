import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import GoToProducts from "../components/GoToProducts";

const HomePage = () => {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <GoToProducts />
        </>
    );
};

export default HomePage;
