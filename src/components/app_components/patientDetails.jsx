/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Button, Tabs, Empty } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { getPatientById } from "../../api/patients_api";

const { TabPane } = Tabs;

const PatientDetails = () => {
    // const navigate = useNavigate();
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = async () => {
        try {
            let response = await getPatientById(id);
            setPatient(response);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    };

    if (!patient) {
        return <Empty description="No patient data provided." />;
    }

    const capitalizeLabel = (label) => {
    // Replace underscores with spaces, then insert space before capital letters, and capitalize each word
    return label
        .replace(/_/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
};


    const renderDescriptions = (data) =>
        data &&
        Object.entries(data).map(([key, value]) => (
            <Descriptions.Item label={capitalizeLabel(key)} key={key}>
                {typeof value === "object" && value !== null
                    ? JSON.stringify(value)
                    : value || "—"}
            </Descriptions.Item>
        ));

    return (
        <div className="patient-detail-page">
            <Card>
                <Tabs defaultActiveKey="1" tabPosition="top">
                    {/* 1. Preliminary Data */}
                    <TabPane tab="Preliminary Data" key="1">
                        <Descriptions column={1} bordered>
                            {renderDescriptions(patient.preliminaryData)}
                        </Descriptions>
                    </TabPane>

                    {/* 2. Chief Complaint */}
                    <TabPane tab="Complaint & History" key="2">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Chief Complaint">
                                {patient.chiefComplaint || "—"}
                            </Descriptions.Item>
                            <Descriptions.Item label="History of Chief Complaint">
                                {patient.historyOfChiefComplaint || "—"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Past History">
                                {patient.pastHistory || "—"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Family History">
                                {patient.familyHistory || "—"}
                            </Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    {/* 3. Patient as Person */}
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

                    {/* 4. Life Space */}
                    <TabPane tab="Life Space" key="4">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Life Space">{patient.lifeSpace || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    {/* 5. Thermals */}
                    <TabPane tab="Thermals" key="5">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Thermals">{patient.thermals || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    {/* 6. Diagnosis */}
                    <TabPane tab="Diagnosis" key="6">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Diagnosis">{patient.diagnosis || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    {/* 7. Prescription */}
                    <TabPane tab="Prescription" key="7">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Prescription">{patient.prescription || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>

                    {/* 8. Follow Ups */}
                    <TabPane tab="Follow Ups" key="8">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Follow Ups">{patient.followUps || "—"}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default PatientDetails;
