import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, CircularProgress, Box } from "@mui/material";
import "./ListMyApplications.css";

interface Application {
    id: number;
    student: {
        id: number;
        user: {
            id: number;
            email: string;
            name: string;
        };
        fullName: string;
    };
    internship: {
        id: number;
        company: {
            id: number;
            name: string;
        };
        title: string;
        location: string;
        duration: string;
    };
    applicationDate: string;
    status: string;
    theStudentSelected: boolean;
}

const ListMyApplications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();

    const studentId =
        location.state?.studentId || localStorage.getItem("studentId");

    useEffect(() => {
        if (studentId) {
            fetchApplications(studentId);
        } else {
            console.error("Student ID not found in localStorage.");
        }
    }, [studentId]);

    const fetchApplications = async (studentId: string) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://localhost:8080/api/applications/student/${studentId}`
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

    const handleViewDetails = (application: Application) => {
        navigate(`/applications/${application.id}`, { state: { application } });
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="applications-container">
            <h1>My Applications</h1>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                style={{ marginBottom: "20px" }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>

            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <div className="applications-list">
                    {applications.length > 0 ? (
                        applications.map((application) => (
                            <div
                                key={application.id}
                                className="application-card"
                            >
                                <h3>{application.internship.title}</h3>
                                <p>
                                    Company:{" "}
                                    {application.internship.company.name}
                                </p>
                                <p>
                                    Location: {application.internship.location}
                                </p>
                                <p>
                                    Application Date:{" "}
                                    {new Date(
                                        application.applicationDate
                                    ).toLocaleDateString()}
                                </p>
                                <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    marginTop="10px"
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            handleViewDetails(application)
                                        }
                                    >
                                        See Details
                                    </Button>
                                </Box>
                            </div>
                        ))
                    ) : (
                        <p>No applications found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListMyApplications;
