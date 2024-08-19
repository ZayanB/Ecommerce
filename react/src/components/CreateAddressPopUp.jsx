import React from "react";
import { Button, Modal } from "antd";
import CreateAddress from "./CreateAddress";
import { PiPlus } from "react-icons/pi";

const CreateAddressPopUp = ({ isModalVisible, showModal, handleCancel }) => {
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
                width="43vw"
                footer={null}
            >
                <CreateAddress />
            </Modal>
        </div>
    );
};

export default CreateAddressPopUp;
