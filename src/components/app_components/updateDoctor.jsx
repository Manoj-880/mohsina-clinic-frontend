import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { updateDoctor } from "../../api/doctor_api";
import { toast } from "react-toastify";

const UpdateDoctor = ({ doctor, onFinish }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctor) {
      form.setFieldsValue({
        name: doctor.name,
        email: doctor.email,
        mobileNumber: doctor.mobileNumber,
        licenseNo: doctor.licenseNo || "",
        degree: doctor.degree || "",
      });
    }
  }, [doctor, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const localUser = JSON.parse(localStorage.getItem("user"));
      const response = await updateDoctor(doctor._id, values, localUser?.secretKey);

      if (response && response.success) {
        toast.success(response.message);
        onFinish();
      } else {
        toast.error(response?.message || "Failed to update doctor");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("Failed to update doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter doctor name" }]}
      >
        <Input placeholder="Enter doctor name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        name="mobileNumber"
        label="Mobile Number"
        rules={[
          { required: true, message: "Please enter mobile number" },
          {
            pattern: /^[0-9]{10}$/,
            message: "Please enter a valid 10-digit mobile number",
          },
        ]}
      >
        <Input placeholder="Enter mobile number" maxLength={10} />
      </Form.Item>

      <Form.Item name="licenseNo" label="License Number">
        <Input placeholder="Enter license number" />
      </Form.Item>

      <Form.Item name="degree" label="Degree">
        <Input placeholder="Enter degree" />
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onClick={() => form.resetFields()}>Reset</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default UpdateDoctor;

