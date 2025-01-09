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
} from "@mui/material";

interface StudentDetails {
    id: number;
    fullName: string;
    phoneNumber: string;
    age: number;
    location: string;
    linkedinLink: string;
    githubLink: string;
    degree: string;
    expectedGraduationDate: string;
    pastExperience: string[];
    skills: string[];
    projects: string[];
    knownLanguages: string[];
    hobbies: string[];
}

const StudentDetailsPage: React.FC = () => {
    const [student, setStudent] = useState<StudentDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentDetails = async () => {
            if (!id) {
                console.error("Student ID is required to fetch details.");
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(
                    `http://localhost:8080/api/student/${id}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setStudent(data);
                } else {
                    console.error("Failed to fetch student details.");
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [id]);

    return (
        <div>
            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 4,
                }}
            >
                Student Details
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
            ) : student ? (
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
                                Personal Information
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    <strong>Full Name:</strong>{" "}
                                    {student.fullName}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Phone Number:</strong>{" "}
                                    {student.phoneNumber}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Age:</strong> {student.age}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Location:</strong>{" "}
                                    {student.location}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>LinkedIn:</strong>{" "}
                                    <a
                                        href={student.linkedinLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {student.linkedinLink}
                                    </a>
                                </Typography>
                                <Typography variant="body1">
                                    <strong>GitHub:</strong>{" "}
                                    <a
                                        href={student.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {student.githubLink}
                                    </a>
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Education and Skills
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    <strong>Degree:</strong> {student.degree}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Expected Graduation:</strong>{" "}
                                    {student.expectedGraduationDate}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Skills:</strong>{" "}
                                    {student.skills.join(", ")}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Known Languages:</strong>{" "}
                                    {student.knownLanguages.join(", ")}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Projects and Experiences
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    <strong>Past Experience:</strong>{" "}
                                    {student.pastExperience.join(", ")}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Projects:</strong>{" "}
                                    {student.projects.join(", ")}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                gutterBottom
                            >
                                Hobbies
                            </Typography>
                            <Divider />
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1">
                                    {student.hobbies.join(", ")}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    marginTop: 3,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                <Typography>No details found for this student.</Typography>
            )}
        </div>
    );
};

export default StudentDetailsPage;
