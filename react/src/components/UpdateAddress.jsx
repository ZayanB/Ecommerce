import React, { useState, useEffect } from "react";
import { Modal, Form, Input, notification, Select } from "antd";
import axios from "../api/axios";
import "./UpdateAddress.css";
import Spinner from "./Spinner";

const { Option } = Select;

const UpdateAddress = ({ addressId, visible, onClose, onUpdateSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];

    useEffect(() => {
        if (visible && addressId) {
            const fetchUserAddress = async () => {
                setLoading(true);
                try {
                    const token = localStorage.getItem("access_token");
                    const response = await axios.post(
                        `http://127.0.0.1:8000/api/getAddressById/${addressId}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const data = response.data;

                    form.setFieldsValue({
                        country: data.country,
                        state: data.state,
                        city: data.city,
                        street: data.street,
                        building: data.building,
                        zipCode: data.zipCode,
                        label: data.label,
                    });
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user address:", error);
                }
            };

            fetchUserAddress();
        }
    }, [visible, addressId, form]);

    const handleUpdate = async (values) => {
        const token = localStorage.getItem("access_token");
        setLoading(true);

        axios
            .put(
                `http://127.0.0.1:8000/api/updateAddress/${addressId}`,
                values,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setLoading(false);
                notification.success({
                    message: "Success",
                    description: "Address updated successfully!",
                    placement: "topRight",
                    duration: 2,
                });
                form.resetFields();
                onUpdateSuccess();
                onClose();
            })
            .catch((error) => {
                setLoading(false);
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;
                    for (const field in errors) {
                        notification.error({
                            message: "Validation Error",
                            description: `${errors[field].join(", ")}`,
                            placement: "topRight",
                            duration: 2,
                        });
                    }
                } else if (!token) {
                    notification.error({
                        message: "Error",
                        description:
                            "User not authenticated. Please log in and try again later.",
                        placement: "topRight",
                        duration: 2,
                    });
                }
            });
    };

    return (
        <Modal
            title="Update Address"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleUpdate}>
                {loading ? (
                    <>
                        <Spinner />
                    </>
                ) : (
                    <>
                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select your country!",
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                optionFilterProp="children" // This will filter based on the text of the Option
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            >
                                {countries.map((country) => (
                                    <Option key={country} value={country}>
                                        {country}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="State"
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your state!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="City"
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your city!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Street"
                            name="street"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your street!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Building"
                            name="building"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your zip code!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Zip Code"
                            name="zipCode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your zip code!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter a label for this address!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <button
                                type="submit"
                                loading={loading}
                                className="update-address-btn"
                            >
                                Update Address{" "}
                            </button>
                        </Form.Item>
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default UpdateAddress;
