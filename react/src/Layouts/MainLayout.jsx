import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import ScrollToTop from "../components/ScrollToTop";
import { useCart } from "../../Contexts/CartContext";

const MainLayout = () => {
    const { fetchCartItems } = useCart();

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className="layout-main-container">
            <div className="nav-lay">
                <NavBar />
            </div>
            <Outlet />
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default MainLayout;
