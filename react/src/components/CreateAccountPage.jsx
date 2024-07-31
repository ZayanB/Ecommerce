import React from "react";
import "./CreateAccountPage.css";

const CreateAccountPage = () => {
    return (
        <div className="MainContainerCreateAcc">
            <div className="Inputs">
                <form className="Form" action="">
                    <div className="Text">Create An Account</div>
                    <div className="pd-0">
                        <label htmlFor="firstName">
                            First Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input"
                            type="text"
                            id="firstname"
                            name="firstname"
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
                            required
                        />
                    </div>
                    <div className="pd-0">
                        <label htmlFor="password">
                            Birthday <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input"
                            type="date"
                            id="birthday"
                            name="birthday"
                            required
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <button className="CreateAccButton">
                            CREATE AN ACCOUNT
                        </button>
                    </div>
                </form>
                <div className="divider">
                    <span className="divider-text">Or</span>
                </div>
                <div style={{ width: "100%" }}>
                    <button className="SignInButton">SIGN IN</button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;
