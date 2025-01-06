import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("STUDENT");
    const location = useLocation();
    const navigate = useNavigate();

    // Prepopulate email and password if passed in the login page
    useEffect(() => {
        if (location.state) {
            const { email: preEmail, password: prePassword } =
                location.state as {
                    email: string;
                    password: string;
                };
            setEmail(preEmail || "");
            setPassword(prePassword || "");
        }
    }, [location.state]);

    const handleRegister = async () => {
        const registerData = {
            name,
            email,
            password,
            userType,
        };

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registerData),
                }
            );

            if (response.ok) {
                const userId = await response.text();
                console.log(
                    "Registration successful for user with id:",
                    userId
                );
                toast.success(
                    "Registration successful! Please create your profile."
                );

                if (userType === "STUDENT") {
                    navigate("/create-profile/student", { state: { userId } });
                } else if (userType === "UNIVERSITY") {
                    navigate("/create-profile/university", {
                        state: { userId },
                    });
                } else {
                    navigate("/create-profile/company", { state: { userId } });
                }
            } else {
                const errorMessage = await response.text();
                console.error("Registration failed:", errorMessage);
                toast.error(`Registration failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Create an Account</h1>
            <div className="register-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="register-input"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="register-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input"
                />
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="register-select"
                >
                    <option value="STUDENT">Student</option>
                    <option value="COMPANY">Company</option>
                    <option value="UNIVERSITY">University</option>
                </select>
                <button onClick={handleRegister} className="register-button">
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

export default Register;
