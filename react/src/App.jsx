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
// import { CartProvider } from "../Contexts/CartContext";

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
        </Route>
    )
);

const App = () => {
    return (
        <>
            {/* <CartProvider> */}
                <RouterProvider router={router} />
            {/* </CartProvider> */}
        </>
    );
};

export default App;
