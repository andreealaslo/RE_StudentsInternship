import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    IconButton,
    Grid2,
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/internships/"
                );
                if (response.ok) {
                    const data = await response.json();
                    setInternships(data);
                    setFilteredInternships(data);
                } else {
                    console.error("Failed to fetch internships.");
                }
            } catch (error) {
                console.error("Error fetching internships:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, []);

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

    return (
        <div className="internships-container">
            <h1 className="internships-title">Internships</h1>
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
                <Grid2 container spacing={3} className="internships-list">
                    {filteredInternships.length > 0 ? (
                        filteredInternships.map((internship) => (
                            <Grid2
                                item
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
                            </Grid2>
                        ))
                    ) : (
                        <Typography variant="body1">
                            No internships found matching your search.
                        </Typography>
                    )}
                </Grid2>
            )}
        </div>
    );
};

export default ListInternships;
