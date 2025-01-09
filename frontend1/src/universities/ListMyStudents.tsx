import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Button,
    CircularProgress,
    Box,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

interface Student {
    id: number;
    fullName: string;
    location: string;
    degree: string;
    skills: string[];
    expectedGraduationDate: string;
}

const ListMyStudents: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();

    const universityId =
        location.state?.universityId || localStorage.getItem("universityId");

    useEffect(() => {
        const fetchStudents = async () => {
            if (!universityId) {
                console.error("University ID is required to fetch students.");
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(
                    `http://localhost:8080/api/student/university/${universityId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    // Map response to required fields
                    const mappedStudents = data.map((student: any) => ({
                        id: student.id,
                        fullName: student.fullName,
                        location: student.location,
                        degree: student.degree,
                        skills: student.skills,
                        expectedGraduationDate: student.expectedGraduationDate,
                    }));
                    setStudents(mappedStudents);
                } else {
                    console.error("Failed to fetch students.");
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [universityId]);

    const handleViewDetails = (studentId: number) => {
        navigate(`/students/${studentId}`);
    };

    return (
        <div className="internships-container">
            <h1>My Students</h1>
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
                    {students.length > 0 ? (
                        students.map((student) => (
                            <div key={student.id} className="internship-card">
                                <h3>{student.fullName}</h3>
                                <p>Location: {student.location}</p>
                                <p>Degree: {student.degree}</p>
                                <p>
                                    Expected Graduation:{" "}
                                    {student.expectedGraduationDate}
                                </p>
                                <p>Skills: {student.skills.join(", ")}</p>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            handleViewDetails(student.id)
                                        }
                                    >
                                        See Details
                                    </Button>
                                </Box>
                            </div>
                        ))
                    ) : (
                        <p>No students found for your university.</p>
                    )}
                </div>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
        </div>
    );
};

export default ListMyStudents;
