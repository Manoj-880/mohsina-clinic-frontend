import React, { useEffect, useState } from "react";
import { Card, List, Button, Tag, Skeleton, Modal } from "antd";
import AddPatientPopup from "../../components/app_components/addPatientPopup";
import { getDashboardPatientData } from "../../api/dashboard_api";

const Dashboard = () => {
    const [showAddPatientPopup, setShowAddPatientPopup] = useState(false);
    const [patientsData, setPatientsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Example: Dummy data for documents and medicines
    const documents = [
        "X-Ray Report.pdf",
        "Prescription 06/10/2024",
        "Lab Results.docx",
    ];

    const medicines = [
        { name: "Paracetamol", quantity: 120 },
        { name: "Ibuprofen", quantity: 80 },
        { name: "Amoxicillin", quantity: 50 },
    ];

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = async () => {
        try {
            setLoading(true);
            const response = await getDashboardPatientData();
            if (response) {
                setPatientsData(response);
            }
        } catch (error) {
            console.error("Error fetching patient data:", error);
            // Handle error state if needed
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <Modal
                title="Add New Patient"
                open={showAddPatientPopup}
                onCancel={() => setShowAddPatientPopup(false)}
                footer={null}
                destroyOnHidden
                >
                    <AddPatientPopup onClose={() => setShowAddPatientPopup(false)} />
            </Modal>
            <p style={{padding: 0, fontSize: 18, margin:0, fontWeight: "bold", color: 'var(--color-text)'}}>Admin Controls</p>
            <div className="dashboard-row">
                {/* Medicines */}
                <Card className="dashboard-card list-card" title="Medicine Inventory">
                <List
                    size="small"
                    dataSource={medicines}
                    renderItem={(item) => (
                    <List.Item>
                        {item.name} - Stock: {item.quantity}
                    </List.Item>
                    )}
                />
                </Card>

                {/* Documents */}
                <Card className="dashboard-card list-card" title="Quick Documents">
                <List
                    size="small"
                    dataSource={documents}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
                </Card>

                {/* Quick Actions */}
                <Card className="dashboard-card quick-actions-card" title="Quick Actions">
                <Button block className="quick-action-btn" onClick={() => setShowAddPatientPopup(true)}>
                    + Add New Patient
                </Button>
                <Button block className="quick-action-btn">
                    + Add FollowUp
                </Button>
                <Button block className="quick-action-btn">
                    + Upload Document
                </Button>
                </Card>
            </div>
            {patientsData.length > 0 ? <p style={{padding: 0, fontSize: 18, margin:0, fontWeight: "bold", color: 'var(--color-text)'}}>Today's Patients</p>: <></>}
            <div className="dashboard-row">
                {loading ? (
                    <>
                        {[...Array(3)].map((_, index) => (
                            <Card key={index} className="dashboard-card patient-card">
                                <Skeleton active />
                            </Card>
                        ))}
                    </>
                ) : (
                    patientsData
                        .map((patient) => (
                            <Card
                                key={patient.id}
                                className="dashboard-card patient-card"
                                size="small"
                                title={
                                    <div className="patient-title">
                                        <span style={{ marginRight: "0.5rem" }}>{patient.name}</span>
                                        {patient.isNew && <Tag color="green">NEW</Tag>}
                                    </div>
                                }
                            >
                                {!patient.isNew && (
                                    <>
                                        <div className="last-visited" style={{color: "var(--color-text)", fontSize: "0.875rem"}}>
                                            <span style={{fontWeight: "bold", color: "var(--color-primary-dark)", fontSize: "0.9rem"}}>Last Visited:</span> {patient.lastVisited}
                                        </div>
                                        <div className="visit-description" style={{color: "var(--color-text)", fontSize: "0.875rem"}}>
                                            {patient.lastVisitDescription}
                                        </div>
                                    </>
                                )}
                                {patient.isNew && (
                                    <div className="new-patient-note">
                                        This is a new patient appointment.
                                    </div>
                                )}
                            </Card>
                        ))
                )}
            </div>
            
        </div>
    );
};

export default Dashboard;
