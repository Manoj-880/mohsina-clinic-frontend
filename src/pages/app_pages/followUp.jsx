import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';
import { fetchFollowups } from '../../api/followUps';

const { Search } = Input;

const FollowUp = () => {
  const allFollowUps = fetchFollowups(); // Original data
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredFollowUps = allFollowUps.filter((item) => {
  const combinedText = [
    item.patientId,
    item.date,
    item.lastVisited,
    item.prescription,
  ]
    .map((field) => (field ? String(field).toLowerCase() : ''))
    .join(' ');

  return combinedText.includes(searchText);
});


  const columns = [
    {
      title: 'Patient ID',
      dataIndex: 'patientId',
      key: 'patientId',
    },
    {
      title: 'Follow-up Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Last Visited',
      dataIndex: 'lastVisited',
      key: 'lastVisited',
    },
    {
      title: 'Last Prescription',
      dataIndex: 'prescription',
      key: 'prescription',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button type="primary" className="add-prescription-btn">
          Add New Prescription
        </Button>
      ),
    },
  ];

  return (
    <div className="followup-wrapper">
      <h2 className="followup-title">Patient Follow-Ups</h2>

      <Search
        placeholder="Search follow-ups"
        allowClear
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
      />

      <Table
        columns={columns}
        dataSource={filteredFollowUps}
        rowKey="patientId"
        pagination={{ pageSize: 10 }}
        className="followup-table"
      />
    </div>
  );
};

export default FollowUp;
