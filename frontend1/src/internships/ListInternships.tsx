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
    const [filteredInternships, setFilteredInternships] = useState<Internship[]>(internships);
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
                const internshipResponse = await fetch("http://localhost:8080/api/internships/");
                if (internshipResponse.ok) {
                    const internshipData = await internshipResponse.json();
                    setInternships(internshipData);
                    setFilteredInternships(internshipData);
                } else {
                    console.error("Failed to fetch internships.");
                }

                // Fetch user details
                if (userEmail) {
                    const userResponse = await fetch(`http://localhost:8080/api/users/email/${userEmail}`);
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setUserType(userData.userType);

                        // Fetch companyId if the user is associated with a company
                        const companyResponse = await fetch(`http://localhost:8080/api/company/user/${userData.id}`);
                        if (companyResponse.ok) {
                            const companyData = await companyResponse.json();
                            setCompanyId(companyData.id);

                            // Store companyId in local storage
                            localStorage.setItem("companyId", companyData.id);
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
                internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                internship.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                internship.location.toLowerCase().includes(searchQuery.toLowerCase())
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
        // Remove the email and companyId from localStorage when logging out
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userType");
        localStorage.removeItem("companyId");

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
                <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "20px" }}>
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
                {userType === "COMPANY" && (
                    <IconButton onClick={handleAddInternship} color="secondary">
                        <Add />
                    </IconButton>
                )}
            </div>

            <Box display="flex" flexDirection="column" alignItems="flex-end" style={{ marginTop: "20px" }}>
                <Button variant="contained" color="primary" onClick={handleMyInternships}>
                    My Internships
                </Button>
                <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginTop: "10px" }}>
                    Logout
                </Button>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                <div className="internships-list">
                    {filteredInternships.length > 0 ? (
                        filteredInternships.map((internship) => (
                            <div key={internship.id} className="internship-card">
                                <h3>{internship.title}</h3>
                                <p>Company: {internship.company.name}</p>
                                <p>Location: {internship.location}</p>
                                <p>Duration: {internship.duration}</p>
                                <Button onClick={() => handleViewDetails(internship.id)} variant="contained" color="primary">
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
