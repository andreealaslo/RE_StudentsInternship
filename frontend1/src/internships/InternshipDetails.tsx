import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Link,
    Divider,
} from "@mui/material";
import "./InternshipDetails.css";

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

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!internship) {
        return (
            <Box textAlign="center" padding={4}>
                <Typography variant="h5" color="error">
                    Internship not found.
                </Typography>
                <Button variant="contained" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box className="internship-details-container">
            <h1 className="internship-details-title">{internship.title}</h1>
            <Box marginTop={2}>
                <Typography variant="h6">
                    <strong>Details</strong>
                </Typography>
                <Typography variant="body1" className="detail-item">
                    Location: {internship.location}
                </Typography>
                <Typography variant="body1" className="detail-item">
                    Duration: {internship.duration}
                </Typography>
            </Box>

            <Divider className="divider" />

            <Box marginTop={2}>
                <Typography variant="h6">
                    <strong>Description</strong>
                </Typography>
                <Typography variant="body1" className="detail-item">
                    {internship.description}
                </Typography>
            </Box>

            <Divider className="divider" />

            <Box marginTop={2}>
                <Typography variant="h6">
                    <strong>Requirements</strong>
                </Typography>
                <Typography variant="body1" className="detail-item">
                    {internship.requirements}
                </Typography>
            </Box>

            <Divider className="divider" />

            <Box marginTop={2}>
                <Typography variant="h6">
                    <strong>Company</strong>
                </Typography>
                <Typography variant="body1">
                    <Link
                        onClick={() =>
                            navigate(`/companies/${internship.company.id}`, {
                                state: { company: internship.company },
                            })
                        }
                        color="primary"
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                    >
                        {internship.company.name}
                    </Link>
                </Typography>
            </Box>

            <Box marginTop={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </Button>
            </Box>
        </Box>
    );
};

export default InternshipDetails;
