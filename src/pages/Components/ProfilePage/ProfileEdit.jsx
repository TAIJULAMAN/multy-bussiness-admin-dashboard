import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import toast from 'react-hot-toast';

const ProfileEdit = ({ profileData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Initialize form with demo data
  React.useEffect(() => {
    form.setFieldsValue({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address
    });
  }, [form, profileData]);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Success:', values);
      toast.success('Profile updated successfully');
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <p className="text-[#3872F0] text-3xl text-center">Edit Profile</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full mt-8"
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input size="large" placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input size="large" placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter your address" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full !bg-[var(--bg-pink-high)]"
          >
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileEdit;
