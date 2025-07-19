import React, { useEffect, useState } from 'react';
import { getAllOPs } from '../../api/op_api';
import { getAllPatients } from '../../api/patients_api';
import { Card, Input, Button, Row, Col, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const OP = () => {
  const [ops, setOps] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [opRes, patientRes] = await Promise.all([
        getAllOPs(),
        getAllPatients()
      ]);
      if (opRes) setOps(opRes);
      if (patientRes) setPatients(patientRes);
    } catch (error) {
      console.error(error);
    }
  };

  const getPatient = (patientId) => {
    return patients.find((p) => p.id === patientId);
  };

  const filteredOps = ops.filter((op) => {
    const patient = getPatient(op.patientId);
    if (!patient) return false;
    const nameMatch = patient.name.toLowerCase().includes(searchText.toLowerCase());
    const mobileMatch = patient.mobileNumber?.includes(searchText);
    return nameMatch || mobileMatch;
  });

  return (
    <div className="op-container">
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Input
            placeholder="Search by Name or Mobile Number"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            style={{ maxWidth: 400 }}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => console.log("Add New OP clicked")}
          >
            Add New OP
          </Button>
        </Col>
      </Row>

      <div className="op-card-grid">
        {filteredOps.length > 0 ? (
          filteredOps.map((op, index) => {
            const patient = getPatient(op.patientId);
            return (
              <Card
                key={index}
                title={`Patient: ${patient?.name || op.patientId}`}
                className="op-card"
                hoverable
                onClick={() => navigate(`/op/patient-op-list/${op.patientId}`)}
              >
                <p className="complaint">Chief Complaint: {op.chiefComplaint}</p>
                <p className="diagnosis">History: {op.historyOfChiefComplaint}</p>
              </Card>
            );
          })
        ) : (
          <Empty description="No OPs found" />
        )}
      </div>
    </div>
  );
};

export default OP;
