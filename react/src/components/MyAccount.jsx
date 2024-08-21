import { React, useState, useEffect } from "react";
import {
    Layout,
    Menu,
    Card,
    Row,
    Col,
    notification,
    Button,
    Drawer,
} from "antd";
import axios from "../api/axios";
import "./MyAccount.css";
import {
    PiUserCircle,
    PiBag,
    PiMapPin,
    PiUserList,
    PiPencil,
    PiTrash,
} from "react-icons/pi";
import Spinner from "./Spinner";
const { Sider, Content } = Layout;
import CreateAddressPopUp from "./CreateAddressPopUp";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import useScreenWidth from "./useScreenWidth";
import UpdateAddress from "./UpdateAddress";

const MyAccount = () => {
    const [selectedMenu, setSelectedMenu] = useState("1");
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasAddress, setHasAddress] = useState([]);
    const [newAddress, setNewAddress] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);
    const navigate = useNavigate();
    const screenWidth = useScreenWidth();
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleMenuClick = (e) => {
        setSelectedMenu(e.key);
        onClose();
    };
    const showNewAddress = () => {
        setNewAddress(true);
    };

    const hideNewAddress = () => {
        setNewAddress(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                console.error("No access token found");
                setLoading(false);
                navigate("/");
                return;
            }

            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/getUserInfo",
                    {
                        key: "value",
                    },
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserInfo(response.data);
                // console.log(userInfo);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No access token found");
        const fetchAddress = async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/getAddress",
                    {},
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setHasAddress(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error("error", error);
            }
        };
        fetchAddress();
    }, [hasAddress]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        const fetchOrderInfo = async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/getOrderInfo",
                    {},
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // console.log("Fetched OrderInfo Data:", response.data);

                setOrderInfo(response.data);
            } catch (error) {
                console.error("Error fetching order info:", error);
            }
        };

        fetchOrderInfo();
    }, [orderInfo]);

    const { dispatch } = useCart();

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("No access token found");

            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            clearCart();
            localStorage.removeItem("access_token");

            notification.success({
                message: "Success",
                description: "Signed Out!",
                placement: "topRight",
                duration: 2,
            });
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleEditClick = (userAddressId) => {
        setSelectedAddressId(userAddressId);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedAddressId(null);
    };

    const handleUpdateSuccess = () => {
        fetchAddresses(); // Refresh the address list after an update
    };

    return (
        <div className={screenWidth < 800 ? "my-account-parent" : ""}>
            <div
                className={
                    screenWidth < 800 ? "my-account-dash" : "hide-display"
                }
            >
                <div style={{ marginTop: "1rem", marginLeft: "1.2rem" }}>
                    <button className="dash-button" onClick={showDrawer}>
                        <PiUserList size={20} />
                        Dashboard
                    </button>

                    <Drawer
                        title="ACCOUNT INFO"
                        onClose={onClose}
                        open={open}
                        placement="left"
                        style={{
                            backgroundColor: "black",
                            color: "white",
                        }}
                        width={240}
                        className="custom-dash-drawer"
                    >
                        <Sider
                            style={{
                                height: "100vh",
                            }}
                        >
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                onClick={handleMenuClick}
                                style={{ width: "100%" }}
                            >
                                <Menu.Item key="1">
                                    <PiUserCircle /> My Account
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <PiMapPin /> My Addresses
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <PiBag /> My Order
                                </Menu.Item>
                                <button
                                    className="sign-out-button"
                                    onClick={logout}
                                >
                                    Sign Out
                                </button>
                            </Menu>
                        </Sider>
                    </Drawer>
                </div>
                <div className="dash-user-name">
                    {userInfo ? (
                        <>
                            <span
                                style={{
                                    color: "black",
                                    textTransform: "capitalize",
                                }}
                            >
                                {userInfo.user_first_name}
                            </span>{" "}
                            <span
                                style={{
                                    color: "black",
                                    textTransform: "capitalize",
                                }}
                            >
                                {userInfo.user_last_name}
                            </span>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div>
                <Layout style={{ minHeight: "100vh" }}>
                    {screenWidth > 800 ? (
                        <>
                            <Sider style={{ padding: "1rem 0.5rem 0 0.5rem" }}>
                                <Menu
                                    theme="dark"
                                    // color="black"
                                    mode="inline"
                                    defaultSelectedKeys={["1"]}
                                    onClick={handleMenuClick}
                                >
                                    <Menu.Item key="1">
                                        <PiUserCircle /> My Account
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <PiMapPin /> My Addresses
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <PiBag /> My Order
                                    </Menu.Item>
                                    <button
                                        className="sign-out-button"
                                        onClick={logout}
                                    >
                                        Sign Out
                                    </button>
                                </Menu>
                            </Sider>
                        </>
                    ) : (
                        <></>
                    )}

                    <Layout>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                <Content
                                    style={{
                                        margin: "16px",
                                        padding: "24px",
                                        background: "#fff",
                                    }}
                                >
                                    {selectedMenu === "1" && (
                                        <div>
                                            {userInfo ? (
                                                <>
                                                    <h2
                                                        className={
                                                            screenWidth > 800
                                                                ? "hide-display"
                                                                : ""
                                                        }
                                                    >
                                                        My Account
                                                    </h2>
                                                    <h1
                                                        className={
                                                            screenWidth > 800
                                                                ? ""
                                                                : "hide-display "
                                                        }
                                                    >
                                                        Welcome,{" "}
                                                        <span
                                                            style={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            {
                                                                userInfo.user_first_name
                                                            }
                                                        </span>{" "}
                                                        <span
                                                            style={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            {" "}
                                                            {
                                                                userInfo.user_last_name
                                                            }
                                                        </span>
                                                    </h1>
                                                    <div>
                                                        <Card
                                                            title="User Information"
                                                            style={{
                                                                width:
                                                                    screenWidth >
                                                                    800
                                                                        ? "1000"
                                                                        : "300",
                                                            }}
                                                        >
                                                            <Row
                                                                gutter={[
                                                                    16, 16,
                                                                ]}
                                                            >
                                                                <Col span={12}>
                                                                    <Card
                                                                        bordered={
                                                                            false
                                                                        }
                                                                    >
                                                                        <strong>
                                                                            First
                                                                            Name:
                                                                        </strong>{" "}
                                                                        <span
                                                                            style={{
                                                                                textTransform:
                                                                                    "capitalize",
                                                                            }}
                                                                        >
                                                                            {
                                                                                userInfo.user_first_name
                                                                            }
                                                                        </span>
                                                                    </Card>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <Card
                                                                        bordered={
                                                                            false
                                                                        }
                                                                    >
                                                                        <strong>
                                                                            Last
                                                                            Name:
                                                                        </strong>{" "}
                                                                        <span
                                                                            style={{
                                                                                textTransform:
                                                                                    "capitalize",
                                                                            }}
                                                                        >
                                                                            {
                                                                                userInfo.user_last_name
                                                                            }
                                                                        </span>
                                                                    </Card>
                                                                </Col>

                                                                <Col span={24}>
                                                                    <Card
                                                                        bordered={
                                                                            false
                                                                        }
                                                                    >
                                                                        <strong>
                                                                            Email:
                                                                        </strong>{" "}
                                                                        {
                                                                            userInfo.user_email
                                                                        }
                                                                    </Card>
                                                                </Col>

                                                                <Col span={24}>
                                                                    <Card
                                                                        bordered={
                                                                            false
                                                                        }
                                                                    >
                                                                        <strong>
                                                                            Date
                                                                            of
                                                                            Birth:
                                                                        </strong>{" "}
                                                                        {
                                                                            userInfo.user_birth_date
                                                                        }
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </div>
                                                </>
                                            ) : (
                                                <Spinner />
                                            )}
                                        </div>
                                    )}
                                    {selectedMenu === "2" && (
                                        <>
                                            <h2
                                                className={
                                                    screenWidth > 800
                                                        ? "hide-display"
                                                        : ""
                                                }
                                                style={{
                                                    marginBottom: "2rem",
                                                    marginLeft:
                                                        screenWidth > 800
                                                            ? "0.5rem"
                                                            : "1.6rem",
                                                }}
                                            >
                                                My Addresses
                                            </h2>
                                            <div
                                                style={{
                                                    marginBottom: "2rem",
                                                    marginLeft:
                                                        screenWidth > 800
                                                            ? "0.5rem"
                                                            : "1.6rem",
                                                }}
                                            >
                                                <CreateAddressPopUp
                                                    isModalVisible={newAddress}
                                                    showModal={showNewAddress}
                                                    handleCancel={
                                                        hideNewAddress
                                                    }
                                                />
                                            </div>
                                            <Row
                                                gutter={[16, 16]}
                                                wrap={true}
                                                style={{
                                                    paddingLeft:
                                                        screenWidth > 800
                                                            ? "0"
                                                            : "2.2rem",
                                                }}
                                            >
                                                {hasAddress &&
                                                hasAddress.length > 0 ? (
                                                    hasAddress.map(
                                                        (address, index) => (
                                                            <Col
                                                                key={index}
                                                                flex="0 0 auto"
                                                            >
                                                                <Card
                                                                    title={`${address.label} Address`}
                                                                    bordered={
                                                                        false
                                                                    }
                                                                    style={{
                                                                        width: 300,
                                                                        textTransform:
                                                                            "capitalize",
                                                                        border: "solid 1px rgba(128, 128, 128, 0.527)",
                                                                    }}
                                                                    key={index}
                                                                    value={
                                                                        address.user_address_id
                                                                    }
                                                                >
                                                                    <p>
                                                                        <strong>
                                                                            Country:
                                                                        </strong>{" "}
                                                                        {
                                                                            address.country
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <strong>
                                                                            State:
                                                                        </strong>{" "}
                                                                        {
                                                                            address.state
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <strong>
                                                                            City:
                                                                        </strong>{" "}
                                                                        {
                                                                            address.city
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <strong>
                                                                            Street:
                                                                        </strong>{" "}
                                                                        {
                                                                            address.street
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <strong>
                                                                            Building:
                                                                        </strong>{" "}
                                                                        {
                                                                            address.building
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <strong>
                                                                            Zip
                                                                            Code:
                                                                        </strong>{" "}
                                                                        {
                                                                            address.zipCode
                                                                        }
                                                                    </p>
                                                                    <div className="edit-delete">
                                                                        <button
                                                                            type="link"
                                                                            onClick={() =>
                                                                                handleEditClick(
                                                                                    address.user_address_id
                                                                                )
                                                                            }
                                                                            className="edit-delete-btns"
                                                                        >
                                                                            <PiPencil
                                                                                style={{
                                                                                    transform:
                                                                                        "translateY(2px)",
                                                                                }}
                                                                            />{" "}
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            type="link"
                                                                            onClick={() =>
                                                                                handleEditClick(
                                                                                    address.user_address_id
                                                                                )
                                                                            }
                                                                            className="edit-delete-btns"
                                                                        >
                                                                            <PiTrash
                                                                                style={{
                                                                                    transform:
                                                                                        "translateY(2px)",
                                                                                }}
                                                                            />{" "}
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    )
                                                ) : (
                                                    <p>No addresses found.</p>
                                                )}
                                            </Row>
                                            {selectedAddressId && (
                                                <UpdateAddress
                                                    addressId={
                                                        selectedAddressId
                                                    }
                                                    visible={isModalVisible}
                                                    onClose={handleModalClose}
                                                    onUpdateSuccess={
                                                        handleUpdateSuccess
                                                    }
                                                />
                                            )}
                                        </>
                                    )}
                                    {selectedMenu === "3" && (
                                        <>
                                            <h2
                                                className={
                                                    screenWidth > 800
                                                        ? "hide-display"
                                                        : ""
                                                }
                                            >
                                                My Orders
                                            </h2>
                                            <div>
                                                <Row gutter={[16, 16]}>
                                                    {orderInfo &&
                                                    orderInfo.length > 0 ? (
                                                        <>
                                                            {orderInfo.map(
                                                                (
                                                                    order,
                                                                    orderIndex
                                                                ) => (
                                                                    <Col
                                                                        key={
                                                                            orderIndex
                                                                        }
                                                                        flex="0 0 auto"
                                                                    >
                                                                        <Card
                                                                            title={`Order ${
                                                                                orderIndex +
                                                                                1
                                                                            }`}
                                                                            bordered={
                                                                                false
                                                                            }
                                                                            style={{
                                                                                width: 350,
                                                                                border: "solid 1px rgba(128, 128, 128, 0.527)",
                                                                            }}
                                                                            value={
                                                                                order.order_id_pkey
                                                                            }
                                                                        >
                                                                            <h3>
                                                                                Order
                                                                                Total
                                                                                Price:
                                                                                $
                                                                                {
                                                                                    order.order_total
                                                                                }
                                                                            </h3>

                                                                            <h3>
                                                                                Items:
                                                                            </h3>
                                                                            {order
                                                                                .order_items
                                                                                .length >
                                                                                0 &&
                                                                                order.order_items.map(
                                                                                    (
                                                                                        item,
                                                                                        itemIndex
                                                                                    ) => (
                                                                                        <div
                                                                                            key={
                                                                                                itemIndex
                                                                                            }
                                                                                            className="order-item-summary"
                                                                                        >
                                                                                            <p>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontWeight:
                                                                                                            "620",
                                                                                                    }}
                                                                                                >
                                                                                                    Product
                                                                                                    Name:{" "}
                                                                                                </span>
                                                                                                {
                                                                                                    item.name
                                                                                                }
                                                                                            </p>
                                                                                            <p>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontWeight:
                                                                                                            "620",
                                                                                                    }}
                                                                                                >
                                                                                                    Price
                                                                                                    per
                                                                                                    unit:
                                                                                                </span>{" "}
                                                                                                $
                                                                                                {
                                                                                                    item.price
                                                                                                }
                                                                                            </p>
                                                                                            <p>
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontWeight:
                                                                                                            "620",
                                                                                                    }}
                                                                                                >
                                                                                                    Quantity:{" "}
                                                                                                </span>
                                                                                                {
                                                                                                    item.quantity
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    )
                                                                                )}

                                                                            <h3>
                                                                                Ordered
                                                                                At:{" "}
                                                                                {new Date(
                                                                                    order.created_at
                                                                                ).toLocaleString()}
                                                                            </h3>
                                                                            <h3>
                                                                                Payment
                                                                                Method:{" "}
                                                                                <span
                                                                                    style={{
                                                                                        textTransform:
                                                                                            "capitalize",
                                                                                        fontWeight:
                                                                                            "normal ",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        order.payment_details_id
                                                                                    }
                                                                                </span>
                                                                            </h3>
                                                                            <h3>
                                                                                Shipping
                                                                                Method:{" "}
                                                                                <span
                                                                                    style={{
                                                                                        textTransform:
                                                                                            "capitalize",
                                                                                        fontWeight:
                                                                                            "normal ",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        order.shipping_details
                                                                                    }
                                                                                </span>
                                                                            </h3>
                                                                            <h3>
                                                                                Order
                                                                                Address:{" "}
                                                                                <span
                                                                                    style={{
                                                                                        textTransform:
                                                                                            "capitalize",
                                                                                        fontWeight:
                                                                                            "normal",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        order
                                                                                            .order_address
                                                                                            .address
                                                                                            .label
                                                                                    }
                                                                                </span>
                                                                            </h3>
                                                                        </Card>
                                                                    </Col>
                                                                )
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>No Orders</>
                                                    )}
                                                </Row>
                                            </div>
                                        </>
                                    )}
                                </Content>
                            </>
                        )}
                    </Layout>
                </Layout>
            </div>
        </div>
    );
};

export default MyAccount;
