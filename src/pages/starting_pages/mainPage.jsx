import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SideNav from "../../components/global/sidenav";
import Header from "../../components/global/header";
import Dashboard from "../app_pages/dashboard";
import NotFoundPage from "../app_pages/notFoundPage";
import Patients from "../app_pages/patients";
import OP from "../app_pages/op";
import Documents from "../app_pages/documents";
import PatientDetails from "../../components/app_components/patientDetails";
import OpDetails from "../../components/app_components/opDetails";
import PatientOpList from "../../components/app_components/patientOpList";

const MainPage = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  useEffect(() => {
    // Check if user exists in localStorage
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="layout-container">
      <SideNav isOpen={isSidenavOpen} />

      <div className="main-content">
        <Header isSidenavOpen={isSidenavOpen} onToggle={toggleSidenav} />

        <div className="page-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/op" element={<OP />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/op/patient-op-list/:patientId" element={<PatientOpList />} />
            <Route path="/op/:opId" element={<OpDetails />} />
            {/* Add other routes as needed */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
