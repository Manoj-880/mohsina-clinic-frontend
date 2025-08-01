/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Descriptions, Tabs, Empty, Space, Button, Modal, Input, Typography } from "antd";
import { deletePatient, getPatientById } from "../../api/patients_api";
import { toast } from "react-toastify";
import UpdatePatient from "./updatePatient";
import UpdateFollowUp from "./updateFollowup";
import AddFollowUp from "./addFollowUp";

const { Title } = Typography;
const { TabPane } = Tabs;

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [confirmName, setConfirmName] = useState("");
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [followupUpdateModalVisible, setFollowupUpdateModalVisible] = useState(false);
    const [followupId, setFollowupId] = useState("");
    const [addFollowUpVisible, setAddFollowUpVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatientData();
    }, []);

    const handleUpdateFollowup = async(id) => {
        console.log(id);
        setFollowupId(id);
        setFollowupUpdateModalVisible(true);
    }

    const handleAddFollowUp = async() => {
        setAddFollowUpVisible(true);
    }

    const fetchPatientData = async () => {
        try {
            const localUser = JSON.parse(localStorage.getItem("user"));
            const response = await getPatientById(id, localUser?.secretKey);
            setPatient(response.data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const handleUpdate = () => {
        setUpdateModalVisible(true);
    }

    const confirmDelete = async () => {
        const actualName = patient.priliminaryDetails?.[0]?.name || "";
        if (confirmName.trim() === actualName.trim()) {
            const localUser = JSON.parse(localStorage.getItem("user"));
            let response = await deletePatient(id, localUser?.secretKey);
            console.log(response);
            if(response.success){
                toast.success(response.message);
                setDeleteModalVisible(false);
                navigate("/patients"); // Redirect to the patients page
            } else {
                toast.error(response.message);
            }
        } else {
            toast.error("Name did not match. Patient not deleted.");
        }
    };


    const capitalizeLabel = (label) =>
        label
            .replace(/_/g, " ")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    const renderDescriptions = (data) =>
        data &&
        Object.entries(data)
            .filter(([key]) => key !== "V")
            .map(([key, value]) => (
                <Descriptions.Item label={capitalizeLabel(key)} key={key}>
                    {typeof value === "object" && value !== null ? JSON.stringify(value) : value || "—"}
                </Descriptions.Item>
            ));

    if (!patient) {
        return <Empty description="No patient data provided." />;
    }

    return (
        <div className="patient-detail-page">
            <Modal
                title="Confirm Delete"
                open={deleteModalVisible}
                onOk={confirmDelete}
                onCancel={() => setDeleteModalVisible(false)}
                okText="Delete"
                okButtonProps={{ danger: true }}
            >
                <p>Please type the <span style={{fontWeight: "bold", color: "red"}}> {patient.priliminaryDetails?.[0]?.name}</span> to confirm deletion:</p>
                <Input
                    placeholder="Type full name"
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                />
            </Modal>
            <Modal
                title="Update Patient"
                open={updateModalVisible}
                onCancel={() => setUpdateModalVisible(false)}
                footer={null}
                destroyOnHidden
            >
                <UpdatePatient onFinish={() => setUpdateModalVisible(false)} fetchPatients={fetchPatientData} patient={patient} />
            </Modal>
            <Modal
                title="Add Notes"
                open={followupUpdateModalVisible}
                onCancel={() => setFollowupUpdateModalVisible(false)}
                footer={null}
                destroyOnHidden
            >
                <UpdateFollowUp _id={followupId} onClose={() => setFollowupUpdateModalVisible(false)} fetchFollowups={fetchPatientData} />
            </Modal>
            <Modal
                title="Add new followup"
                open={addFollowUpVisible}
                onCancel={() => setAddFollowUpVisible(false)}
                footer={null}
                destroyOnHidden
            >
                <AddFollowUp onClose={() => setAddFollowUpVisible(false)} fetchFollowups={fetchPatientData} patientId={id} />
            </Modal>

            <Card>
                <Space style={{ marginBottom: "1rem", justifyContent: "space-between", width: "100%" }} align="center">
                    <Title level={3} style={{ margin: 0 }}>
                        {patient.priliminaryDetails?.[0]?.name || "Unnamed Patient"}
                    </Title>
                    <Space>
                        <Button type="primary" onClick={handleAddFollowUp}>
                            Add Follow Up
                        </Button>
                        <Button size="medium" style={{color:"green", border:'1px solid green'}} onClick={handleUpdate}>
                            Update Patient
                        </Button>
                        <Button danger onClick={handleDelete}>
                            Delete Patient
                        </Button>
                    </Space>
                </Space>
                <Tabs defaultActiveKey="1" tabPosition="top">
                    <TabPane tab="Preliminary Data" key="1">
                        {patient.priliminaryDetails && patient.priliminaryDetails.length > 0 ? (
                            <Descriptions column={1} bordered>
                                {renderDescriptions(patient.priliminaryDetails[0])}
                            </Descriptions>
                        ) : (
                            <Empty description="No Preliminary Data" />
                        )}
                    </TabPane>

                    <TabPane tab="Complaint & History" key="2">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Chief Complaint">{patient.chiefComplaint || "—"}</Descriptions.Item>
                            <Descriptions.Item label="History of Chief Complaint">{patient.historyOfChiefComplaint || "—"}</Descriptions.Item>
                            <Descriptions.Item label="Past History">{patient.pastHistory || "—"}</Descriptions.Item>
                            <Descriptions.Item label="Family History">{patient.familyHistory || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    <TabPane tab="Patient As Person" key="3">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Sexual Functions">
                                {patient.patientAsPerson?.sexualFunctions || "—"}
                            </Descriptions.Item>
                        </Descriptions>

                        <Tabs type="card">
                            <TabPane tab="Appearance" key="3-1">
                                <Descriptions column={1} bordered>
                                    {renderDescriptions(patient.patientAsPerson?.appearance)}
                                </Descriptions>
                            </TabPane>
                            <TabPane tab="Digestion" key="3-2">
                                <Descriptions column={1} bordered>
                                    {renderDescriptions(patient.patientAsPerson?.digestion)}
                                </Descriptions>
                            </TabPane>
                            <TabPane tab="Elimination" key="3-3">
                                <Descriptions column={1} bordered>
                                    {renderDescriptions(patient.patientAsPerson?.elimination)}
                                </Descriptions>
                            </TabPane>
                            <TabPane tab="Menstrual History" key="3-4">
                                <Descriptions column={1} bordered>
                                    {renderDescriptions({
                                        menarche: patient.patientAsPerson?.menstrualHistory?.menarche,
                                        LMP: patient.patientAsPerson?.menstrualHistory?.LMP,
                                        menopause: patient.patientAsPerson?.menstrualHistory?.menopause,
                                        leucorrhea: patient.patientAsPerson?.menstrualHistory?.leucorrhea,
                                    })}
                                </Descriptions>
                                <Descriptions title="Menses" column={1} bordered>
                                    {renderDescriptions(patient.patientAsPerson?.menstrualHistory?.menses)}
                                </Descriptions>
                                <Descriptions title="Concomitance" column={1} bordered>
                                    {renderDescriptions(patient.patientAsPerson?.menstrualHistory?.concomitance)}
                                </Descriptions>
                            </TabPane>
                        </Tabs>
                    </TabPane>

                    <TabPane tab="Life Space" key="4">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Life Space">{patient.lifeSpace || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    <TabPane tab="Thermals" key="5">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Thermals">{patient.thermals || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    <TabPane tab="Diagnosis" key="6">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Diagnosis">{patient.diagnosis || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    <TabPane tab="Prescription" key="7">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Prescription">{patient.prescription || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    <TabPane tab="Follow Ups" key="8">
                        {Array.isArray(patient.followUps) && patient.followUps.length > 0 ? (
                            patient.followUps.slice().map((fup, index) => (
                                <Card
                                    key={index}
                                    title={`Follow Up #${index + 1}`}
                                    style={{ marginBottom: "1rem" }}
                                    extra={
                                        (!fup.followupNotes || fup.followupNotes.trim() === "") && (
                                            <Button size="medium" style={{color:"green", border:'1px solid green'}} onClick={() => handleUpdateFollowup(fup._id)}>
                                                Add Notes
                                            </Button>
                                        )
                                    }
                                >
                                    <Descriptions column={1} bordered>
                                        {renderDescriptions(fup)}
                                    </Descriptions>
                                </Card>
                            ))
                        ) : (
                            <Descriptions column={1} bordered>
                                <Descriptions.Item label="Follow Ups">
                                    {patient.followUps || "—"}
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                    </TabPane>

                </Tabs>
            </Card>
        </div>
    );
};

export default PatientDetails;
