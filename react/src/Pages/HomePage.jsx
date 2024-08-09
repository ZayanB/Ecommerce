import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import GoToProducts from "../components/GoToProducts";
import HomeFooter from "../components/HomeFooter";

const HomePage = () => {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <GoToProducts />
            <HomeFooter />
        </>
    );
};

export default HomePage;
