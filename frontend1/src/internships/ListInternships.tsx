import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    TextField,
    IconButton,
    Typography,
    Button,
    CircularProgress,
    Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import "./ListInternships.css";

interface Company {
    name: string;
}

interface Internship {
    id: number;
    company: Company;
    title: string;
    location: string;
    duration: string;
}

const ListInternships: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredInternships, setFilteredInternships] =
        useState<Internship[]>(internships);
    const [loading, setLoading] = useState<boolean>(true);
    const [userType, setUserType] = useState<string | null>(null);
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [universityId, setUniversityId] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const storedEmail = localStorage.getItem("userEmail");
    const userEmail = storedEmail ? storedEmail : location.state?.email;

    useEffect(() => {
        if (userEmail) {
            // Store the email in localStorage when it is available
            localStorage.setItem("userEmail", userEmail);
        }
    }, [userEmail]);

    useEffect(() => {
        fetchData();
    }, [userEmail]);

    const fetchData = async () => {
        try {
            setLoading(true);
            await fetchInternships();
            await fetchUserData();
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInternships = async () => {
        const response = await fetch("http://localhost:8080/api/internships/");
        if (response.ok) {
            const data = await response.json();
            setInternships(data);
            setFilteredInternships(data);
        } else {
            console.error("Failed to fetch internships.");
        }
    };

    const fetchUserData = async () => {
        if (!userEmail) return;

        const userResponse = await fetch(
            `http://localhost:8080/api/users/email/${userEmail}`
        );
        if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserType(userData.userType);

            if (userData.userType === "COMPANY") {
                await fetchCompanyId(userData.id);
            } else if (userData.userType === "UNIVERSITY") {
                await fetchUniversityId(userData.id);
            }
        } else {
            console.error("Failed to fetch user details.");
        }
    };

    const fetchCompanyId = async (userId: number) => {
        const response = await fetch(
            `http://localhost:8080/api/company/user/${userId}`
        );
        if (response.ok) {
            const data = await response.json();
            setCompanyId(data.id);
            localStorage.setItem("companyId", data.id);
        } else {
            console.error("Failed to fetch company ID.");
        }
    };

    const fetchUniversityId = async (userId: number) => {
        const response = await fetch(
            `http://localhost:8080/api/university/user/${userId}`
        );
        if (response.ok) {
            const data = await response.json();
            setUniversityId(data.id);
            localStorage.setItem("universityId", data.id);
        } else {
            console.error("Failed to fetch university ID.");
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        const filtered = internships.filter(
            (internship) =>
                internship.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                internship.company.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                internship.location
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
        setFilteredInternships(filtered);
    };

    const handleViewDetails = (internshipId: number) => {
        navigate(`/internships/${internshipId}`);
    };

    const handleLogout = () => {
        // Remove the email and companyId from localStorage when logging out
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userType");
        localStorage.removeItem("companyId");
        localStorage.removeItem("universityId");

        // Redirect the user to the login page
        navigate("/");
    };

    const handleMyInternships = () => {
        if (!companyId) {
            alert("Company data is still loading.");
            return;
        }
        navigate("/my-internships", { state: { companyId } });
    };

    const handleMyStudents = () => {
        navigate("/my-students");
    };

    return (
        <div className="internships-container">
            <h1 className="internships-title">Internships</h1>
            {userType && (
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={{ marginBottom: "20px" }}
                >
                    Logged in as: {userType}
                </Typography>
            )}
            <div className="search-bar-container">
                <TextField
                    label="Search internships"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                />
                <IconButton onClick={handleSearch} color="primary">
                    <Search />
                </IconButton>
            </div>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                style={{ marginTop: "20px" }}
            >
                {userType === "COMPANY" && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleMyInternships}
                    >
                        My Internships
                    </Button>
                )}
                {userType === "UNIVERSITY" && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleMyStudents}
                    >
                        My Students
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    style={{ marginTop: "10px" }}
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
                <div className="internships-list">
                    {filteredInternships.length > 0 ? (
                        filteredInternships.map((internship) => (
                            <div
                                key={internship.id}
                                className="internship-card"
                            >
                                <h3>{internship.title}</h3>
                                <p>Company: {internship.company.name}</p>
                                <p>Location: {internship.location}</p>
                                <p>Duration: {internship.duration}</p>
                                <Button
                                    onClick={() =>
                                        handleViewDetails(internship.id)
                                    }
                                    variant="contained"
                                    color="primary"
                                >
                                    View Details
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No internships found matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListInternships;
