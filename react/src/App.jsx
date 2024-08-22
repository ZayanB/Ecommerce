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

import SingleProductPage from "./Pages/SingleProductPage";
import BuyProductPage from "./Pages/BuyProductPage";
import MyAccountPage from "./Pages/MyAccountPage";
import BlogPage from "./Pages/BlogPage";
import SingleBlogPage from "./Pages/SingleBlogPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/createAcc" element={<CreateAccountsPage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/allProducts" element={<ProductView />} />
            <Route
                path="/allProducts/:productId"
                element={<SingleProductPage />}
            />
            <Route path="/buyProduct/:productId" element={<BuyProductPage />} />
            <Route path="/buyProduct/cart" element={<BuyProductPage />} />
            <Route path="/MyAccount" element={<MyAccountPage />} />
            <Route path="/Blog" element={<BlogPage />} />
            <Route path="/Blog/:blogId" element={<SingleBlogPage />} />
        </Route>
    )
);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
