import React, { useState, useContext, useEffect } from "react";
import "./ReviewSection.css";
import { Carousel } from "antd";
import { FaRegCircle } from "react-icons/fa";
import { ReviewsContext } from "../../Contexts/ReviewContext";
import Spinner from "./Spinner";
import useScreenWidth from "./useScreenWidth";

const ReviewSection = () => {
    const screenWidth = useScreenWidth();
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = React.useRef(null);
    const [loading, setLoading] = useState(true);

    const { state, fetchReviews } = useContext(ReviewsContext);

    useEffect(() => {
        fetchReviews();
        setLoading(false);
    }, []);

    const onChangeSlide = (current) => {
        setCurrentSlide(current);
    };

    const goToSlide = (index) => {
        carouselRef.current.goTo(index);
        setCurrentSlide(index);
    };

    return (
        <section id="reviews-section">
            <div
                className={
                    screenWidth > 800
                        ? "review-section-parent"
                        : "review-section-parent-mobile"
                }
            >
                <div
                    className={
                        screenWidth > 800
                            ? "review-section-image"
                            : "review-section-image-mobile"
                    }
                >
                    <img
                        src="https://cleversoft-moleez.myshopify.com/cdn/shop/files/moleez-img-80_2048x.jpg?v=1613753272"
                        alt="photo"
                        className="review-image"
                    />
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div
                            className="review-feedback"
                            style={{
                                width: screenWidth > 800 ? "50%" : "100%",
                                height: "100%",
                            }}
                        >
                            <Carousel
                                style={{ width: "100%", height: "100%" }}
                                adaptiveHeight={true}
                                dots={false}
                                ref={carouselRef}
                                beforeChange={(from, to) => onChangeSlide(to)}
                            >
                                {state &&
                                state.reviews &&
                                state.reviews.length > 0 ? (
                                    state.reviews.map((review, index) => (
                                        <div key={index}>
                                            <div
                                                className={
                                                    screenWidth > 800
                                                        ? "contentStyle"
                                                        : "contentStyle-mobile"
                                                }
                                            >
                                                <div className="carousel-text">
                                                    {
                                                        review.product_review_description
                                                    }
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            textTransform:
                                                                "capitalize",
                                                        }}
                                                    >
                                                        -
                                                        {review.user &&
                                                            review.user
                                                                .user_first_name}{" "}
                                                        {/* {review.user &&
                                                            review.user
                                                                .user_last_name}{" "} */}
                                                    </span>
                                                    on product{" "}
                                                    {review.product &&
                                                        review.product
                                                            .product_name}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        {" "}
                                        <Spinner />
                                    </>
                                )}
                            </Carousel>
                            <div
                                className={
                                    screenWidth > 800
                                        ? "custom-dots"
                                        : "custom-dots-mobile"
                                }
                            >
                                {[0, 1, 2].map((index) => (
                                    <FaRegCircle
                                        key={index}
                                        className={`dot-icon ${
                                            currentSlide === index
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => goToSlide(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ReviewSection;
