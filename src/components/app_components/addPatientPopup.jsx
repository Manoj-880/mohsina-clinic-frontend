import React from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const AddPatientPopup = ({ onClose }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        console.log("New Patient:", values);
        form.resetFields();
        onClose();
    };

    return (
        <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="add-patient-form"
        >
        {/* Name */}
        <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
        >
            <Input placeholder="Name *" />
        </Form.Item>

        {/* Mobile Number */}
        <Form.Item
            name="mobileNumber"
            rules={[{ required: true, message: "Please enter mobile number" }]}
        >
            <Input placeholder="Mobile Number *" />
        </Form.Item>

        {/* Age, Gender, Marital Status */}
        <Row gutter={12}>
            <Col span={8}>
            <Form.Item
                name="age"
                rules={[{ required: true, message: "Enter age" }]}
            >
                <Input type="number" placeholder="Age *" />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item
                name="gender"
                rules={[{ required: true, message: "Select gender" }]}
            >
                <Select placeholder="Gender *">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                </Select>
            </Form.Item>
            </Col>
            {/* <Col span={8}>
            <Form.Item name="maritalStatus">
                <Input placeholder="Marital Status" />
            </Form.Item>
            </Col> */}
            <Col span={8}>
            <Form.Item
                name="maritalStatus"
                rules={[{message: "Select marital status" }]}
            >
                <Select placeholder="Marital Status *">
                <Option value="Single">Single</Option>
                <Option value="Married">Married</Option>
                </Select>
            </Form.Item>
            </Col>
        </Row>

        {/* Occupation */}
        <Form.Item name="occupation">
            <Input placeholder="Occupation" />
        </Form.Item>

        {/* Education */}
        <Form.Item name="education">
            <Input placeholder="Education" />
        </Form.Item>

        {/* Religion, Monthly Income */}
        <Row gutter={12}>
            <Col span={12}>
            <Form.Item name="religion">
                <Input placeholder="Religion" />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="monthlyIncome">
                <Input placeholder="Monthly Income" />
            </Form.Item>
            </Col>
        </Row>

        {/* Address */}
        <Form.Item name="address">
            <Input.TextArea placeholder="Address" rows={2} />
        </Form.Item>

        {/* Date of Case & Doctor */}
        <Row gutter={12}>
            <Col span={12}>
            <Form.Item
                name="dateOfCase"
                rules={[{ required: true, message: "Select date" }]}
            >
                <DatePicker
                placeholder="Date of Case *"
                style={{ width: "100%" }}
                initialValue={dayjs()}
                disabledDate={(current) => current && current < dayjs().startOf("day")}
                />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="doctor" initialValue="Dr. Mohasina">
                <Input disabled />
            </Form.Item>
            </Col>
        </Row>

        {/* Health issue */}
        <Form.Item name="lastVisitDescription">
            <Input.TextArea placeholder="Health Issue" rows={2} />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
            <Button
            type="primary"
            htmlType="submit"
            block
            style={{ backgroundColor: "var(--color-primary)", border: "none" }}
            >
            Add Patient
            </Button>
        </Form.Item>
        </Form>
    );
};

export default AddPatientPopup;
