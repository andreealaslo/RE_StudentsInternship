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
                <Route
                    path="/internships/:id"
                    element={<InternshipDetails />}
                />
                <Route path="/companies/:id" element={<CompanyDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
