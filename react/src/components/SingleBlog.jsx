import React, { useEffect, useState } from "react";
import "./SingleBlog.css";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { PiQuotes } from "react-icons/pi";
import useScreenWidth from "./useScreenWidth";

const SingleBlog = () => {
    const [blogs, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    const { blogId } = useParams();
    const screenWidth = useScreenWidth();

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
                                className={
                                    screenWidth > 800
                                        ? "single-blog-main-container"
                                        : "single-blog-main-container-mobile"
                                }
                            >
                                <>
                                    {screenWidth > 800 ? (
                                        <>
                                            <>
                                                <div
                                                    className={
                                                        screenWidth > 800
                                                            ? "single-blog-side-bar"
                                                            : "single-blog-side-bar-mobile"
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        ABOUT ME
                                                    </div>
                                                    <div
                                                        className={
                                                            screenWidth > 800
                                                                ? "single-blog-author-image"
                                                                : "single-blog-author-image-mobile"
                                                        }
                                                    >
                                                        {blog.author_photo && (
                                                            <img
                                                                src={
                                                                    blog.author_photo
                                                                }
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
                                            </>
                                            <>
                                                <div className="single-blog-content">
                                                    <div className="single-blog-title">
                                                        {blog.title}
                                                    </div>
                                                    <div className="single-blog-auth-date">
                                                        <div>
                                                            {blog.author_name}
                                                        </div>
                                                        <div>
                                                            {new Date(
                                                                blog.created_at
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            screenWidth > 800
                                                                ? "blog-product-image"
                                                                : "blog-product-image-mobile"
                                                        }
                                                    >
                                                        {blog.product &&
                                                            blog.product
                                                                .image &&
                                                            blog.product.image
                                                                .length > 0 && (
                                                                <img
                                                                    src={
                                                                        blog
                                                                            .product
                                                                            .image[0]
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
                                                    <div
                                                        className={
                                                            screenWidth > 800
                                                                ? "blog-single-description"
                                                                : "blog-single-description-mobile"
                                                        }
                                                    >
                                                        {blog.description}
                                                    </div>
                                                    <div className="blog-single-quote">
                                                        <div>
                                                            <PiQuotes
                                                                size={32}
                                                                style={{
                                                                    transform:
                                                                        "rotate(180deg)",
                                                                }}
                                                            />
                                                        </div>
                                                        <div>{blog.qoute}</div>
                                                    </div>
                                                </div>
                                            </>
                                        </>
                                    ) : (
                                        <>
                                            <>
                                                <div className="single-blog-content">
                                                    <div className="single-blog-title">
                                                        {blog.title}
                                                    </div>
                                                    <div className="single-blog-auth-date">
                                                        <div>
                                                            {blog.author_name}
                                                        </div>
                                                        <div>
                                                            {new Date(
                                                                blog.created_at
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            screenWidth > 800
                                                                ? "blog-product-image"
                                                                : "blog-product-image-mobile"
                                                        }
                                                    >
                                                        {blog.product &&
                                                            blog.product
                                                                .image &&
                                                            blog.product.image
                                                                .length > 0 && (
                                                                <img
                                                                    src={
                                                                        blog
                                                                            .product
                                                                            .image[0]
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
                                                    <div
                                                        className={
                                                            screenWidth > 800
                                                                ? "blog-single-description"
                                                                : "blog-single-description-mobile"
                                                        }
                                                    >
                                                        {blog.description}
                                                    </div>
                                                    <div className="blog-single-quote">
                                                        <div>
                                                            <PiQuotes
                                                                size={32}
                                                                style={{
                                                                    transform:
                                                                        "rotate(180deg)",
                                                                }}
                                                            />
                                                        </div>
                                                        <div>{blog.qoute}</div>
                                                    </div>
                                                </div>
                                            </>
                                            <>
                                                <div
                                                    className={
                                                        screenWidth > 800
                                                            ? "single-blog-side-bar"
                                                            : "single-blog-side-bar-mobile"
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        ABOUT ME
                                                    </div>
                                                    <div
                                                        className={
                                                            screenWidth > 800
                                                                ? "single-blog-author-image"
                                                                : "single-blog-author-image-mobile"
                                                        }
                                                    >
                                                        {blog.author_photo && (
                                                            <img
                                                                src={
                                                                    blog.author_photo
                                                                }
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
                                            </>
                                        </>
                                    )}
                                </>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default SingleBlog;
