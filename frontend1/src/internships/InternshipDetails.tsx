import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Divider,
    Button,
    Link,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the Toastify styles

interface User {
    id: number;
    email: string;
    password: string;
    userType: string;
    name: string;
}

interface Company {
    id: number;
    user: User;
    name: string;
    description: string;
    fieldOfWork: string;
    location: string;
    companySize: string;
    websiteLink: string;
}

interface Internship {
    id: number;
    company: Company;
    title: string;
    description: string;
    location: string;
    duration: string;
    requirements: string;
    active: boolean;
}

const InternshipDetails: React.FC = () => {
    const [internship, setInternship] = useState<Internship | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchInternshipDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `http://localhost:8080/api/internships/${id}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setInternship(data);
                } else {
                    console.error("Failed to fetch internship details.");
                }
            } catch (error) {
                console.error("Error fetching internship details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInternshipDetails();
    }, [id]);

    const handleApply = async () => {
        const studentId = localStorage.getItem("studentId");

        if (!studentId) {
            console.error("No student ID found in localStorage");
            return;
        }

        const applicationData = {
            id: 0,
            studentId: Number(studentId),
            internshipId: internship?.id ?? 0,
            applicationDate: new Date().toISOString(),
            status: "PENDING",
        };

        try {
            const response = await fetch(
                "http://localhost:8080/api/applications/apply",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(applicationData),
                }
            );
            const responseMessage = await response.text();

            if (response.ok) {
                toast.success(responseMessage);
            } else {
                toast.warning(responseMessage);
            }
        } catch (error) {
            toast.error("Failed to submit application. Please try again.");
        }
    };

    return (
        <div>
            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 4,
                    marginTop: 4,
                }}
            >
                Internship Details
            </Typography>

            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                >
                    <CircularProgress />
                </Box>
            ) : internship ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Card
                        sx={{
                            width: "600px",
                            padding: 3,
                            boxShadow: 3,
                            borderRadius: 2,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                color="primary"
                                gutterBottom
                            >
                                General Information
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    <strong>Title:</strong> {internship.title}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Location:</strong>{" "}
                                    {internship.location}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Duration:</strong>{" "}
                                    {internship.duration}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Description
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    {internship.description}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Requirements
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    {internship.requirements}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Company
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    <Link
                                        onClick={() =>
                                            navigate(
                                                `/companies/${internship.company.id}`,
                                                {
                                                    state: {
                                                        company:
                                                            internship.company,
                                                    },
                                                }
                                            )
                                        }
                                        color="primary"
                                        style={{
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {internship.company.name}
                                    </Link>
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    marginTop: 3,
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleApply}
                                >
                                    Apply
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                <Typography>No details found for this internship.</Typography>
            )}

            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                aria-label={undefined}
            />
        </div>
    );
};

export default InternshipDetails;
