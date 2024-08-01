import React, { useState } from "react";
import "./Hero.css";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { FaRegCircle } from "react-icons/fa";
import images from "../assets/data/sliderData.json";

const Hero = () => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === images.length - 1 ? 0 : slide + 1);
    };

    const previousSlide = () => {
        setSlide(slide === 0 ? images.length - 1 : slide - 1);
    };

    return (
        <div>
            {images.map((img, index) => (
                <div
                    key={index}
                    className={
                        slide === index
                            ? `MainContainerHero ${img.backgorund}`
                            : "main-hidden"
                    }
                    style={{ height: "30rem" }}
                >
                    <div>
                        <SlArrowLeft
                            className="ArrowLeft"
                            onClick={previousSlide}
                        />
                    </div>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={
                                slide === index
                                    ? `${image.style}`
                                    : " main-hidden"
                            }
                        >
                            <div
                                className={`${image.containerStyle} ${image.style}`}
                            >
                                <h2 className={image.header1Style}>
                                    {image.header2}
                                </h2>

                                <h1
                                    className={image.header2Style}
                                    style={{ whiteSpace: "pre-wrap" }}
                                >
                                    {image.header1}
                                </h1>
                                <p className={image.paragraphStyle}>
                                    {image.description}
                                </p>
                                <button className={image.buttonStyle}>
                                    {image.buttonText}
                                </button>
                                <br />
                            </div>
                            <div className="slider">
                                {images.map((_, index) => (
                                    <FaRegCircle
                                        className={
                                            slide === index
                                                ? "circle-active"
                                                : "circle"
                                        }
                                        onClick={() => setSlide(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div>
                        <SlArrowRight
                            className="ArrowRight"
                            onClick={nextSlide}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hero;
