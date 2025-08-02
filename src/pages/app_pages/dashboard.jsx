import React, { useEffect, useState } from "react";
import { Card, List, Button, Tag, Skeleton, Modal } from "antd";
import AddPatientPopup from "../../components/app_components/addPatientPopup";
import { getDashboardPatientData } from "../../api/dashboard_api";
import AddFollowUp from "../../components/app_components/addFollowUp";
import { useNavigate } from "react-router-dom";
import AddDocument from "../../components/app_components/addDocument";

const Dashboard = () => {
    const [showAddPatientPopup, setShowAddPatientPopup] = useState(false);
    const [showAddFollowUpPopup, setShowAddFollowUpPopup] = useState(false);
    const [showDocumentPopup, setShowDocumentPopup] = useState(false);
    const [patientsData, setPatientsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = async () => {
        try {
            let localUser = await JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            const response = await getDashboardPatientData(localUser.name, localUser.secretKey);
            if (response) {
                setPatientsData(response.data);
            }
        } catch (error) {
            console.error("Error fetching patient data:", error);
        } finally {
            setLoading(false);
        }
    };

    const onclickPatientCard = (patientId) => {
        navigate(`/patients/${patientId}`);
    };

    return (
        <div className="dashboard">
            <Modal
                title="Add New Patient"
                open={showAddPatientPopup}
                onCancel={() => setShowAddPatientPopup(false)}
                footer={null}
                destroyOnClose
            >
                <AddPatientPopup onClose={() => setShowAddPatientPopup(false)} />
            </Modal>
            <Modal
                title="Add Follow-Up"
                open={showAddFollowUpPopup}
                onCancel={() => setShowAddFollowUpPopup(false)}
                footer={null}
                destroyOnClose
            >
                <AddFollowUp onClose={() => setShowAddFollowUpPopup(false)} fetchFollowups={fetchPatientData} />
            </Modal>
            <Modal
                title="Upload Document"
                open={showDocumentPopup}
                onCancel={() => setShowDocumentPopup(false)}
                footer={null}
                destroyOnHidden
            >
                <AddDocument onClose={() => setShowDocumentPopup(false)} fetchDocuments={fetchPatientData} />
            </Modal>

            <p style={{padding: 0, fontSize: 18, margin:0, fontWeight: "bold", color: 'var(--color-text)', display:'block'}}>Admin Controls</p>
            <div className="dashboard-row quick-actions-row">
                <Button className="quick-action-btn" onClick={() => setShowAddPatientPopup(true)}>
                    + Add New Patient
                </Button>
                <Button className="quick-action-btn" onClick={() => setShowAddFollowUpPopup(true)}>
                    + Add FollowUp
                </Button>
                <Button className="quick-action-btn" onClick={() => setShowDocumentPopup(true)}>
                    + Upload Document
                </Button>
            </div>

            <div className="dashboard-row">
                {loading ? (
                    [...Array(3)].map((_, index) => (
                        <Card key={index} className="dashboard-card patient-card">
                            <Skeleton active />
                        </Card>
                    ))
                ) : patientsData.length === 0 ? (
                    <p style={{ fontSize: 16, fontWeight: 500, color: 'gray', marginTop: "1rem" }}>
                        No followups today.
                    </p>
                ) : (
                    <>
                        <p style={{ padding: 0, fontSize: 18, margin: 0, fontWeight: "bold", color: 'var(--color-text)', width: "100%" }}>
                            Today's Patients
                        </p>
                        {patientsData.map((patient) => (
                            <Card
                                key={patient.patientId}
                                className="dashboard-card patient-card col-sm-4"
                                size="small"
                                title={
                                    <div className="patient-title">
                                        <span style={{ marginRight: "0.5rem" }}>{patient.name}</span>
                                        {patient.isNew && <Tag color="green">NEW</Tag>}
                                    </div>
                                }
                                onClick={() => onclickPatientCard(patient.patientId)}
                                style={{ cursor: "pointer" }}
                            >
                                {!patient.isNew ? (
                                    <>
                                        <div className="last-visited" style={{ color: "var(--color-text)", fontSize: "0.875rem" }}>
                                            <span style={{ fontWeight: "bold", color: "var(--color-primary-dark)", fontSize: "0.9rem" }}>
                                                Last Visited:
                                            </span>{" "}
                                            {patient.lastVisited}
                                        </div>
                                        <div className="visit-description" style={{ color: "var(--color-text)", fontSize: "0.875rem" }}>
                                            {patient.lastVisitDescription}
                                        </div>
                                    </>
                                ) : (
                                    <div className="new-patient-note">
                                        This is a new patient appointment.
                                    </div>
                                )}
                            </Card>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;