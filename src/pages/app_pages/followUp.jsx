/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Tooltip } from 'antd';
import { fetchFollowups } from '../../api/followUps';
import AddFollowUp from '../../components/app_components/addFollowUp';
import {
  MedicineBoxOutlined,
} from '@ant-design/icons';
import UpdateFollowUp from '../../components/app_components/updateFollowup';
import { getAllPatients } from '../../api/patients_api';

const { Search } = Input;

const FollowUp = () => {

  const [allFollowUps, setAllFollowUps] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    fetch();
  }, [])

  const fetch = async () => {
    let patients = await fetchPatients();
    const localUser = JSON.parse(localStorage.getItem("user"));
    const response = await fetchFollowups(localUser?.secretKey);
    console.log(patients);
    const flatFollowUps = response.data.map((item) => {
      const latest = item.followups[0];
      const patient = patients.find(p => p.patientId === item.patientId);
      let data = {
        _id: latest._id,
        patientId: item.patientId,
        patientName: patient?.name || "Unknown",
        followUpDate: latest.followUpDate,
        lastVisitDate: latest.lastVisitDate,
        followupNotes: latest.followupNotes,
        isFirstVisit: latest.isFirstVisit,
      };
      return data;
    });

    setAllFollowUps(flatFollowUps);
  };

  const fetchPatients = async() => {
    try {
      let user = await JSON.parse(localStorage.getItem("user"));
      let response = await getAllPatients(user?.secretKey);
      if(response.success){
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error)
      return [];
    }
  }

  const handleAddPrescription = (followUp) => {
    setUpdateId(followUp._id);
    setIsModalUpdateOpen(true);
  }


  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredFollowUps = allFollowUps.filter((item) => {
    return item.patientName.toLowerCase().includes(searchText);
  });


  const columns = [
  {
    title: 'Patient',
    dataIndex: 'patientName',
    key: 'patientName',
  },
  {
    title: 'Follow-up Date',
    dataIndex: 'followUpDate',
    key: 'date',
  },
  {
    title: 'Last Visited',
    dataIndex: 'lastVisitDate',
    key: 'lastVisited',
  },
  {
    title: 'Last Prescription',
    dataIndex: 'followupNotes',
    key: 'prescription',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <Tooltip title="Add Prescription">
        {record.followupNotes == "" ? (
          <Button
            type="default"
            icon={<MedicineBoxOutlined />}
            title='Add Prescription'
            className="add-prescription-btn"
            onClick={() => handleAddPrescription(record)}
          >
            {/* Add Prescription */}
          </Button>
        ) : (
          <Button
            type="default"
            icon={<MedicineBoxOutlined />}
            title='Add Prescription'
            className="add-prescription-btn"
            disabled
          >
            {/* Add Prescription */}
          </Button>
        )}
      </Tooltip>
    ),
  },
];

  return (
    <div className="followup-wrapper">
      <h2 className="followup-title">Patient Follow-Ups</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Search
          placeholder="Search follow-ups"
          allowClear
          onChange={handleSearch}
          style={{ width: 300 }}
        />

        <Button
          type="primary"
          style={{ backgroundColor: 'var(--color-primary)' }}
          onClick={() => setIsModalOpen(true)}
        >
          + Add Follow-Up
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredFollowUps}
        rowKey="patientId"
        pagination={{ pageSize: 10 }}
        className="followup-table"
      />

      <Modal
        title="Add Follow-Up"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <AddFollowUp onClose={() => setIsModalOpen(false)} fetchFollowups={fetchFollowups}/>
      </Modal>
      <Modal
        title="Add Notes"
        open={isModalUpdateOpen}
        onCancel={() => setIsModalUpdateOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <UpdateFollowUp onClose={() => setIsModalUpdateOpen(false)} fetchFollowups={fetch} _id={updateId} />
      </Modal>
    </div>
  );
};

export default FollowUp;
