import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { createDoctor } from "../../api/doctor_api";
import { toast } from "react-toastify";

const AddDoctor = ({ onFinish }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const localUser = JSON.parse(localStorage.getItem("user"));
      const response = await createDoctor(values, localUser?.secretKey);

      if (response && response.success) {
        toast.success(response.message);
        form.resetFields();
        onFinish();
      } else {
        toast.error(response?.message || "Failed to create doctor");
      }
    } catch (error) {
      console.error("Error creating doctor:", error);
      toast.error("Failed to create doctor");
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

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Please enter password" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password placeholder="Enter password" />
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
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddDoctor;

