import React from "react";
import { Button, Modal } from "antd";
import "./DeliveryPopUp.css";

const DeliveryPopUp = ({ isModalVisible, showModal, handleCancel }) => {
    return (
        <div>
            <Button
                type="primary"
                onClick={showModal}
                className="size-popup-style"
                ghost="true"
                style={{ color: "black" }}
            >
                DELIVERY & RETURN
            </Button>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                width="850px"
                footer={null}
            >
                <ul className="del-pop-ul">
                    SHIPPING
                    <li style={{ marginTop: "10px" }}>
                        Complimentary ground shipping within 1 to 7 business
                        days
                    </li>
                    <li>
                        In-store collection available within 1 to 7 business
                        days
                    </li>
                    <li>
                        Next-day and Express delivery options also available
                    </li>
                    <li>
                        Purchases are delivered in an orange box tied with a
                        Bolduc ribbon, with the exception of certain items
                    </li>
                    <li>
                        See the delivery FAQs for details on shipping methods,
                        costs and delivery times
                    </li>
                </ul>
                <ul className="del-pop-ul">
                    RETURNS AND EXCHANGES
                    <li style={{ marginTop: "10px" }}>
                        Easy and complimentary, within 14 days
                    </li>
                    <li>See conditions and procedure in our return FAQs</li>
                </ul>
            </Modal>
        </div>
    );
};

export default DeliveryPopUp;
