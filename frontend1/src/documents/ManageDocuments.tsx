import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CircularProgress,
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import "./ManageDocuments.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import downloadIcon from '../assets/download.svg';

interface Document {
    id: number;
    fileName: string;
    fileType: string;
    fileSize: number;
    filePath: string;
    studentId?: number; // Optional, in case documents are associated with students
    universityId?: number; // Optional, in case documents are associated with universities
}

const ManageDocuments: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [studentDocuments, setStudentDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [userType, setUserType] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [universityId, setUniversityId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        initializeUserData();
            fetchData(); // Fetch documents once universityId is set
    }, [userId, universityId]);

    const initializeUserData = async () => {
        const storedStudentId = localStorage.getItem("studentId");
        const storedUniversityId = localStorage.getItem("universityId");

        if (storedStudentId) {
            setUserId(storedStudentId);
            setUserType("STUDENT");
            // Fetch university ID for the student
            const fetchedUniversityId = await fetchUniversityByStudent(storedStudentId);
            if (fetchedUniversityId) {
                setUniversityId(fetchedUniversityId); // Set university ID if available
            }
        } else if (storedUniversityId) {
            setUserId(storedUniversityId);
            setUserType("UNIVERSITY");
            setUniversityId(parseInt(storedUniversityId)); // Use the universityId directly from localStorage
        }
    };

    // Function to fetch the university associated with a student
    const fetchUniversityByStudent = async (studentId: string): Promise<number | null> => {
        try {
            const response = await fetch(`http://localhost:8080/api/university/student/${studentId}`);
            if (response.ok) {
                const data = await response.json();
                return data.id; // Return universityId if successful
            } else {
                console.error("Failed to fetch university for the student.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching university by student:", error);
            return null;
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            if (universityId) {
                await fetchUniversityDocuments();
            }
            if (userType === "STUDENT" && userId) {
                await fetchStudentDocuments();
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUniversityDocuments = async () => {
        if (!universityId) return;

        let url = `http://localhost:8080/api/files/university/${universityId}`;

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setDocuments(data);
        } else {
            console.error("Failed to fetch documents.");
        }
    };

    const fetchStudentDocuments = async () => {
        if (!userId && userType=="STUDENT") return;

        let url = `http://localhost:8080/api/files/student/${userId}`;

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setStudentDocuments(data);
        } else {
            console.error("Failed to fetch documents.");
        }
    };

        // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
        setFile(selectedFile);
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file first.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            let response;
            if (userType === 'UNIVERSITY' && universityId) {
                response = await fetch(
                    `http://localhost:8080/api/files/upload/university/${universityId}`,
                    { method: 'POST', body: formData }
                );
                if (response.ok) {
                    toast.success('File uploaded successfully!');
                    await fetchUniversityDocuments();
                } else {
                    toast.error('Error uploading file.');
                }
            } else if (userType === 'STUDENT' && userId) {
                response = await fetch(
                    `http://localhost:8080/api/files/upload/student/${userId}`,
                    { method: 'POST', body: formData }
                );
                if (response.ok) {
                    toast.success('File uploaded successfully!');
                    await fetchStudentDocuments();
                } else {
                    toast.error('Error uploading file.');
                }
            } else {
                toast.error('Error: Invalid user type or missing ID.');
            }
        } catch (error) {
            toast.error('Error uploading file.');
            console.error('Error uploading file:', error);
        }
    };


    const handleDownload = (filePath: string) => {
        const fileName = filePath.split("/").pop();
        if (!fileName) return;

        // Trigger file download
        const link = document.createElement("a");
        link.href = `http://localhost:8080/api/files/download/${fileName}`;
        link.download = fileName;
        link.click();
    };

    const handleDelete = async (fileId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/files/${fileId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('File deleted successfully!');
                await fetchData();
            } else {
                toast.error('Error deleting file.');
            }
        } catch (error) {
            toast.error('Error deleting file.');
            console.error('Error deleting file:', error);
        }
    };

    const handleLogout = () => {
        // Clear localStorage and navigate to login page
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="manage-documents-container">
            <ToastContainer />
            <div className="back-logout-buttons-container">
            <Box display="flex" justifyContent="space-between" margin="3px">
            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                        Back
            </Button>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            </div>
            <div className="content-container">
            <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: "20px" }}>
                <h1>
                Manage Documents
                </h1>
                    
            </Box>
            <div className="documents-container">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                <>
            <Typography 
                variant="h6" 
                style={{ marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', color: '#333' }}
            >
                Documents from University
            </Typography>
                <TableContainer component={Paper}
                style={{
                    marginTop: '20px',
                    maxHeight: documents.length >= 4 ? '300px' : 'auto', // Set maxHeight only for 6 or more entries
                    overflowY: documents.length >= 4 ? 'auto' : 'visible', // Enable scrolling
                }}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ backgroundColor: '#c95997', color: 'white', fontWeight: 'bold' }}>File Name</TableCell>
                                <TableCell sx={{ backgroundColor: '#c95997', color: 'white', fontWeight: 'bold', width: '50px' }}>
                                    { userType == "UNIVERSITY" && (
                                        <div>Delete</div>
                                    )}
                                </TableCell>
                            
                                <TableCell sx={{ backgroundColor: '#c95997', color: 'white', fontWeight: 'bold', width: '50px' }}>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.length > 0 ? (
                                documents.map((document) => (
                                    <TableRow key={document.id} >
                                        <TableCell sx={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{document.fileName}</TableCell>
                                            <TableCell sx={{ width: '50px' }}>
                                            { userType === "UNIVERSITY" && (
                                            <Button onClick={() => handleDelete(document.id)}>
                                                <DeleteIcon style={{ color: 'red' }} />
                                            </Button> )}
                                            </TableCell>
                                        
                                        <TableCell>
                                            <img
                                                src={downloadIcon}
                                                alt="Download"
                                                onClick={() => handleDownload(document.fileName)}
                                                style={{ cursor: "pointer", width: "24px", height: "24px"}}
                                            />
                                        </TableCell>
                                        
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2}>No documents available.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )}</div> 
            <Box
                display="flex"
                flexDirection="row"
                alignItems="flex-end"
                justifyContent="flex-end"
                width="50%"
                style={{ marginTop: "20px" }}
            >
                <Box
                display="flex"
                flexDirection="column"
                
                >
                    <Typography variant="h6" gutterBottom>Upload File</Typography>
                    <div className="input_container">
                    <input type="file" id="fileUpload" onChange={handleFileChange} />

                    </div>
                </Box>
                <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginTop: '10px' }}>
                    Upload
                </Button>
                {uploadStatus && (
                    <Typography variant="body1" color={uploadStatus === 'File uploaded successfully!' ? 'green' : 'red'}>
                        {uploadStatus}
                    </Typography>
                )}
            </Box>

            {userType === "STUDENT" && (
            <div className="documents-container">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                <>
            <Typography 
                variant="h6" 
                style={{ marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', color: '#333' }}
            >
                Your documents
            </Typography>
                <TableContainer component={Paper}
                style={{
                    marginTop: '20px',
                    maxHeight: studentDocuments.length >= 4 ? '300px' : 'auto', // Set maxHeight only for 6 or more entries
                    overflowY: studentDocuments.length >= 4 ? 'auto' : 'visible', // Enable scrolling
                }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#c95997', color: 'white', fontWeight: 'bold' }}>File Name</TableCell>
                                <TableCell sx={{ backgroundColor: '#c95997', color: 'white', fontWeight: 'bold', width: '50px' }}>Delete</TableCell>
                                <TableCell sx={{ backgroundColor: '#c95997', color: 'white', fontWeight: 'bold', width: '50px'  }}>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentDocuments.length > 0 ? (
                                studentDocuments.map((document) => (
                                    <TableRow key={document.id} >
                                        <TableCell>{document.fileName}</TableCell>
                                        <TableCell sx={{ width: '50px' }}>
            
                                            <Button onClick={() => handleDelete(document.id)}>
                                                <DeleteIcon style={{ color: 'red' }} />
                                            </Button>
                                            </TableCell>
                                        <TableCell sx={{ width: '50px' }}>
                                            <img
                                                src={downloadIcon}
                                                alt="Download"
                                                onClick={() => handleDownload(document.fileName)}
                                                style={{ cursor: "pointer", width: "24px", height: "24px" }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2}>No documents available.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )}</div> )}

            </div>
        </div>
    );
};

export default ManageDocuments;
