import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import GoToProducts from "../components/GoToProducts";
import HomeFooter from "../components/HomeFooter";
import ReviewSection from "../components/ReviewSection";
import useScrollToHash from "../components/useScrollToHash";

const HomePage = () => {
    useScrollToHash();
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <GoToProducts />
            <ReviewSection />
            <HomeFooter />
        </>
    );
};

export default HomePage;
