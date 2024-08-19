import React from "react";
import { Button, Modal } from "antd";
import "./SizePopUp.css";
import useScreenWidth from "../components/useScreenWidth";

const SizePopUp = ({ isModalVisible, showModal, handleCancel }) => {
    const screenWidth = useScreenWidth();
    return (
        <div>
            <Button
                type="primary"
                onClick={showModal}
                className="size-popup-style"
                ghost="true"
                style={{ color: "black" }}
            >
                SIZE GUIDE
            </Button>
            <Modal
                title=""
                visible={isModalVisible}
                onCancel={handleCancel}
                width="850px"
                footer={null}
            >
                <img
                    src="https://cdn.shopify.com/s/files/1/2430/0687/files/size.png?2736223395040126550"
                    alt="size-guide"
                    style={{
                        transform:
                            screenWidth < 800
                                ? "scale(0.5) translateX(-55%)"
                                : "",
                    }}
                />
            </Modal>
        </div>
    );
};

export default SizePopUp;
