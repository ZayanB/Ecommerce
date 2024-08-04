import React from "react";

import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import CreateAccountPage from "./components/CreateAccountPage";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductsPage from "./components/ProductsPage";
import "./App.css";

const App = () => {
    return (
        <div className="MAIN">
            {/* <NavBar /> */}
            {/* <Hero /> */}
            {/* <FeaturedProducts /> */}
            <LoginPage />
            {/* <CreateAccountPage /> */}
            {/* <ProductsPage /> */}
        </div>
    );
};

export default App;
