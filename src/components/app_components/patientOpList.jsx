import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOpByPatientId } from '../../api/op_api';
import { Card, Empty } from 'antd';
import { CalendarOutlined, FileTextOutlined } from '@ant-design/icons';

const PatientOpList = () => {
    const [ops, setOps] = useState([]);
    const { patientId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatientOps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPatientOps = async () => {
        const data = await getOpByPatientId(patientId);
        if (Array.isArray(data)) {
        setOps(data);
        } else if (data) {
        setOps([data]);
        }
    };

    return (
        <div className="patient-op-list">
        <h2 className="op-list-heading">OP Records for Patient: {patientId}</h2>

        {ops.length === 0 ? (
            <Empty description="No OP records found" />
        ) : (
            <div className="op-card-list">
            {ops.map((op, index) => (
                <Card
                key={index}
                hoverable
                className="op-card"
                onClick={() => navigate(`/op/${op.id}`)}
                title={
                    <span>
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    {op.date || 'Unknown Date'}
                    </span>
                }
                >
                <p><FileTextOutlined /> {op.chiefComplaint}</p>
                </Card>
            ))}
            </div>
        )}
        </div>
    );
};

export default PatientOpList;
