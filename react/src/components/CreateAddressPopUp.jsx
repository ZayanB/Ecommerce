import React from "react";
import { Button, Modal } from "antd";
import CreateAddress from "./CreateAddress";
import { PiPlus } from "react-icons/pi";
import useScreenWidth from "./useScreenWidth";

const CreateAddressPopUp = ({ isModalVisible, showModal, handleCancel }) => {
    const screenWidth = useScreenWidth();
    return (
        <div>
            <Button
                type="primary"
                onClick={showModal}
                // className="size-popup-style"
                ghost="true"
                style={{ color: "black", width: "auto" }}
            >
                <PiPlus /> Add New Address
            </Button>
            <Modal
                title=""
                visible={isModalVisible}
                onCancel={handleCancel}
                width={screenWidth > 800 ? "43vw" : "80vw"}
                footer={null}
            >
                <CreateAddress />
            </Modal>
        </div>
    );
};

export default CreateAddressPopUp;
