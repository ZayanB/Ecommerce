import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "../Contexts/CartContext";
import { ReviewsProvider } from "../Contexts/ReviewContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CartProvider>
            <ReviewsProvider>
                <App />
            </ReviewsProvider>
        </CartProvider>
    </React.StrictMode>
);
