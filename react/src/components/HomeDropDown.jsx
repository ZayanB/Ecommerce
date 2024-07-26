import React from "react";
import "./HomeDropDown.css";
import column1Data from "../assets/data/MenuData1.json";
import column2Data from "../assets/data/MenuData2.json";

const HomeDropDown = () => {
    return (
        <>
            <div className="MainContainer">
                <div>
                    <ul className="columnList ">
                        {column1Data.map((item, index) => {
                            return <li key={index}> {item.menuItem}</li>;
                        })}
                    </ul>
                </div>
                <div>
                    <ul className="columnList ">
                        {column2Data.map((item, index) => {
                            return <li key={index}> {item.menuItem}</li>;
                        })}
                    </ul>
                </div>

                <div>
                    <ul className="column3List">
                        <li style={{ width: "25vw", height: "25vh" }}>
                            <img
                                src="https://cleversoft-moleez.myshopify.com/cdn/shop/files/1_22322189-608a-4d80-a626-781680d0448c_2048x.jpg?v=1614715091"
                                alt="shoes"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </li>
                        <li style={{ fontWeight: "400", color: "black" }}>
                            NEW ARRIVALS
                        </li>
                        <li style={{ fontSize: "15px" }}>
                            Summer 2019 Collection
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="columnList">
                        <li
                            style={{
                                width: "25vw",
                                height: "25vh",
                                marginRight: "2rem",
                                marginBottom: "5rem",
                                marginTop: "1.5rem",
                            }}
                        >
                            <img
                                src="https://cleversoft-moleez.myshopify.com/cdn/shop/files/2_28707f42-3055-41a0-a94c-26e579bd68d6_2048x.jpg?v=1614715091"
                                alt="phone"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HomeDropDown;
