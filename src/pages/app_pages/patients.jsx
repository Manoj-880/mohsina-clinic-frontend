import React, { useEffect, useState } from "react";
import { List, Card, Skeleton, Input, Button, Table, Tooltip, Tag, Modal } from "antd";
import { AppstoreOutlined, UnorderedListOutlined,UserOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined, } from "@ant-design/icons";
import AddPatientPopup from "../../components/app_components/addPatientPopup";
import { useNavigate } from "react-router-dom";
import { getAllPatients } from "../../api/patients_api";

const { Search } = Input;

const Patients = () => {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [searchText, setSearchText] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await getAllPatients();
      if (response) {
        setPatientsData(response);
      }
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false);
    }
  }

  const filteredPatients = patientsData.filter((p) =>
  p.name.toLowerCase().includes(searchText.toLowerCase()) ||
  (p.mobileNumber && p.mobileNumber.includes(searchText))
);


  const columns = [
    {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <a onClick={() => navigate(`/patients/${record.id}`, { state: record })}>{text}</a>
    ),
  },
  { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    { title: "Age", dataIndex: "age", key: "age",sorter: (a, b) => a.age - b.age,
    sortDirections: ["ascend", "descend"], },
    { title: "Gender", dataIndex: "gender", key: "gender" },
  ];

  return (
    <div className="patients-page">
      <Modal
        title="Add New Patient"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        destroyOnHidden
      >
        <AddPatientPopup onClose={() => setIsAddModalVisible(false)} />
      </Modal>

      <div className="patients-header">
        <h2 className="page-heading">Patients</h2>

        <div className="patients-controls">
  {/* Search */}
  <Search
    placeholder="Search patients"
    allowClear
    onChange={(e) => setSearchText(e.target.value)}
    style={{ width: 200 }}
  />

  {/* View Toggle */}
  <div className="view-toggle">
    <Tooltip title="Grid View">
      <Button
        type={viewMode === "grid" ? "primary" : "default"}
        icon={<AppstoreOutlined />}
        onClick={() => setViewMode("grid")}
        style={{
          backgroundColor:
            viewMode === "grid" ? "var(--color-primary)" : "var(--color-bg)",
        }}
      />
    </Tooltip>
    <Tooltip title="List View">
      <Button
        type={viewMode === "list" ? "primary" : "default"}
        icon={<UnorderedListOutlined />}
        onClick={() => setViewMode("list")}
        style={{
          backgroundColor:
            viewMode === "list" ? "var(--color-primary)" : "var(--color-bg)",
        }}
      />
    </Tooltip>
  </div>

  {/* Add Patient Button */}
  <Button type="primary" 
    onClick={() => setIsAddModalVisible(true)} 
    style={{backgroundColor: "var(--color-primary)"}}>
    + Add Patient
  </Button>
</div>

      </div>
      {loading ? (
        <div className="skeleton-container">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="patient-card-skeleton">
              <Skeleton active />
            </Card>
          ))}
        </div>
      ) : 
(
        <>
          {viewMode === "grid" ? (
          <div className="patients-grid">
  {filteredPatients.map((patient) => (
    <Card
      key={patient.id}
      className="patient-card"
      onClick={() => navigate(`/patients/${patient.id}`)}
      style={{ cursor: "pointer" }}
      title={
        <div className="patient-title">
          <span><UserOutlined style={{ marginRight: 6 }} />{patient.name}</span>
          {patient.isNew && <Tag color="green">NEW</Tag>}
        </div>
      }
    >
      <div className="patient-info-row">
        <PhoneOutlined />
        <span>{patient.mobile}</span>
      </div>
      <div className="patient-info-row">
        {patient.gender === "Male" ? <ManOutlined /> : <WomanOutlined />}
        <span>{patient.gender}, {patient.age} yrs</span>
      </div>
      {patient.lastVisited && (
        <div className="patient-info-row">
          <CalendarOutlined />
          <span>Last: {patient.lastVisited}</span>
        </div>
      )}
      {patient.nextVisit && (
        <div className="patient-info-row">
          <ClockCircleOutlined />
          <span>Next: {patient.nextVisit}</span>
        </div>
      )}
      {patient.lastVisitDescription && (
        <div className="patient-info-row visit-description">
          <FileTextOutlined />
          <span>{patient.lastVisitDescription}</span>
        </div>
      )}
    </Card>
  ))}
</div>

          ) : (
            <Table
              columns={columns}
              dataSource={filteredPatients}
              rowKey="id"
              pagination={{
              pageSizeOptions: ["5", "10", "20", "50", "100"],
              defaultPageSize: 5,
              showSizeChanger: true,
            }}
              className="patients-table"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Patients;
