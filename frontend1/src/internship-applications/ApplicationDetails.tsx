import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    Button,
    Link,
} from "@mui/material";

interface User {
    id: number;
    email: string;
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
    location: string;
    duration: string;
    description: string;
    requirements: string;
    active: boolean;
}

interface Application {
    id: number;
    student: {
        id: number;
        fullName: string;
    };
    internship: Internship;
    applicationDate: string;
    status: string;
    theStudentSelected: boolean;
}

const ApplicationDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const application: Application | null = location.state?.application || null;

    const handleLogout = () => {
        // Clear localStorage and navigate to login page
        localStorage.clear();
        navigate("/");
    };

    return (
        <div>
            <div className="back-logout-buttons-container">
                        <Box display="flex" justifyContent="space-between" margin="3px">
                        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                                    Back
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                        </div>
            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 4,
                    marginTop: 4,
                    fontSize: '2.5rem',
                    color: '#333'
                }}
            >
                Application Details
            </Typography>

            {application ? (
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
                                Internship Information
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    <strong>Title:</strong>{" "}
                                    {application.internship.title}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Location:</strong>{" "}
                                    {application.internship.location}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Duration:</strong>{" "}
                                    {application.internship.duration}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Requirements:</strong>{" "}
                                    {application.internship.requirements}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Application Information
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    <strong>Application Date:</strong>{" "}
                                    {new Date(
                                        application.applicationDate
                                    ).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Status:</strong>{" "}
                                    {application.status}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Selected:</strong>{" "}
                                    {application.theStudentSelected
                                        ? "Yes"
                                        : "No"}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Company Details
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    <strong>Name:</strong>{" "}
                                    {application.internship.company.name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Field of Work:</strong>{" "}
                                    {application.internship.company.fieldOfWork}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Location:</strong>{" "}
                                    {application.internship.company.location}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Size:</strong>{" "}
                                    {application.internship.company.companySize}
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
                                    {application.internship.description}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Website
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                {application.internship.company.websiteLink ? (
                                    <Link
                                        href={
                                            application.internship.company
                                                .websiteLink
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color="primary"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Visit Website
                                    </Link>
                                ) : (
                                    <Typography variant="body1">
                                        No website available.
                                    </Typography>
                                )}
                            </Box>

                            <Box
                                sx={{
                                    marginTop: 3,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                <Box textAlign="center" padding={4}>
                    <Typography variant="h5" color="error">
                        No application details available.
                    </Typography>
                    <Button variant="contained" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default ApplicationDetails;
