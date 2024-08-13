import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
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
