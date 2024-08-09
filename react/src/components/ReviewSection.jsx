import React, { useState, useEffect } from "react";
import "./ReviewSection.css";
import { Carousel } from "antd";
import { FaRegCircle } from "react-icons/fa";
import axios from "../api/axios";

const ReviewSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = React.useRef(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/productReviews"
                );
                console.log(response.data.reviews);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const onChangeSlide = (current) => {
        setCurrentSlide(current);
    };

    const goToSlide = (index) => {
        carouselRef.current.goTo(index);
        setCurrentSlide(index);
    };

    return (
        <div className="review-section-parent">
            <div className="review-section-image">
                <img
                    src="https://cleversoft-moleez.myshopify.com/cdn/shop/files/moleez-img-80_2048x.jpg?v=1613753272"
                    alt="photo"
                    className="review-image"
                />
            </div>
            <div
                className="review-feedback"
                style={{ width: "50%", height: "100%" }}
            >
                <Carousel
                    style={{ width: "100%", height: "100%" }}
                    adaptiveHeight={true}
                    dots={false}
                    ref={carouselRef}
                    beforeChange={(from, to) => onChangeSlide(to)}
                >
                    {reviews.map((review, index) => (
                        <div key={index}>
                            <div className="contentStyle">
                                <div className="carousel-text">
                                    {review.product_review_description}
                                </div>
                                <div>
                                    -{review.user.user_first_name}{" "}
                                    {review.user.user_last_name} on product{" "}
                                    {review.product.product_name}
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                <div className="custom-dots">
                    {[0, 1, 2].map((index) => (
                        <FaRegCircle
                            key={index}
                            className={`dot-icon ${
                                currentSlide === index ? "active" : ""
                            }`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
