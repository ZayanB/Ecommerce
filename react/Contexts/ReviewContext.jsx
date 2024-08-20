import React, { createContext, useContext, useReducer } from "react";
import axios from "../src/api/axios";
import { notification } from "antd";

const reviewsReducer = (state, action) => {
    switch (action.type) {
        case "ADD_REVIEW":
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
            };
        case "SET_REVIEWS":
            return {
                ...state,
                reviews: action.payload,
            };
        default:
            return state;
    }
};

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
    const initialState = {
        reviews: [],
    };

    const [state, dispatch] = useReducer(reviewsReducer, initialState);

    const addReview = async (reviewData, resetForm) => {
        try {
            const token = localStorage.getItem("access_token");

            const response = await axios.post(
                "http://127.0.0.1:8000/api/addProductReview",
                reviewData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Dispatch the action to add review to state
            dispatch({ type: "ADD_REVIEW", payload: reviewData });

            notification.success({
                message: "Success",
                description: "Review added successfully!",
                placement: "topRight",
                duration: 2,
            });
            resetForm();
            fetchReviews();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                notification.error({
                    message: "Error",
                    description: Object.values(error.response.data.errors).join(
                        ", "
                    ),
                    placement: "topRight",
                    duration: 2,
                });
            } else {
                notification.error({
                    message: "Error",
                    description:
                        "User Not Authenticated. Please log in and try again later. ",
                    placement: "topRight",
                    duration: 2,
                });
            }
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/productReviews"
            );
            dispatch({ type: "SET_REVIEWS", payload: response.data });
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    return (
        <ReviewsContext.Provider
            value={{ state, dispatch, addReview, fetchReviews }}
        >
            {children}
        </ReviewsContext.Provider>
    );
};

export { ReviewsContext, ReviewsProvider };
