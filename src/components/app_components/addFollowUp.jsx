/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAllPatients } from "../../api/patients_api";
import { Select, DatePicker, Button, Form } from "antd";
import dayjs from "dayjs";
import { addFollowUp } from "../../api/followUps";
import { toast } from "react-toastify";

const { Option } = Select;

const AddFollowUp = ({ onClose, fetchFollowups, patientId }) => {
    const [patients, setPatients] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchPatients();
        if (patientId) {
            form.setFieldsValue({ patientId });
        }
    }, [patientId]);


    const fetchPatients = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await getAllPatients(user?.secretKey);
            console.log(response.data);
            if (response) {
                setPatients(response.data);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const handleSubmit = async (values) => {
        const selectedPatient = patients.find(
            (p) => p.patientId === values.patientId
        );
        const selectedDate = values.followUpDate.format("YYYY-MM-DD");

        console.log("Follow-Up Submitted:");
        console.log("Patient:", selectedPatient.patientId);
        console.log("Next Visit Date:", selectedDate);

        let data = {
            patientId: selectedPatient.patientId,
            followUpDate: selectedDate,
        }

        let user = await JSON.parse(localStorage.getItem('user'));
        let response = await addFollowUp(data, user?.secretKey);
        if(response.success){
            toast.success(response.message);
            fetchFollowups();
            onClose();
        }else {
            toast.error(response.message);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                name="patientId"
                rules={[{ required: true, message: "Please select a patient" }]}
            >
                <Select
                    placeholder="Select a patient"
                    showSearch
                    filterOption={(input, option) =>
                        option?.children?.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {patients.map((patient) => (
                        <Option key={patient.patientId} value={patient.patientId}>
                            {patient.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="followUpDate"
                rules={[{ required: true, message: "Please select a follow-up date" }]}
                >
                <DatePicker
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                    placeholder="Next Visit Date"
                    disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                    }
                />
                </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </div>
        </Form>
    );
};

export default AddFollowUp;
