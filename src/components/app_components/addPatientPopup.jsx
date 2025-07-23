import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Row,
    Col,
    Steps,
    message,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const { Step } = Steps;

const AddPatientPopup = ({ onClose }) => {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);

    const stepFieldNames = [
        ["name", "mobileNumber"],
        [
            "age", "gender", "maritalStatus",
            "occupation", "education", "religion", "monthlyIncome", "address",
        ],
        [
            ["appearance", "physicalBuilt"],
            ["appearance", "skin"],
            ["appearance", "hair"],
            ["digestion", "appetite"],
            ["digestion", "diet"],
            ["digestion", "cravings"],
            ["elimination", "stool"],
        ],
        [
            "chiefComplaint",
            "historyOfChiefComplaint",
            "pastHistory",
            "familyHistory",
            "dateOfCase",
            "doctor",
        ],
    ];

    const next = () => {
        form
            .validateFields(stepFieldNames[currentStep])
            .then(() => setCurrentStep((prev) => prev + 1))
            .catch(() => {});
    };

    const prev = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleFinish = (values) => {
        console.log("New Patient:", values);
        message.success("Patient added successfully!");
        form.resetFields();
        onClose();
    };

    const stepContent = [
        // Step 0: Basic Info
        <>
            <Form.Item name="name" rules={[{ required: true, message: "Enter name" }]}>
                <Input placeholder="Full Name *" />
            </Form.Item>
            <Form.Item name="mobileNumber" rules={[{ required: true, message: "Enter mobile number" }]}>
                <Input placeholder="Mobile Number *" />
            </Form.Item>
        </>,

        // Step 1: Demographics
        <>
            <Row gutter={12}>
                <Col span={8}>
                    <Form.Item name="age" rules={[{ required: true, message: "Enter age" }]}>
                        <Input type="number" placeholder="Age *" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="gender" rules={[{ required: true, message: "Select gender" }]}>
                        <Select placeholder="Gender *">
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="maritalStatus">
                        <Select placeholder="Marital Status">
                            <Option value="Single">Single</Option>
                            <Option value="Married">Married</Option>
                            <Option value="Divorced">Divorced</Option>
                            <Option value="Widowed">Widowed</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="occupation">
                <Input placeholder="Occupation" />
            </Form.Item>
            <Form.Item name="education">
                <Input placeholder="Education" />
            </Form.Item>
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
            <Form.Item name="address">
                <Input.TextArea placeholder="Address" rows={2} />
            </Form.Item>
        </>,

        // Step 2: Patient as Person
        <>
            <Form.Item name={["appearance", "physicalBuilt"]}>
                <Input placeholder="Physical Built" />
            </Form.Item>
            <Form.Item name={["appearance", "skin"]}>
                <Input placeholder="Skin Type" />
            </Form.Item>
            <Form.Item name={["appearance", "hair"]}>
                <Input placeholder="Hair Type" />
            </Form.Item>
            <Form.Item name={["digestion", "appetite"]}>
                <Input placeholder="Appetite" />
            </Form.Item>
            <Form.Item name={["digestion", "diet"]}>
                <Input placeholder="Diet" />
            </Form.Item>
            <Form.Item name={["digestion", "cravings"]}>
                <Input placeholder="Cravings" />
            </Form.Item>
            <Form.Item name={["elimination", "stool"]}>
                <Input placeholder="Stool" />
            </Form.Item>
        </>,

        // Step 3: Health History
        <>
            <Form.Item name="chiefComplaint">
                <Input.TextArea placeholder="Chief Complaint" />
            </Form.Item>
            <Form.Item name="historyOfChiefComplaint">
                <Input.TextArea placeholder="History of Chief Complaint" />
            </Form.Item>
            <Form.Item name="pastHistory">
                <Input.TextArea placeholder="Past History" />
            </Form.Item>
            <Form.Item name="familyHistory">
                <Input.TextArea placeholder="Family History" />
            </Form.Item>
            <Row gutter={12}>
                <Col span={12}>
                    <Form.Item
                        name="dateOfCase"
                        rules={[{ required: true, message: "Select case date" }]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            placeholder="Date of Case *"
                            defaultValue={dayjs()}
                            format="YYYY-MM-DD"
                            disabledDate={(current) => current && current > dayjs()}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="doctor" initialValue="Dr. Mohasina">
                        <Input disabled />
                    </Form.Item>
                </Col>
            </Row>
        </>,
    ];

    return (
        <>
            <Steps current={currentStep} size="small" style={{ marginBottom: 24 }}>
                <Step title="Basic" />
                <Step title="Demographics" />
                <Step title="Profile" />
                <Step title="Medical" />
            </Steps>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                className="add-patient-form"
                initialValues={{
                    appearance: {},
                    digestion: {},
                    elimination: {},
                    dateOfCase: dayjs(),
                    doctor: "Dr. Mohasina",
                }}
            >
                {stepContent.map((content, index) => (
                    <div key={index} style={{ display: index === currentStep ? "block" : "none" }}>
                        {content}
                    </div>
                ))}

                <Form.Item style={{ marginTop: 24 }}>
                    <Row justify="space-between">
                        {currentStep > 0 && (
                            <Button onClick={prev} style={{ marginRight: 8 }}>
                                Previous
                            </Button>
                        )}
                        {currentStep < stepContent.length - 1 && (
                            <Button type="primary" onClick={next}>
                                Next
                            </Button>
                        )}
                        {currentStep === stepContent.length - 1 && (
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        )}
                    </Row>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddPatientPopup;
