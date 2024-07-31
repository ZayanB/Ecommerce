import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
    return (
        <div className="MainContainerLogin">
            <div className="Inputs">
                <form className="Form" action="">
                    <div className="Text">Sign In</div>
                    <div className="pd-0">
                        <label htmlFor="email">
                            Email Address{" "}
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
                            Password <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            className="Input"
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="Required">
                        <div style={{ color: "red" }}>* Required Fields</div>
                        <div className="ForgotPass">Forgot Your Password?</div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <button className="SignInButton">SIGN IN</button>
                    </div>
                </form>
                <div className="divider">
                    <span className="divider-text">Or</span>
                </div>
                <form className="Form1" action="">
                    <div style={{ width: "100%" }}>
                        <button className="CreateAccButton">
                            CREATE AN ACCOUNT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
