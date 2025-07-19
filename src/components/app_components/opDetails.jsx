import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, Descriptions, Button, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getOpById } from '../../api/op_api';

const OpDetails = () => {
    const { opId } = useParams();
    const navigate = useNavigate();
    const [op, setOp] = useState({});

    useEffect(() => {
        fetchOpDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchOpDetails = async () => {
        try {
            let response = await getOpById(opId);
            if (response) {
                setOp(response);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="op-details-container">
        <Button icon={<LeftOutlined />} onClick={() => navigate(-1)} className="back-btn">
            Back
        </Button>

        <Card title={`Patient ID: ${op.patientId} | OP Date: ${op.date}`} className="op-details-card">
            <Tabs defaultActiveKey="1" className="op-tabs">
            <Tabs.TabPane tab="Summary" key="1">
                <Descriptions bordered column={1}>
                <Descriptions.Item label="Chief Complaint">{op.chiefComplaint}</Descriptions.Item>
                <Descriptions.Item label="History of Complaint">{op.historyOfChiefComplaint}</Descriptions.Item>
                <Descriptions.Item label="Past History">{op.pastHistory}</Descriptions.Item>
                <Descriptions.Item label="Family History">{op.familyHistory}</Descriptions.Item>
                <Descriptions.Item label="Life Space">{op.lifeSpace}</Descriptions.Item>
                <Descriptions.Item label="Thermals">{op.Thermals}</Descriptions.Item>
                <Descriptions.Item label="Investigation">{op.Investigation}</Descriptions.Item>
                <Descriptions.Item label="Diagnosis">{op.Diagnosis}</Descriptions.Item>
                </Descriptions>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Appearance" key="2">
                <Descriptions bordered column={1}>
                {Object.entries(op.PatientAsAPerson?.Appearance || {}).map(([key, val]) => (
                    <Descriptions.Item label={key}>{val}</Descriptions.Item>
                ))}
                </Descriptions>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Digestion" key="3">
                <Descriptions bordered column={1}>
                {Object.entries(op.PatientAsAPerson?.Digestion || {}).map(([key, val]) => (
                    <Descriptions.Item label={key}>{val}</Descriptions.Item>
                ))}
                </Descriptions>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Elimination" key="4">
                <Descriptions bordered column={1}>
                {Object.entries(op.PatientAsAPerson?.Elimination || {}).map(([key, val]) => (
                    <Descriptions.Item label={key}>{val}</Descriptions.Item>
                ))}
                </Descriptions>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Menstrual History" key="5">
                <Descriptions bordered column={1}>
                <Descriptions.Item label="Menasche">{op.PatientAsAPerson?.['Menstrual history']?.menasche}</Descriptions.Item>
                <Descriptions.Item label="LMP">{op.PatientAsAPerson?.['Menstrual history']?.LMP}</Descriptions.Item>
                <Descriptions.Item label="Menopause">{op.PatientAsAPerson?.['Menstrual history']?.Menopause}</Descriptions.Item>

                {Object.entries(op.PatientAsAPerson?.['Menstrual history']?.Menses || {}).map(([key, val]) => (
                    <Descriptions.Item label={`Menses - ${key}`}>{val}</Descriptions.Item>
                ))}
                {Object.entries(op.PatientAsAPerson?.['Menstrual history']?.Concomitance || {}).map(([key, val]) => (
                    <Descriptions.Item label={`Concomitance - ${key}`}>{val}</Descriptions.Item>
                ))}
                <Descriptions.Item label="Leucorrhea">
                    {op.PatientAsAPerson?.['Menstrual history']?.Leucorrhea}
                </Descriptions.Item>
                </Descriptions>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Sexual Functions" key="6">
                <Descriptions bordered column={1}>
                <Descriptions.Item label="Sexual Functions">
                    {op.PatientAsAPerson?.sexualFunctions}
                </Descriptions.Item>
                </Descriptions>
            </Tabs.TabPane>
            </Tabs>
        </Card>
        </div>
    );
};

export default OpDetails;
