import React, { useState, useEffect } from 'react';
import { Table, Tooltip, Popconfirm, Button, Modal } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteDocument, getAllDocuments } from '../../api/document_api';
import AddDocument from '../../components/app_components/addDocument';
import { toast } from 'react-toastify';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      let user = await JSON.parse(localStorage.getItem('user'));
      let response = await getAllDocuments(user?.secretKey);
      setDocuments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddModal = () => {
    setAddModalVisible(true);
  }

  const onDelete = async (id) => {
    let user = await JSON.parse(localStorage.getItem('user'));
    let response = await deleteDocument(id, user?.secretKey);
    if(response.success) {
      toast.success(response.message);
      fetch()
    } else {
      toast.error(response.message);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '75%',
      render: text => <span className="doc-title">{text}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="doc-actions">
          <Tooltip title="View Document">
            <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
              <EyeOutlined style={{ color: 'var(--color-primary)', fontSize: '1.5rem', cursor: 'pointer' }} />
            </a>
          </Tooltip>

          <Popconfirm
            title="Are you sure to delete this document?"
            onConfirm={() => onDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Document">
              <DeleteOutlined style={{ color: 'crimson', marginLeft: 16, cursor: 'pointer', fontSize: '1.2rem' }} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="documents-container">
      <Modal
        title="Add Document"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        destroyOnHidden
      >
        <AddDocument onClose={() => setAddModalVisible(false)} fetchDocuments={fetch} />
      </Modal>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Documents</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddModal}>
          Add Document
        </Button>
      </div>
      <Table
        dataSource={documents}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default Documents;
