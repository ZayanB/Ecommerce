import React, { useState } from "react";
import axios from "axios";
import "./CreateAccountPage.css";
import { useNavigate } from "react-router-dom";
import { notification, Alert } from "antd";
import useScreenWidth from "./useScreenWidth";

const CreateAccountPage = () => {
    const navigate = useNavigate();
    const screeWidth = useScreenWidth();
    const [accError, setAccError] = useState("");

    const handleClick = () => {
        navigate("/signIn");
    };

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        birthday: "",
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
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        // Referer: "http://localhost:5173/",
                    },
                }
            );
            notification.success({
                message: "Success",
                description: "Account created successfully!",
                placement: "topRight",
                duration: 2,
            });
            navigate("/signIn");
        } catch (error) {
            let tryError =
                "Failed to create account: <br/> " +
                Object.values(error.response.data.errors)
                    .map((err) => `${err}<br />`)
                    .join("");
            setAccError(tryError);
        }
    };

    return (
        <div className="MainContainerCreateAcc">
            <div className={screeWidth > 800 ? "Inputs" : "inputs-mobile"}>
                <form className="Form" onSubmit={handleSubmit}>
                    <div className="Text">Create An Account</div>
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
                        <label htmlFor="firstname">
                            First Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input-create"
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="pd-0">
                        <label htmlFor="lastname">
                            Last Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input-create"
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="pd-0">
                        <label htmlFor="email">
                            Your Email Address{" "}
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input-create"
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
                            Your Password{" "}
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input-create"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="pd-0">
                        <label htmlFor="birthday">
                            Birthday <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input-create"
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <button
                            type="submit"
                            className="CreateAccButton-createPage"
                        >
                            CREATE AN ACCOUNT
                        </button>
                    </div>
                </form>
                <div className="divider">
                    <span className="divider-text">Or</span>
                </div>
                <div style={{ width: "100%" }}>
                    <button
                        onClick={handleClick}
                        className="SignInButton-createPage"
                    >
                        SIGN IN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;
