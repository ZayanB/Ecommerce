import React, { useState } from "react";
import "./CompareProducts.css";
import { PiScales } from "react-icons/pi";
import { Modal, Button } from "antd";

const CompareProducts = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                className="cart-button"
                ghost={true}
                >
                <PiScales size={23} style={{ transform: "translateX(6px)" }} />
            </Button>
            <Modal
                title="Compare Products"
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                {/* Your content goes here */}
            </Modal>
        </>
    );
};
export default CompareProducts;
