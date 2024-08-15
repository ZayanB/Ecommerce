import { React, useState, useEffect } from "react";
import { Layout, Menu, Card, Row, Col, notification } from "antd";
import axios from "../api/axios";
import "./MyAccount.css";
import { PiUserCircle, PiBag, PiMapPin } from "react-icons/pi";
import Spinner from "./Spinner";
const { Sider, Content } = Layout;
import CreateAddressPopUp from "./CreateAddressPopUp";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";

const MyAccount = () => {
    const [selectedMenu, setSelectedMenu] = useState("1");
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasAddress, setHasAddress] = useState([]);
    const [newAddress, setNewAddress] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);
    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        setSelectedMenu(e.key);
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

                console.log("Fetched OrderInfo Data:", response.data);

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

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider>
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
                    <button className="sign-out-button" onClick={logout}>
                        Sign Out
                    </button>
                </Menu>
            </Sider>
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
                                            {/* <h2>User Information</h2> */}
                                            <h1>
                                                Welcome,{" "}
                                                <span
                                                    style={{
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {userInfo.user_first_name}
                                                </span>{" "}
                                                <span
                                                    style={{
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {" "}
                                                    {userInfo.user_last_name}
                                                </span>
                                            </h1>
                                            <div>
                                                <Card
                                                    title="User Information"
                                                    style={{ width: 1000 }}
                                                >
                                                    <Row gutter={[16, 16]}>
                                                        <Col span={12}>
                                                            <Card
                                                                bordered={false}
                                                            >
                                                                <strong>
                                                                    First Name:
                                                                </strong>{" "}
                                                                {
                                                                    userInfo.user_first_name
                                                                }
                                                            </Card>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Card
                                                                bordered={false}
                                                            >
                                                                <strong>
                                                                    Last Name:
                                                                </strong>{" "}
                                                                {
                                                                    userInfo.user_last_name
                                                                }
                                                            </Card>
                                                        </Col>

                                                        <Col span={24}>
                                                            <Card
                                                                bordered={false}
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
                                                                bordered={false}
                                                            >
                                                                <strong>
                                                                    Date of
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
                                    <div style={{ marginBottom: "2rem" }}>
                                        <CreateAddressPopUp
                                            isModalVisible={newAddress}
                                            showModal={showNewAddress}
                                            handleCancel={hideNewAddress}
                                        />
                                    </div>
                                    <Row gutter={[16, 16]} wrap={true}>
                                        {hasAddress && hasAddress.length > 0 ? (
                                            hasAddress.map((address, index) => (
                                                <Col
                                                    key={index}
                                                    flex="0 0 auto"
                                                >
                                                    <Card
                                                        title={`${address.label} Address`}
                                                        bordered={false}
                                                        style={{
                                                            width: 300,
                                                            textTransform:
                                                                "capitalize",
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
                                                            {address.country}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                State:
                                                            </strong>{" "}
                                                            {address.state}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                City:
                                                            </strong>{" "}
                                                            {address.city}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Street:
                                                            </strong>{" "}
                                                            {address.street}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Zip Code:
                                                            </strong>{" "}
                                                            {address.zip_code}
                                                        </p>
                                                    </Card>
                                                </Col>
                                            ))
                                        ) : (
                                            <p>No addresses found.</p>
                                        )}
                                    </Row>
                                </>
                            )}
                            {selectedMenu === "3" && (
                                <>
                                    <div>
                                        <Row gutter={[16, 16]}>
                                            {orderInfo &&
                                            orderInfo.length > 0 ? (
                                                <>
                                                    {orderInfo.map(
                                                        (order, orderIndex) => (
                                                            <Col
                                                                key={orderIndex}
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
                                                                    }}
                                                                    value={
                                                                        order.order_id_pkey
                                                                    }
                                                                >
                                                                    <h3>
                                                                        Order
                                                                        Total
                                                                        Price: $
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
                                                                                        Product
                                                                                        Name:{" "}
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </p>
                                                                                    <p>
                                                                                        Price:
                                                                                        $
                                                                                        {
                                                                                            item.price
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
    );
};

export default MyAccount;
