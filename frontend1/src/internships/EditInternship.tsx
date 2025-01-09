import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

interface Internship {
    id: number;
    title: string;
    location: string;
    duration: string;
    description: string;
}

const EditInternship: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const internship: Internship = location.state?.internship;

    const [formData, setFormData] = useState<Internship>(internship);

    const handleChange = (field: keyof Internship, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/internships/edit/internship/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Internship updated successfully!");
                navigate(-1); // Go back to the previous page
            } else {
                console.error("Failed to update internship.");
            }
        } catch (error) {
            console.error("Error updating internship:", error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth="500px" margin="auto">
            <h1>Edit Internship</h1>
            <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                fullWidth
            />
            <TextField
                label="Location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                fullWidth
            />
            <TextField
                label="Duration"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                fullWidth
            />
            <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                multiline
                rows={4}
                fullWidth
            />
            <Box display="flex" gap={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save Changes
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default EditInternship;
