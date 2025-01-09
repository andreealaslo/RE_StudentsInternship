import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./CreateProfile.css";

const CreateProfileUniversity: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state as { userId: string };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8080/api/university/profile/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                toast.success(
                    "University profile created successfully! Please log in."
                );
                console.log(
                    "Profile created successfully for user with id:",
                    userId
                );
                setTimeout(() => {
                    navigate("/", {
                        state: { userType: "UNIVERSITY" }, 
                    });
                }, 2000);
            } else {
                const errorMessage = await response.text();
                console.error("Profile creation failed:", errorMessage);
                toast.error(`Failed to create profile: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error creating profile:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="create-profile-container">
            <h1 className="create-profile-title">
                Create Your University Profile
            </h1>
            <form className="create-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="University Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="create-profile-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="create-profile-input"
                        required
                    />
                </div>

                <button type="submit" className="create-profile-submit-button">
                    Submit Profile
                </button>
            </form>
            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                aria-label={undefined}
            />
        </div>
    );
};

export default CreateProfileUniversity;
