import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  Modal,
  Space,
  message,
  Popconfirm,
  Descriptions,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { getAllDoctors, deleteDoctor } from "../../api/doctor_api";
import { toast } from "react-toastify";
import AddDoctor from "../../components/app_components/addDoctor";
import UpdateDoctor from "../../components/app_components/updateDoctor";

const { Search } = Input;

const Doctors = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loggedInDoctor, setLoggedInDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
    // Get logged in doctor info
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && localUser.email) {
      setLoggedInDoctor(localUser);
    }
  }, []);

  const fetchDoctors = async () => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const response = await getAllDoctors(localUser?.secretKey);
      if (response && response.success) {
        setDoctorsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user"));
      const response = await deleteDoctor(id, localUser?.secretKey);
      if (response && response.success) {
        toast.success(response.message);
        fetchDoctors();
      } else {
        toast.error(response?.message || "Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor");
    }
  };

  const handleUpdate = (doctor) => {
    setSelectedDoctor(doctor);
    setIsUpdateModalVisible(true);
  };

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDetailsModalVisible(true);
  };

  const filteredDoctors = doctorsData.filter((doctor) => {
    const name = doctor.name || "";
    const email = doctor.email || "";
    const license = doctor.licenseNo || "";
    const searchLower = searchText.toLowerCase();
    return (
      name.toLowerCase().includes(searchLower) ||
      email.toLowerCase().includes(searchLower) ||
      license.toLowerCase().includes(searchLower)
    );
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a
          onClick={() => handleViewDetails(record)}
          style={{ cursor: "pointer" }}
        >
          <Space>
            <UserOutlined />
            {text}
          </Space>
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <Space>
          <MailOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "License No",
      dataIndex: "licenseNo",
      key: "licenseNo",
      render: (text) => text || "—",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isLoggedInDoctor = loggedInDoctor && loggedInDoctor.email === record.email;
        return (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleUpdate(record)}
            >
              Edit
            </Button>
            {!isLoggedInDoctor && (
              <Popconfirm
                title="Delete Doctor"
                description="Are you sure you want to delete this doctor?"
                onConfirm={() => handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
                okButtonProps={{ danger: true }}
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="doctors-page">
      <Modal
        title="Add New Doctor"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        destroyOnClose
        maskClosable={false}
        width={600}
      >
        <AddDoctor
          onFinish={() => {
            setIsAddModalVisible(false);
            fetchDoctors();
          }}
        />
      </Modal>

      <Modal
        title="Update Doctor"
        open={isUpdateModalVisible}
        onCancel={() => {
          setIsUpdateModalVisible(false);
          setSelectedDoctor(null);
        }}
        footer={null}
        destroyOnClose
        maskClosable={false}
        width={600}
      >
        <UpdateDoctor
          doctor={selectedDoctor}
          onFinish={() => {
            setIsUpdateModalVisible(false);
            setSelectedDoctor(null);
            fetchDoctors();
          }}
        />
      </Modal>

      <Modal
        title="Doctor Details"
        open={isDetailsModalVisible}
        onCancel={() => {
          setIsDetailsModalVisible(false);
          setSelectedDoctor(null);
        }}
        footer={[
          <Button key="close" onClick={() => {
            setIsDetailsModalVisible(false);
            setSelectedDoctor(null);
          }}>
            Close
          </Button>
        ]}
        destroyOnClose
        width={600}
      >
        {selectedDoctor && (
          <Descriptions column={1} bordered>
            <Descriptions.Item
              label={
                <Space>
                  <UserOutlined />
                  Name
                </Space>
              }
            >
              {selectedDoctor.name || "—"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <MailOutlined />
                  Email
                </Space>
              }
            >
              {selectedDoctor.email || "—"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <PhoneOutlined />
                  Mobile Number
                </Space>
              }
            >
              {selectedDoctor.mobileNumber || "—"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <IdcardOutlined />
                  License Number
                </Space>
              }
            >
              {selectedDoctor.licenseNo || "—"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <BookOutlined />
                  Degree
                </Space>
              }
            >
              {selectedDoctor.degree || "—"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <div className="doctors-header" style={{ marginBottom: 16 }}>
        <h2 className="page-heading">Doctors Management</h2>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Search
            placeholder="Search doctors"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Add Doctor
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredDoctors}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSizeOptions: ["5", "10", "20", "50"],
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        className="doctors-table"
      />
    </div>
  );
};

export default Doctors;

