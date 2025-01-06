import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Link, Button } from "@mui/material";
import "./CompanyDetails.css";

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

    if (!company) {
        return (
            <Box textAlign="center" padding={4}>
                <Typography variant="h5" color="error">
                    No company details available.
                </Typography>
                <Button variant="contained" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box className="company-details-container">
            <h1 className="internship-details-title">{company.name}</h1>
            <Typography variant="h6">
                <strong>Description</strong>
            </Typography>
            <Typography variant="body1" className="detail-item">
                {company.description}
            </Typography>
            <Typography variant="h6">
                <strong>Field of Work</strong>
            </Typography>
            <Typography variant="body1" className="detail-item">
                {company.fieldOfWork}
            </Typography>
            <Typography variant="h6">
                <strong>Location</strong>
            </Typography>
            <Typography variant="body1" className="detail-item">
                {company.location}
            </Typography>
            <Typography variant="h6">
                <strong>Size</strong>
            </Typography>
            <Typography variant="body1" className="detail-item">
                {company.companySize}
            </Typography>
            <Typography variant="h6">
                <strong>Website</strong>
            </Typography>
            {company.websiteLink && (
                <Link
                    href={company.websiteLink}
                    target="_blank"
                    rel="noopener"
                    color="primary"
                >
                    Visit Website
                </Link>
            )}
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

export default CompanyDetails;
