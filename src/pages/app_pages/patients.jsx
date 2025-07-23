import React, { useEffect, useState } from "react";
import {
  List,
  Card,
  Skeleton,
  Input,
  Button,
  Table,
  Tooltip,
  Tag,
  Modal,
} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  UserOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import AddPatientPopup from "../../components/app_components/addPatientPopup";
import { useNavigate } from "react-router-dom";
import { getAllPatients } from "../../api/patients_api";

const { Search } = Input;

const Patients = () => {
  const [viewMode, setViewMode] = useState("grid");
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Add isNew tag based on missing prescription and followUps
  const filteredPatients = patientsData
    .map((patient) => {
      // const pd = patient.preliminaryData || {};
      const hasPrescription = !!patient.prescription;
      const hasFollowUps = !!patient.followUps;
      const isNew = !hasPrescription && !hasFollowUps;

      return {
        ...patient,
        isNew,
      };
    })
    .filter((p) => {
      const name = p.preliminaryData?.name || "";
      const mobile = p.preliminaryData?.mobileNumber || "";
      return (
        name.toLowerCase().includes(searchText.toLowerCase()) ||
        mobile.includes(searchText)
      );
    });

  const columns = [
    {
      title: "Name",
      dataIndex: "preliminaryData",
      key: "name",
      render: (data, record) => (
        <a
          onClick={() =>
            navigate(`/patients/${record.patientId}`, { state: record })
          }
        >
          {data?.name}
          {record.isNew && (
            <Tag color="green" style={{ marginLeft: 8 }}>
              NEW
            </Tag>
          )}
        </a>
      ),
    },
    {
      title: "Age",
      dataIndex: "preliminaryData",
      key: "age",
      render: (data) => data?.age,
      sorter: (a, b) =>
        (a.preliminaryData?.age || 0) - (b.preliminaryData?.age || 0),
    },
    {
      title: "Gender",
      dataIndex: "preliminaryData",
      key: "gender",
      render: (data) => data?.gender,
    },
    {
      title: "Doctor",
      dataIndex: "preliminaryData",
      key: "doctor",
      render: (data) => data?.doctor,
    },
  ];

  return (
    <div className="patients-page">
      <Modal
        title="Add New Patient"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <AddPatientPopup onClose={() => setIsAddModalVisible(false)} />
      </Modal>

      <div className="patients-header">
        <h2 className="page-heading">Patients</h2>
        <div className="patients-controls">
          <Search
            placeholder="Search patients"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />

          <div className="view-toggle">
            <Tooltip title="Grid View">
              <Button
                type={viewMode === "grid" ? "primary" : "default"}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode("grid")}
              />
            </Tooltip>
            <Tooltip title="List View">
              <Button
                type={viewMode === "list" ? "primary" : "default"}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode("list")}
              />
            </Tooltip>
          </div>

          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            style={{ backgroundColor: "var(--color-primary)" }}
          >
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
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="patients-grid">
              {filteredPatients.map((patient) => {
                const pd = patient.preliminaryData;
                return (
                  <Card
                    key={patient.patientId}
                    className="patient-card"
                    onClick={() =>
                      navigate(`/patients/${patient.patientId}`, {
                        state: patient,
                      })
                    }
                    style={{ cursor: "pointer" }}
                    title={
                      <div className="patient-title">
                        <span>
                          <UserOutlined style={{ marginRight: 6 }} />
                          {pd?.name}
                        </span>
                        {patient.isNew && (
                          <Tag color="green" style={{ marginLeft: 8 }}>
                            NEW
                          </Tag>
                        )}
                      </div>
                    }
                  >
                    <div className="patient-info-row">
                      <PhoneOutlined />
                      <span>{pd?.mobileNumber || "N/A"}</span>
                    </div>
                    <div className="patient-info-row">
                      {pd?.gender === "Male" ? (
                        <ManOutlined />
                      ) : (
                        <WomanOutlined />
                      )}
                      <span>
                        {pd?.gender}, {pd?.age} yrs
                      </span>
                    </div>
                    <div className="patient-info-row">
                      <CalendarOutlined />
                      <span>Doctor: {pd?.doctor}</span>
                    </div>
                    {patient.followUps && (
                      <div className="patient-info-row">
                        <ClockCircleOutlined />
                        <span>Follow-up: {patient.followUps}</span>
                      </div>
                    )}
                    {patient.chiefComplaint && (
                      <div className="patient-info-row visit-description">
                        <FileTextOutlined />
                        <span>{patient.chiefComplaint}</span>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredPatients}
              rowKey="patientId"
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
