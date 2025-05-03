import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Signup";
import Login from "./components/Login";

import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Feed from "./components/Feed";
import Savedpost from "./components/Savedpost";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            if (decodedToken.role === "admin") {
                setIsAdmin(true);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const appStyle = {
        backgroundColor: "#121212", // Dark background color
        minHeight: "100vh", // Ensures it covers the full viewport height
        color: "#ffffff", // Optional: Set text color to white for better contrast
    };

    return (
        <div style={appStyle}>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/saved"
                        element={
                            isLoggedIn && !isAdmin ? (
                                <ProtectedRoute>
                                    <Header />
                                    <Savedpost />
                                </ProtectedRoute>
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/user-dashboard"
                        element={
                            isLoggedIn && !isAdmin ? (
                                <ProtectedRoute>
                                    <Header />
                                    <UserDashboard />
                                </ProtectedRoute>
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            isLoggedIn && isAdmin ? (
                                <ProtectedRoute>
                                    <Header />
                                    <AdminDashboard />
                                </ProtectedRoute>
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/feed"
                        element={
                            isLoggedIn && !isAdmin ? (
                                <ProtectedRoute>
                                    <Header />
                                    <Feed />
                                </ProtectedRoute>
                            ) : (
                                <Login />
                            )
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
