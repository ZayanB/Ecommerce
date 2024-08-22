import React, { useEffect, useState } from "react";
import "./Blog.css";
import axios from "../api/axios";
import Spinner from "./Spinner";
import { NavLink } from "react-router-dom";

const Blog = () => {
    const [blogs, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/getBlog"
                );
                console.log(response.data);
                setBlog(response.data);
            } catch (error) {
                setError(error.response);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, []);

    function truncateString(str, maxLength) {
        if (str.length <= maxLength) {
            return str;
        }
        return str.slice(0, maxLength).trim() + "...";
    }
    return (
        <div className="blog-main-container">
            {loading ? (
                <>
                    <Spinner />
                </>
            ) : (
                <>
                    {blogs && blogs.length > 0 ? (
                        blogs.map((blog, index) => {
                            const {
                                blog_id,
                                author_name,
                                created_at,
                                description,
                                product,
                                title,
                            } = blog;
                            const image_url =
                                product?.image?.length > 0
                                    ? product.image[0].image_url
                                    : "";

                            return (
                                <div
                                    className="blog-single-container"
                                    key={index}
                                >
                                    <div className="blog-image">
                                        {image_url && (
                                            <img
                                                src={image_url}
                                                alt="Blog Image"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="blog-image-description">
                                        <div className="blog-author-date">
                                            <div>{author_name}</div>
                                            <div>
                                                {new Date(
                                                    created_at
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </div>
                                        </div>
                                        <NavLink to={`/Blog/${blog_id}`}>
                                            <div className="blog-title">
                                                {title}
                                            </div>
                                        </NavLink>
                                        <div
                                            style={{
                                                color: "rgba(128, 128, 128)",
                                            }}
                                        >
                                            {truncateString(description, 100)}
                                        </div>
                                        <div>
                                            <NavLink to={`/Blog/${blog_id}`}>
                                                <button className="blog-read-more-btn">
                                                    READ MORE
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No blogs available</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Blog;
