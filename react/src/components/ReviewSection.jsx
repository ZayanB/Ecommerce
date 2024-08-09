import React, { useState } from "react";
import "./ReviewSection.css";
import { Carousel } from "antd";
import { FaRegCircle } from "react-icons/fa";

const ReviewSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = React.useRef(null);

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
                    <div>
                        <div className="contentStyle">
                            <div className="carousel-text">
                                I did 4 days of research trying to find the best
                                theme possible for our requirements and this is
                                definitely the one.
                            </div>
                            <div>-Zayan Breish</div>
                        </div>
                    </div>
                    <div>
                        <div className="contentStyle">Page 2</div>
                    </div>
                    <div>
                        <div className="contentStyle">Page 3</div>
                    </div>
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
