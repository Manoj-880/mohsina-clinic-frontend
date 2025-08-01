import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { toast } from 'react-toastify';
import { updateDoctor } from '../../api/doctor_api';

const { Title } = Typography;

const Profile = () => {
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
        setUserData(user);
        form.setFieldsValue(user);
        }
    }, [form]);

    const handleProfileUpdate = async(values) => {
        const updatedUser = { ...userData, ...values };
        let response = await updateDoctor(updatedUser, userData?.secretKey);
        if(response.success){
            toast.success(response.message);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUserData(updatedUser);
        } else {
            toast.error(response.message);
        }
        // message.success('Profile updated successfully!');
    };

    const handlePasswordChange = async(values) => {
        let user = await JSON.parse(localStorage.getItem('user'));
        if (user?.password == values.oldPassword) {
            if (values.newPassword !== values.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
            } else {
                let data = {
                    _id: userData._id,
                    password: values.newPassword,
                }
                let response = await updateDoctor(data, user?.secretKey);
                if(response.success){
                    toast.success(response.message);
                    passwordForm.resetFields();
                } else {
                    toast.error(response.message);
                }
            }
        } else {
            toast.error('Enter old passowrd correctly')
        }
    };

    return (
        <div className="profile-container col-sm-12">
        {/* <Title level={3} className="profile-title">Profile</Title> */}

        <Card title="Profile Information" bordered={false} className="profile-card col-sm-6">
            <Form form={form} layout="vertical" onFinish={handleProfileUpdate}>
            <Form.Item label="Name (cannot update)" name="name" rules={[{ required: true }]}>
                <Input disabled />
            </Form.Item>
            <Form.Item label="Email (cannot update)" name="email" rules={[{ type: 'email', required: true }]}>
                <Input disabled />
            </Form.Item>
            <Form.Item label="Mobile Number" name="mobileNumber" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="profile-button">
                Update Profile
                </Button>
            </Form.Item>
            </Form>
        </Card>

        {/* <Divider /> */}

            <Card title="Change Password" bordered={false} className="profile-card col-sm-6">
                <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange}>
                <Form.Item label="Old Password" name="oldPassword" rules={[{ required: true}]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true}]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="profile-button">
                    Change Password
                    </Button>
                </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Profile;
