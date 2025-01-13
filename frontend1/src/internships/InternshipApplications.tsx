import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Card, CardContent, Typography, Divider, Button } from "@mui/material";

interface Application {
    id: number;
    student: {
        id: number;
        fullName: string;
        phoneNumber: string;
        age: number;
        location: string;
        pastExperience: string;
        degree: string;
        skills: string;
        projects: string;
    };
    internship: {
        id: number;
        title: string;
    };
    applicationDate: string;
    status: string;
}

const InternshipApplications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            if (!id) {
                console.error("Internship ID is required to fetch applications.");
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(
                    `http://localhost:8080/api/applications/internship/${id}/all-candidates`
                );
                if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                } else {
                    console.error("Failed to fetch applications.");
                }
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [id]);

    const handleStatusChange = async (applicationId: number, status: string) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/applications/internship/${id}/select/${applicationId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }), // Send the new status in the request body
                }
            );
            if (response.ok) {
                setApplications((prevApplications) =>
                    prevApplications.map((application) =>
                        application.id === applicationId
                            ? { ...application, status }
                            : application
                    )
                );
            } else {
                console.error("Failed to update application status.");
            }
        } catch (error) {
            console.error("Error updating application status:", error);
        }
    };

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
             <div className="applications-container">
             <Typography variant="h3"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: 4,
                                marginTop: 4,
                                fontSize: '2.5rem',
                                color: '#333'
                            }}>
                Applications for Internship
            </Typography>
            

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                <div>
                    {applications.length > 0 ? (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                            {applications.map((application) => (
                                <Card
                                    key={application.id}
                                    sx={{
                                        width: "300px", // Fixed width for each card
                                        padding: 2,
                                        boxShadow: 3,
                                        borderRadius: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" color="primary" gutterBottom>
                                            Student Information
                                        </Typography>
                                        <Divider />
                                        <Box sx={{ marginTop: 1 }}>
                                            <Typography variant="body1">
                                                <strong>Name:</strong> {application.student.fullName}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Phone Number:</strong> {application.student.phoneNumber}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Age:</strong> {application.student.age}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Location:</strong> {application.student.location}
                                            </Typography>
                                        </Box>

                                        <Typography variant="h6" color="primary" sx={{ marginTop: 2 }} gutterBottom>
                                            Education and Skills
                                        </Typography>
                                        <Divider />
                                        <Box sx={{ marginTop: 1 }}>
                                            <Typography variant="body1">
                                                <strong>Past Experience:</strong> {application.student.pastExperience}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Degree:</strong> {application.student.degree}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Skills:</strong> {application.student.skills}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Projects:</strong> {application.student.projects}
                                            </Typography>
                                        </Box>

                                        <Typography variant="h6" color="primary" sx={{ marginTop: 2 }} gutterBottom>
                                            Internship Details
                                        </Typography>
                                        <Divider />
                                        <Box sx={{ marginTop: 1 }}>
                                            <Typography variant="body1">
                                                <strong>Internship Title:</strong> {application.internship.title}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Application Date:</strong> {new Date(application.applicationDate).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Status:</strong> {application.status}
                                            </Typography>
                                        </Box>

                                        {/* Action buttons */}
                                        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleStatusChange(application.id, "ACCEPTED")}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleStatusChange(application.id, "REJECTED")}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No applications found for this internship.</Typography>
                    )}

                </div>
            )}
             </div>
            
        </div>
    );
};

export default InternshipApplications;
