import React, { useState } from "react";
import axios from "axios";
import "./CreateAccountPage.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const CreateAccountPage = () => {
    const navigate = useNavigate();

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
            notification.error({
                message: "Error",
                description:
                    "Failed to create account: " +
                    Object.values(error.response.data.errors).join(" "),
                placement: "topRight",
                duration: 5,
            });
        }
    };

    return (
        <div className="MainContainerCreateAcc">
            <div className="Inputs">
                <form className="Form" onSubmit={handleSubmit}>
                    <div className="Text">Create An Account</div>

                    <div className="pd-0">
                        <label htmlFor="firstname">
                            First Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input"
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
                            className="Input"
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
                            className="Input"
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
                            className="Input"
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
                            className="Input"
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <button type="submit" className="CreateAccButton">
                            CREATE AN ACCOUNT
                        </button>
                    </div>
                </form>
                <div className="divider">
                    <span className="divider-text">Or</span>
                </div>
                <div style={{ width: "100%" }}>
                    <button onClick={handleClick} className="SignInButton">
                        SIGN IN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;
