import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addDocument } from '../../api/document_api';
import { toast } from 'react-toastify';

const AddDocument = ({ onClose, fetchDocuments }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log("first");
        const uploadedFile = values.document && values.document[0];
        if (!uploadedFile) {
            message.error("Please upload a document");
            return;
        }
        const fileObj = uploadedFile.originFileObj;

        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("document", fileObj);

        try {
            console.log("second");
            let response = await addDocument(formData, user?.secretKey);
            if(response.success){
                toast.success(response.message);
                onClose();
                fetchDocuments();
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.log("third");
            message.error(err?.response?.data?.message || err.message);
        }
    };

    return (
        <div className="add-document-container" style={{ maxWidth: 500, margin: '0 auto' }}>
            <h2>Add New Document</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="title"
                    label="Document Title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                >
                    <Input placeholder="Enter document title" />
                </Form.Item>

                <Form.Item
                    name="document"
                    label="Upload Document"
                    valuePropName="fileList"
                    getValueFromEvent={e => e && e.fileList}
                    rules={[{ required: true, message: 'Please upload a document' }]}
                >
                    <Upload 
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Document
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddDocument;
