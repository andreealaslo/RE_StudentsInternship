import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./CreateProfile.css";

const CreateProfileStudent: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        age: 0,
        location: "",
        linkedinLink: "",
        githubLink: "",
        currentUniversityName: "",
        degree: "",
        expectedGraduationDate: "",
        pastExperience: [""],
        skills: [""],
        projects: [""],
        knownLanguages: [""],
        hobbies: [""],
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state as { userId: string };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (name: string, index: number, value: string) => {
        setFormData((prevState) => {
            const updatedArray = [
                ...(prevState[name as keyof typeof formData] as string[]),
            ];
            updatedArray[index] = value;
            return { ...prevState, [name]: updatedArray };
        });
    };

    const handleAddItem = (name: string) => {
        setFormData((prevState) => {
            const updatedArray = [
                ...(prevState[name as keyof typeof formData] as string[]),
                "",
            ];
            return { ...prevState, [name]: updatedArray };
        });
    };

    const handleRemoveItem = (name: string, index: number) => {
        setFormData((prevState) => {
            const updatedArray = [
                ...(prevState[name as keyof typeof formData] as string[]),
            ];
            updatedArray.splice(index, 1);
            return { ...prevState, [name]: updatedArray };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8080/api/student/profile/${userId}`,
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
                    navigate("/"); // Redirect to login page
                }, 2200);
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

    const formatField = (field: string): string => {
        return field
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div className="create-profile-container">
            <h1 className="create-profile-title">
                Create Your Student Profile
            </h1>
            <form className="create-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="create-profile-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        placeholder="Age"
                        value={formData.age}
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
                    <label htmlFor="linkedinLink">LinkedIn Profile Link</label>
                    <input
                        type="url"
                        name="linkedinLink"
                        id="linkedinLink"
                        placeholder="LinkedIn Profile"
                        value={formData.linkedinLink}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="githubLink">GitHub Profile Link</label>
                    <input
                        type="url"
                        name="githubLink"
                        id="githubLink"
                        placeholder="GitHub Profile"
                        value={formData.githubLink}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currentUniversityName">
                        University Name
                    </label>
                    <input
                        type="text"
                        name="currentUniversityName"
                        id="currentUniversityName"
                        placeholder="University Name"
                        value={formData.currentUniversityName}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="degree">Degree</label>
                    <input
                        type="text"
                        name="degree"
                        id="degree"
                        placeholder="Degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expectedGraduationDate">
                        Expected Graduation Date
                    </label>
                    <input
                        type="date"
                        name="expectedGraduationDate"
                        id="expectedGraduationDate"
                        placeholder="Expected Graduation Date"
                        value={formData.expectedGraduationDate}
                        onChange={handleChange}
                        className="create-profile-input"
                    />
                </div>

                {[
                    "pastExperience",
                    "skills",
                    "projects",
                    "knownLanguages",
                    "hobbies",
                ].map((field) => (
                    <div key={field} className="array-field">
                        <label>{formatField(field)}</label>
                        {formData[field as keyof typeof formData].map(
                            (item, index) => (
                                <div key={index} className="array-input">
                                    <input
                                        type="text"
                                        placeholder={`Enter ${field}`}
                                        value={item}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                field,
                                                index,
                                                e.target.value
                                            )
                                        }
                                        className="create-profile-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveItem(field, index)
                                        }
                                        className="remove-button"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        )}
                        <button
                            type="button"
                            onClick={() => handleAddItem(field)}
                            className="add-button"
                        >
                            Add {formatField(field)}
                        </button>
                    </div>
                ))}

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

export default CreateProfileStudent;
