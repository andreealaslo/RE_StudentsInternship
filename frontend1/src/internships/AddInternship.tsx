import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AddInternship: React.FC = () => {
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        location: "",
        duration: "",
        requirements: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const companyId = location.state.companyId as string;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { title, description, location, duration, requirements } =
            formValues;
        if (!title || !description || !location || !duration || !requirements) {
            setErrorMessage("All fields are required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            const payload = {
                ...formValues,
                companyId, // Include companyId in the payload
            };
            const response = await fetch("http://localhost:8080/api/internships/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSuccessMessage("Internship added successfully!");
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to add internship.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage("An error occurred while submitting the form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: "0 auto",
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Add Internship
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <TextField
                    label="Location"
                    name="location"
                    value={formValues.location}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Duration"
                    name="duration"
                    value={formValues.duration}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Requirements"
                    name="requirements"
                    value={formValues.requirements}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    required
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                        onClick={() => navigate("/internships")}
                        variant="outlined"
                        color="secondary"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Add Internship"}
                    </Button>
                </Box>
            </form>

            {errorMessage && (
                <Snackbar
                    open={!!errorMessage}
                    autoHideDuration={4000}
                    onClose={() => setErrorMessage(null)}
                >
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
            )}

            {successMessage && (
                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={4000}
                    onClose={() => setSuccessMessage(null)}
                >
                    <Alert severity="success">{successMessage}</Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default AddInternship;
