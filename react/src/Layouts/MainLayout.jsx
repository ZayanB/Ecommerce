import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
    return (
        <div className="layout-main-container">
            <div className="nav-lay">
                <NavBar />
            </div>
            <Outlet />
        </div>
    );
};

export default MainLayout;
