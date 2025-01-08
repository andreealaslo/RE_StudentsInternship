import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    TextField,
    IconButton,
    Grid,
    Typography,
    Button,
    CircularProgress,
    Box,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
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
    const navigate = useNavigate();
    const location = useLocation();

    const storedEmail = localStorage.getItem("userEmail");
    const userEmail = storedEmail ? storedEmail : location.state?.email;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch internships
                const internshipResponse = await fetch(
                    "http://localhost:8080/api/internships/"
                );
                if (internshipResponse.ok) {
                    const internshipData = await internshipResponse.json();
                    setInternships(internshipData);
                    setFilteredInternships(internshipData);
                } else {
                    console.error("Failed to fetch internships.");
                }

                // Fetch user details
                if (userEmail) {
                    const userResponse = await fetch(
                        `http://localhost:8080/api/users/email/${userEmail}`
                    );
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setUserType(userData.userType);

                        // Fetch companyId if the user is associated with a company
                        const companyResponse = await fetch(
                            `http://localhost:8080/api/company/user/${userData.id}`
                        );
                        if (companyResponse.ok) {
                            const companyData = await companyResponse.json();
                            setCompanyId(companyData.id);
                        } else {
                            console.error("Failed to fetch companyId.");
                        }
                    } else {
                        console.error("Failed to fetch user details.");
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userEmail]);

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

    const handleAddInternship = () => {
        if (!companyId) {
            alert("Please wait while your company data is being fetched.");
            return;
        }
        navigate("/add-internship", { state: { companyId } });
    };

    const handleLogout = () => {
        // Remove the email from localStorage when logging out
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userType");

        // Redirect the user to the login page
        navigate("/");
    };

    useEffect(() => {
        if (userEmail) {
            // Store the email in localStorage when it is available
            localStorage.setItem("userEmail", userEmail);
        }
    }, [userEmail]);

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
                    sx={{
                        marginRight: "10px",
                        borderRadius: "50px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",
                        },
                    }}
                />
                <IconButton onClick={handleSearch} color="primary">
                    <Search />
                </IconButton>
                {userType === "COMPANY" && (
                    <IconButton onClick={handleAddInternship} color="secondary">
                        <Add />
                    </IconButton>
                )}
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
    
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
                            <div key={internship.id} className="internship-card">
                                <h3 className="internship-title">
                                    {internship.title}
                                </h3>
                                <p className="internship-details">
                                    Company: {internship.company.name}
                                </p>
                                <p className="internship-details">
                                    Location: {internship.location}
                                </p>
                                <p className="internship-details">
                                    Duration: {internship.duration}
                                </p>
                                <Button
                                    onClick={() =>
                                        handleViewDetails(internship.id)
                                    }
                                    variant="contained"
                                    color="primary"
                                    className="view-details-button"
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
