/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/PatientDetail.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Descriptions, Button, Tabs, Empty } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { getPatientById } from "../../api/patients_api";

const { TabPane } = Tabs;

const PatientDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [patient, setPatient] = useState({});

    useEffect(() => {
        fetchPatientdata();
    }, []);

    const fetchPatientdata = async() => {
        try {
            let response = await getPatientById(id);
            setPatient(response);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }

    if (!patient) {
        return <Empty description="No patient data provided." />;
    }

    return (
        <div className="patient-detail-page">
        <Button
            icon={<LeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ marginBottom: 20 }}
        >
            Back to Patients
        </Button>

        <Card title={`Patient: ${patient.name}`} bordered>
            <Tabs defaultActiveKey="1">
            {/* Personal Data Tab */}
            <TabPane tab="Personal Data" key="1">
                <Descriptions column={1} bordered>
                <Descriptions.Item label="Mobile Number">{patient.mobile}</Descriptions.Item>
                <Descriptions.Item label="Age">{patient.age}</Descriptions.Item>
                <Descriptions.Item label="Gender">{patient.gender}</Descriptions.Item>
                <Descriptions.Item label="Occupation">{patient.occupation || "—"}</Descriptions.Item>
                <Descriptions.Item label="Education">{patient.education || "—"}</Descriptions.Item>
                <Descriptions.Item label="Marital Status">{patient.maritalStatus || "—"}</Descriptions.Item>
                <Descriptions.Item label="Religion">{patient.religion || "—"}</Descriptions.Item>
                <Descriptions.Item label="Monthly Income">{patient.monthlyIncome || "—"}</Descriptions.Item>
                <Descriptions.Item label="Address">{patient.address || "—"}</Descriptions.Item>
                </Descriptions>
            </TabPane>

            {/* Health Records Tab */}
            <TabPane tab="Health Records" key="2">
                <Descriptions column={1} bordered>
                <Descriptions.Item label="Date of Case">{patient.dateOfCase || "—"}</Descriptions.Item>
                <Descriptions.Item label="Doctor">{patient.doctor || "Mohasina"}</Descriptions.Item>
                <Descriptions.Item label="Last Visit">{patient.lastVisited || "—"}</Descriptions.Item>
                <Descriptions.Item label="Next Visit">{patient.nextVisit || "—"}</Descriptions.Item>
                <Descriptions.Item label="Visit Notes">{patient.lastVisitDescription || "—"}</Descriptions.Item>
                <Descriptions.Item label="Is New">{patient.isNew ? "Yes" : "No"}</Descriptions.Item>
                </Descriptions>
            </TabPane>
            </Tabs>
        </Card>
        </div>
    );
};

export default PatientDetails;
