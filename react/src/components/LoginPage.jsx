import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification, Alert } from "antd";
import useScreenWidth from "./useScreenWidth";

const LoginPage = () => {
    const navigate = useNavigate();
    const screenWidth = useScreenWidth();
    const [accError, setAccError] = useState("");

    const handleClick = () => {
        navigate("/createAcc");
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        // Referer: "http://localhost:5173/",
                    },
                }
            );
            localStorage.setItem("access_token", response.data.access_token);
            navigate("/");
            notification.success({
                message: "Success",
                description: "Login successful!!",
                placement: "topRight",
                duration: 2,
            });
        } catch (error) {
            let tryError =
                "Failed to sign in: <br/> " +
                Object.values(error.response.data.errors)
                    .map((err) => `${err}<br />`)
                    .join("");
            setAccError(tryError);
        }
    };

    return (
        <div className="MainContainerLogin">
            <div
                className={
                    screenWidth > 800 ? "Inputs-signIn" : "input-sign-in-mobile"
                }
            >
                <form className="Form" onSubmit={handleSubmit}>
                    <div className="Text">Sign In</div>
                    {accError ? (
                        <div>
                            <Alert
                                message={
                                    <span
                                        style={{
                                            textAlign: "center",
                                            display: "block",
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: accError,
                                        }}
                                    />
                                }
                                type="error"
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="pd-0">
                        <label htmlFor="email">
                            Email Address{" "}
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input-sign-in "
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="pd-0">
                        <label htmlFor="password">
                            Password <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input-sign-in "
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="Required">
                        <div style={{ color: "red" }}>* Required Fields</div>
                        <div className="ForgotPass">Forgot Your Password?</div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <button
                            type="submit"
                            className="SignInButton-sign-in-page"
                        >
                            SIGN IN
                        </button>
                    </div>
                </form>
                <div className="divider">
                    <span className="divider-text">Or</span>
                </div>
                <form
                    className={screenWidth > 800 ? "Form1" : "Form1-mobile"}
                    action=""
                >
                    <div style={{ width: "100%" }}>
                        <button
                            onClick={handleClick}
                            className="CreateAccButton-sign-in-page"
                        >
                            CREATE AN ACCOUNT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
