import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./AskAboutPopUp.css";

const AskAboutPopUp = ({ isModalVisible, showModal, handleCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        // Add your form submission logic here
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={showModal}
                className="size-popup-style"
                ghost="true"
                style={{ color: "black" }}
            >
                ASK ABOUT THIS PRODUCT
            </Button>
            <Modal
                title="Have a question?"
                visible={isModalVisible}
                onCancel={handleCancel}
                width="520px"
                footer={null}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{ maxWidth: "400px", margin: "0 auto" }}
                >
                    <div style={{ marginBottom: "16px" }}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "8px",
                                boxSizing: "border-box",
                                borderRadius: "0",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "8px",
                                boxSizing: "border-box",
                                borderRadius: "0",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <textarea
                            id="comment"
                            name="comment"
                            placeholder="Your Comment"
                            value={formData.comment}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                height: "100px",
                                padding: "8px",
                                boxSizing: "border-box",
                                borderRadius: "0",
                            }}
                        />
                    </div>

                    <button type="submit" className="ask-about-button">
                        SEND MESSAGE
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default AskAboutPopUp;
