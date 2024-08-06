import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const FetchDataComponent = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                console.error("No access token found");
                return;
            }

            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/getCart",
                    {
                        key: "value",
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCartItems(response.data.cart_items);
                console.log(cartItems);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.cart_id} - {item.cart_item_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchDataComponent;
