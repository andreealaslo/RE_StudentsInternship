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
    const userEmail = location.state?.email;

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
                {
                userType === "COMPANY" && (
                    <IconButton onClick={handleAddInternship} color="secondary">
                        <Add />
                    </IconButton>
                )}
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
                <Grid container spacing={3} className="internships-list">
                    {filteredInternships.length > 0 ? (
                        filteredInternships.map((internship) => (
                            <Grid
                                item={true}
                                xs={12}
                                sm={6}
                                md={4}
                                key={internship.id}
                                component="div"
                            >
                                <div className="internship-card">
                                    <Typography
                                        variant="h6"
                                        className="internship-title"
                                        onClick={() =>
                                            handleViewDetails(internship.id)
                                        }
                                        style={{
                                            cursor: "pointer",
                                            color: "#1976d2",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {internship.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                        style={{
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Company: {internship.company.name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                        style={{
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Location: {internship.location}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                        style={{
                                            marginBottom: "16px",
                                        }}
                                    >
                                        Duration: {internship.duration}
                                    </Typography>
                                    <Button
                                        onClick={() =>
                                            handleViewDetails(internship.id)
                                        }
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1">
                            No internships found matching your search.
                        </Typography>
                    )}
                </Grid>
            )}
        </div>
    );
};

export default ListInternships;
