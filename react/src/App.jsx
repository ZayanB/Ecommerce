import React from "react";

import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    Router,
    RouterProvider,
} from "react-router-dom";

import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import CreateAccountsPage from "./Pages/CreateAccountsPage";
import SignInPage from "./Pages/SignInPage";
import ProductView from "./Pages/ProductView";
import "./App.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/createAcc" element={<CreateAccountsPage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/allProducts" element={<ProductView />} />
        </Route>
    )
);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>

        // <div className="MAIN">
        //     {/* <NavBar /> */}
        //     {/* <Hero /> */}
        //     {/* <FeaturedProducts /> */}
        //     {/* <LoginPage /> */}
        //     {/* <CreateAccountPage /> */}
        //     {/* <ProductsPage /> */}
        // </div>
    );
};

export default App;
