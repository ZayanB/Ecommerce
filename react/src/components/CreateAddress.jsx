import { React, useState } from "react";
import axios from "../api/axios";
import { Form, Input, Select, Spin, notification } from "antd";
import "./CreateAddress.css";
import useScreenWidth from "./useScreenWidth";

const CreateAddress = () => {
    const screenWidth = useScreenWidth();
    const { Option } = Select;
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

    const [loading, setLoading] = useState(false);

    const [userAddress, setUserAddress] = useState({
        country: "",
        state: "",
        city: "",
        street: "",
        building: "",
        zipCode: "",
        label: "",
    });

    const handleCountryChange = (value) => {
        setUserAddress({
            ...userAddress,
            country: value,
        });
    };
    const handleStateChange = (value) => {
        setUserAddress({
            ...userAddress,
            state: value,
        });
    };
    const handleCityChange = (value) => {
        setUserAddress({
            ...userAddress,
            city: value,
        });
    };
    const handleStreetChange = (value) => {
        setUserAddress({
            ...userAddress,
            street: value,
        });
    };
    const handleBuildingChange = (value) => {
        setUserAddress({
            ...userAddress,
            building: value,
        });
    };
    const handleZipChange = (value) => {
        setUserAddress({
            ...userAddress,
            zipCode: value,
        });
    };
    const handleLabelChange = (value) => {
        setUserAddress({
            ...userAddress,
            label: value,
        });
    };

    const clearUserAddress = () => {
        setUserAddress({
            country: "",
            state: "",
            city: "",
            street: "",
            building: "",
            zipCode: "",
            label: "",
        });
    };

    const submitAddress = async () => {
        const token = localStorage.getItem("access_token");
        setLoading(true);

        axios
            .post("http://127.0.0.1:8000/api/addAddress", userAddress, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setLoading(false);
                notification.success({
                    message: "Success",
                    description: "Address added successfully!",
                    placement: "topRight",
                    duration: 2,
                });
                clearUserAddress();
            })
            .catch((error) => {
                setLoading(false);
                clearUserAddress();
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;
                    for (const field in errors) {
                        notification.error({
                            message: "Validation Error",
                            description: ` ${errors[field].join(", ")}`,
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
        <>
            {loading ? (
                <Spin
                    size="large"
                    style={{
                        transform:
                            screenWidth > 800
                                ? "translateX(250px)"
                                : "translateX(125px)",
                    }}
                />
            ) : (
                <>
                    <div>
                        <Form
                            layout="vertical"
                            style={{
                                width: screenWidth > 800 ? "40vw" : "70vw",
                            }}
                        >
                            {/* Delivery Section */}
                            <h2>Address</h2>
                            <Form.Item
                                name="country"
                                label="Country"
                                rules={[
                                    {
                                        message: "Please select your country",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select your country"
                                    value={userAddress.country}
                                    onChange={handleCountryChange}
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
                                name="label"
                                rules={[
                                    {
                                        message:
                                            "Please enter a label for this address",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="label"
                                    value={userAddress.label}
                                    onChange={(e) =>
                                        handleLabelChange(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name="State"
                                rules={[
                                    {
                                        message: "Please enter your State",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="State"
                                    value={userAddress.state}
                                    onChange={(e) =>
                                        handleStateChange(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item name="city">
                                <Input
                                    placeholder="City"
                                    value={userAddress.city}
                                    onChange={(e) =>
                                        handleCityChange(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item name="Street">
                                <Input
                                    placeholder="Street"
                                    value={userAddress.street}
                                    onChange={(e) =>
                                        handleStreetChange(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item name="Building">
                                <Input
                                    placeholder="Building"
                                    value={userAddress.building}
                                    onChange={(e) =>
                                        handleBuildingChange(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item name="postalCode">
                                <Input
                                    placeholder="Postal code"
                                    value={userAddress.zipCode}
                                    onChange={(e) =>
                                        handleZipChange(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <button
                                    onClick={submitAddress}
                                    className="submit-new-address-button"
                                >
                                    Add Address
                                </button>
                            </Form.Item>
                        </Form>
                    </div>
                </>
            )}
        </>
    );
};

export default CreateAddress;
