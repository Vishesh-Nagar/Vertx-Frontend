import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        credits: "",
        savedPosts: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "https://vertx-backend-midp.onrender.com/api/user",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await response.json();
                if (result) {
                    setData({
                        name: result.user.name,
                        email: result.user.email,
                        credits: result.user.credits,
                        savedPosts: result.user.savedPosts.slice(0, 3),
                    });
                } else {
                    console.error("User data not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-4xl mx-auto bg-gray-900 shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                    Welcome back, {data.name}!
                </h1>

                <div className="bg-indigo-50 text-black p-6 rounded-lg mb-6">
                    <h2 className="text-2xl font-semibold mb-2">
                        Profile Info
                    </h2>
                    <p>
                        <strong>Name:</strong> {data.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {data.email}
                    </p>
                    <p>
                        <strong>Credits:</strong> {data.credits}
                    </p>
                </div>

                <div className="bg-indigo-50 text-black p-6 rounded-lg mb-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Recent Saved Posts
                    </h2>
                    {data.savedPosts.length > 0 ? (
                        data.savedPosts.map((post, index) => (
                            <div key={index} className="mb-3">
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline"
                                >
                                    {post.title}
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No saved posts yet.</p>
                    )}
                    <div className="mt-4">
                        <Link
                            to="/saved"
                            className="text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg"
                        >
                            View All Saved Posts
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <Link
                        to="/feed"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        Go To Feed
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
