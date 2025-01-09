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

const App: React.FC = () => {
    return (
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
            </Routes>
        </Router>
    );
};

export default App;
