import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import GoToProducts from "../components/GoToProducts";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <GoToProducts />
            {/* <Footer /> */}
        </>
    );
};

export default HomePage;
