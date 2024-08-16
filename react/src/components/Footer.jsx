import React from "react";
import "./Footer.css";
import {
    FaFacebookF,
    FaInstagram,
    FaPinterest,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import useScreenWidth from "./useScreenWidth";
const Footer = () => {
    const screenWidth = useScreenWidth();
    return (
        <div className="footer-parent">
            <div
                className={
                    screenWidth > 800
                        ? "footer-main-container"
                        : "footer-main-container-mobile"
                }
            >
                <div className="footer-store">
                    <ul>
                        <span style={{ fontWeight: "600" }}>STORE</span>
                        <li style={{ marginTop: "13px" }}>
                            11100980 N.A City Brockey Street Sounth USA
                        </li>
                        <li>hello@example.co</li>
                        <li>+84 1100 686 86</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <span style={{ fontWeight: "600" }}>INFORMATION</span>
                        <li style={{ marginTop: "13px" }}>Shipping & Return</li>
                        <li>Track My Order</li>
                        <li>Term & Policy</li>
                        <li>FAQs</li>
                    </ul>
                </div>
                <div className="footer-news">
                    <ul>
                        <span style={{ fontWeight: "600" }}>NEWSLETTER</span>
                        <li style={{ marginTop: "13px" }}>
                            Subscribe to get daily news & more gif
                        </li>
                        <li style={{ width: "100%" }}>
                            <div className="footer-subscribe">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email Address"
                                        className={
                                            screenWidth > 800
                                                ? "subscribe-email"
                                                : "subscribe-email-mobile"
                                        }
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="subscibe-button"
                                    >
                                        SUBSCRIBE
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="footer-socials">
                                <div>
                                    <FaFacebookF
                                        size={20}
                                        className="footer-icon"
                                    />
                                </div>
                                <div>
                                    <FaInstagram
                                        size={20}
                                        className="footer-icon"
                                    />
                                </div>
                                <div>
                                    <FaXTwitter
                                        size={20}
                                        className="footer-icon"
                                    />
                                </div>
                                <div>
                                    <FaPinterest
                                        size={20}
                                        className="footer-icon"
                                    />
                                </div>
                                <div>
                                    <FaYoutube
                                        size={20}
                                        className="footer-icon"
                                    />
                                </div>
                            </div>
                        </li>
                        <li>
                            <img
                                src="https://cleversoft-moleez.myshopify.com/cdn/shop/files/paypal_2048x.png?v=1613737332"
                                alt="pay"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className={
                    screenWidth > 800
                        ? "footer-copyright"
                        : "footer-copyright-mobile"
                }
            >
                Copyright © 2019 ZooTemplate. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
