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

const CompanyDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const company: Company | null = location.state?.company || null;

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
                Company Details
            </Typography>

            {company ? (
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
                                    <strong>Name:</strong> {company.name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Field of Work:</strong>{" "}
                                    {company.fieldOfWork}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Location:</strong>{" "}
                                    {company.location}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Size:</strong> {company.companySize}
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
                                    {company.description}
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
                                {company.websiteLink ? (
                                    <Link
                                        href={company.websiteLink}
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
                <Box textAlign="center" padding={4}>
                    <Typography variant="h5" color="error">
                        No company details available.
                    </Typography>
                    <Button variant="contained" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default CompanyDetails;
