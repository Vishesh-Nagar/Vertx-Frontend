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
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#ffffff",
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            if (decodedToken.role === "admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, []);

    return (
        <div style={appStyle}>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/saved"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin} adminOnly={false}>
                                <Header />
                                <Savedpost />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user-dashboard"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin} adminOnly={false}>
                                <Header />
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin} adminOnly={true}>
                                <Header />
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/feed"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin} adminOnly={false}>
                                <Header />
                                <Feed />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
