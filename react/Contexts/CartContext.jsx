import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "../src/api/axios";
import { notification } from "antd";

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0.0,
};
const cartReducer = (state, action) => {
    // console.log("Reducer called with action:", action);
    // console.log("Current state:", state);
    switch (action.type) {
        case "SET_CART_ITEMS":
            return { ...state, items: action.payload };
        case "ADD_TO_CART":
            return {
                ...state,
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice,
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                totalItems: state.totalItems - 1,
            };
        case "CLEAR_CART":
            return {
                items: [],
                totalItemCount: 0,
                totalPrice: 0,
            };
        default:
            return state;
    }
};
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const fetchCartItems = async () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            console.error("No access token found");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/getCart",
                { key: "value" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({
                type: "SET_CART_ITEMS",
                payload: {
                    items: response.data.cart_items,
                    totalItemCount: response.data.cart_items_count,
                    totalPrice: response.data.cart_total_price,
                },
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleSubmit = async (cartItem, token) => {
        try {
            // console.log("Sending cart item to server:", cartItem);
            const response = await axios.post(
                "http://127.0.0.1:8000/api/createItem",
                cartItem,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({ type: "ADD_TO_CART", payload: response.data.cartItem });
            notification.success({
                message: "Success",
                description: "Item added to cart successfully!",
                placement: "topRight",
                duration: 2,
            });
        } catch (error) {
            notification.error({
                message: "Error",
                description: "Cannot add item to cart",
                placement: "topRight",
                duration: 2,
            });
        }
    };

    const addToCart = (productid, productprice) => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                notification.error({
                    message: "Error",
                    description:
                        "Cannot add item to cart. Please log in and try again later.",
                    placement: "topRight",
                    duration: 2,
                });
                reject("User not authenticated");
                return;
            }

            const newCartItem = {
                productid: productid,
                productprice: productprice,
            };

            resolve({ cartItem: newCartItem, token });
        });
    };

    const handleAddToCart = async (productid, productprice) => {
        try {
            const { cartItem, token } = await addToCart(
                productid,
                productprice
            );
            await handleSubmit(cartItem, token);
            fetchCartItems(); // Refresh cart items after adding
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const handleRemoveItem = async (itemId, productprice) => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/removeCartItem",
                { productid: itemId },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: { id: itemId, productprice },
                });
                // console.log("Item removed successfully:", response.data);
                notification.success({
                    message: "Success",
                    description: "Item removed from cart successfully!",
                    placement: "topRight",
                    duration: 2,
                });
                fetchCartItems();
            } else {
                console.error("Failed to remove item:", response.data);
                notification.error({
                    message: "Error",
                    description: "Failed to remove item from cart",
                    placement: "topRight",
                    duration: 2,
                });
            }
        } catch (error) {
            console.error("Error removing item:", error);
            notification.error({
                message: "Error",
                description: "Error removing item from cart",
                placement: "topRight",
                duration: 2,
            });
        }
    };

    return (
        <CartContext.Provider
            value={{
                ...state,
                dispatch,
                handleAddToCart,
                handleRemoveItem,
                fetchCartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
