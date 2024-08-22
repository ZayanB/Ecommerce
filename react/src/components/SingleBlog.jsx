import React, { useEffect, useState } from "react";
import "./SingleBlog.css";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { PiQuotes } from "react-icons/pi";

const SingleBlog = () => {
    const [blogs, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    const { blogId } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/getBlog/${blogId}`
                );
                console.log(response.data);
                setBlog(response.data);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, []);
    return (
        <div>
            {loading ? (
                <>
                    <Spinner />
                </>
            ) : (
                <>
                    {blogs &&
                        blogs.length > 0 &&
                        blogs.map((blog) => (
                            <div
                                key={blog.blog_id}
                                className="single-blog-main-container"
                            >
                                <div className="single-blog-side-bar">
                                    <div style={{ color: "black" }}>
                                        ABOUT ME
                                    </div>
                                    <div className="single-blog-author-image">
                                        {blog.author_photo && (
                                            <img
                                                src={blog.author_photo}
                                                alt="Author"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="single-blog-author-about">
                                        {blog.author_about
                                            ? blog.author_about
                                            : "No information available about the author."}
                                    </div>
                                </div>
                                <div className="single-blog-content">
                                    <div className="single-blog-title">
                                        {blog.title}
                                    </div>
                                    <div className="single-blog-auth-date">
                                        <div>{blog.author_name}</div>
                                        <div>
                                            {new Date(
                                                blog.created_at
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </div>
                                    </div>
                                    <div className="blog-product-image">
                                        {blog.product &&
                                            blog.product.image &&
                                            blog.product.image.length > 0 && (
                                                <img
                                                    src={
                                                        blog.product.image[0]
                                                            .image_url
                                                    }
                                                    alt="Product"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                            )}
                                    </div>
                                    <div className="blog-single-description">
                                        {blog.description}
                                    </div>
                                    <div className="blog-single-quote">
                                        <div>
                                            <PiQuotes
                                                size={32}
                                                style={{
                                                    transform: "rotate(180deg)",
                                                }}
                                            />
                                        </div>
                                        <div>{blog.qoute}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default SingleBlog;
