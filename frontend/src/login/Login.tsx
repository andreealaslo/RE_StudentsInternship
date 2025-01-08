import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        const loginData = { email, password };

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData),
                }
            );

            if (response.ok) {
                const name = await response.text();
                if (name != "") {
                    toast.success(`Welcome, ${name}!`);
                } else {
                    toast.success(`Welcome!`);
                }
                setTimeout(() => {
                    navigate("/internships", {
                        state: { email }, 
                    });
                }, 2000);
            } else {
                const errorMessage = await response.text();
                console.error("Login failed:", errorMessage);
                toast.error(`Login failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    const handleRegister = () => {
        navigate("/register", {
            state: {
                email,
                password,
            },
        });
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Welcome to Students' Internships!</h1>
            <div className="login-form">
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={ handleLogin} className="login-button">
                    Login
                </button>
                <button
                    onClick={handleRegister}
                    className="create-account-button"
                >
                    Register
                </button>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                aria-label={undefined}
            />
        </div>
    );
};

export default Login;