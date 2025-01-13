import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import CreateProfileStudent from "./profile/CreateProfileStudent";
import CreateProfileCompany from "./profile/CreateProfileCompany";
import CreateProfileUniversity from "./profile/CreateProfileUniversity";
import ListInternships from "./internships/ListInternships";
import InternshipDetails from "./internships/InternshipDetails";
import CompanyDetails from "./companies/CompanyDetails";
import AddInternship from "./internships/AddInternship";
import ListMyInternships from "./internships/ListMyInternships";
import EditInternship from "./internships/EditInternship";
import InternshipApplications from "./internships/InternshipApplications";
import ListMyStudents from "./universities/ListMyStudents";
import StudentDetails from "./students/StudentDetails";
import ListMyApplications from "./students/ListMyApplications";
import ApplicationDetails from "./internship-applications/ApplicationDetails";
import ManageDocuments from "./documents/ManageDocuments";
import "./global.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        main: "#b52b6e", // Custom primary color
        contrastText: "#fff", // Text color on primary buttons
    },
      secondary: {
        main: "#6b0e3b", // Custom secondary color
        contrastText: "#fff", // Text color on secondary buttons
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px", // Custom button border radius
            textTransform: "none", // Disable uppercase text by default
          },
        },
      },
    },
    typography: {
      fontFamily: "'Red Hat Display', sans-serif", // Default font for all variants
      body1: {
        fontFamily: "'Red Hat Display'", // Font only for body1
        fontWeight: 400, // Adjust as needed
      },
      h6: {
        fontFamily: "Funnel Display"
      },
      h3: {
        fontFamily: "Funnel Display"
      }
    },
  });

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/create-profile/student"
                        element={<CreateProfileStudent />}
                    />
                    <Route
                        path="/create-profile/university"
                        element={<CreateProfileUniversity />}
                    />
                    <Route
                        path="/create-profile/company"
                        element={<CreateProfileCompany />}
                    />
                    <Route path="/internships" element={<ListInternships />} />
                    <Route path="/my-internships" element={<ListMyInternships />} />
                    <Route
                        path="/internships/:id"
                        element={<InternshipDetails />}
                    />
                    <Route path="/companies/:id" element={<CompanyDetails />} />
                    <Route path="/add-internship" element={<AddInternship />} />
                    <Route path="/edit-internship" element={<EditInternship />} />
                    <Route
                        path="/internship-applications/:id"
                        element={<InternshipApplications />}
                    />
                    <Route path="/my-students" element={<ListMyStudents />} />
                    <Route path="/students/:id" element={<StudentDetails />} />
                    <Route
                        path="/my-applications"
                        element={<ListMyApplications />}
                    />
                    <Route
                        path="/applications/:id"
                        element={<ApplicationDetails />}
                    />
                    <Route path="/manage-documents" element={<ManageDocuments/>} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
