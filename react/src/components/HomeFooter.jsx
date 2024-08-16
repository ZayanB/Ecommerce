import React from "react";
import {
    PiShoppingCartSimple,
    PiWallet,
    PiLockKey,
    PiHeadset,
} from "react-icons/pi";
import "./HomeFooter.css";
import useScreenWidth from "./useScreenWidth";

const HomeFooter = () => {
    const screenWidth = useScreenWidth();
    return (
        <div
            className={
                screenWidth > 800
                    ? "home-footer-parent"
                    : "home-footer-parent-mobile"
            }
        >
            <div className="home-footer-col">
                <div>
                    <PiShoppingCartSimple
                        size={45}
                        style={{
                            transform: "translateY(15px)",
                            color: "black",
                        }}
                    />
                </div>
                <div>
                    <h3>FREE SHIPPING</h3>
                    <h4>Free with order over $99</h4>
                </div>
            </div>
            <div className="home-footer-col">
                <div>
                    <PiWallet
                        size={45}
                        style={{
                            transform: "translateY(19px)",
                            color: "black",
                        }}
                    />
                </div>
                <div>
                    <h3>MONEY BACK GUARANTEE</h3>
                    <h4>Refund policy within 30 days</h4>
                </div>
            </div>
            <div className="home-footer-col">
                <div>
                    <PiLockKey
                        size={45}
                        style={{
                            transform: "translateY(19px)",
                            color: "black",
                        }}
                    />
                </div>
                <div>
                    <h3>SECURE PAYMENT</h3>
                    <h4>100% Secure Payment</h4>
                </div>
            </div>
            <div className="home-footer-col">
                <div>
                    <PiHeadset
                        size={45}
                        style={{
                            transform: "translateY(17px)",
                            color: "black",
                        }}
                    />
                </div>
                <div>
                    <h3>SUPPORT ALL TIME 24/7</h3>
                    <h4>Every time, Every where</h4>
                </div>
            </div>
        </div>
    );
};

export default HomeFooter;
