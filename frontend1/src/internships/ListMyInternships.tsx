import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Internship {
    id: number;
    title: string;
    location: string;
    duration: string;
}

const ListMyInternships: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [internshipToDelete, setInternshipToDelete] = useState<Internship | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const companyId = location.state?.companyId || localStorage.getItem("companyId");

    useEffect(() => {
        const fetchInternships = async () => {
            if (!companyId) {
                console.error("Company ID is required to fetch internships.");
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/api/internships/company/${companyId}`);
                if (response.ok) {
                    const data = await response.json();
                    setInternships(data);
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
    }, [companyId]);

    const handleViewDetails = (internshipId: number) => {
        navigate(`/internships/${internshipId}`);
    };

    const handleDeleteClick = (internship: Internship) => {
        setInternshipToDelete(internship);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!internshipToDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/api/internships/${internshipToDelete.id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setInternships((prev) => prev.filter((i) => i.id !== internshipToDelete.id));
            } else {
                console.error("Failed to delete internship.");
            }
        } catch (error) {
            console.error("Error deleting internship:", error);
        } finally {
            setDeleteDialogOpen(false);
            setInternshipToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setInternshipToDelete(null);
    };

    return (
        <div className="internships-container">
            <h1>My Internships</h1>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                <div className="internships-list">
                    {internships.length > 0 ? (
                        internships.map((internship) => (
                            <div key={internship.id} className="internship-card">
                                <h3>{internship.title}</h3>
                                <p>Location: {internship.location}</p>
                                <p>Duration: {internship.duration}</p>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewDetails(internship.id)}
                                    >
                                        See Details
                                    </Button>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteClick(internship)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </div>
                        ))
                    ) : (
                        <p>No internships found for your company.</p>
                    )}
                </div>
            )}
            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                Back
            </Button>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete the internship "{internshipToDelete?.title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        No, Go Back
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        Yes, Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListMyInternships;
