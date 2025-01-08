import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateProfile.css";

const CreateProfileCompany: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        fieldOfWork: "",
        location: "",
        companySize: "",
        websiteLink: "",
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state as { userId: string };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8080/api/company/profile/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                toast.success("Profile created successfully! Please log in.");
                console.log(
                    "Profile created successfully for user with id:",
                    userId
                );
                setTimeout(() => {
                    navigate("/", {
                        state: { userType: "COMPANY" }, 
                    });
                }, 2000);
            } else {
                const errorMessage = await response.text();
                console.error("Profile creation failed:", errorMessage);
                toast.error(`Profile creation failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("An error occurred during profile creation:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="create-profile-container">
            <h1 className="create-profile-title">
                Create Your Company Profile
            </h1>
            <form className="create-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Company Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Company Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="create-profile-textarea"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fieldOfWork">Field of Work</label>
                    <input
                        type="text"
                        name="fieldOfWork"
                        id="fieldOfWork"
                        placeholder="Field of Work"
                        value={formData.fieldOfWork}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="companySize">Company Size</label>
                    <input
                        type="text"
                        name="companySize"
                        id="companySize"
                        placeholder="Company Size"
                        value={formData.companySize}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="websiteLink">Website Link</label>
                    <input
                        type="text"
                        name="websiteLink"
                        id="websiteLink"
                        placeholder="Website Link"
                        value={formData.websiteLink}
                        onChange={handleChange}
                        className="create-profile-input"
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

export default CreateProfileCompany;
