import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [showOldPassword,] = useState(false);


  const onFinish = async (values) => {
    try {
      message.success('Password Changed successfully.');
    } catch (error) {
      console.error('Failed to change password:', error);
      message.error('Failed to change Password.');
    }
  };
  return (
    <Form
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        type={showOldPassword ? 'text' : 'password'}
        name="oldPassword"
        label={<span className="text-black">Old Password</span>}
        rules={[
          {
            required: true,
            message: 'name is required',
          },
        ]}
      >
        <Input.Password
          style={{
            width: '100%',
            height: 40,
            border: 'none',
            borderRadius: '5px',
            color: '#111',
            backgroundColor: '#fff',
            outline: 'none',
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label={<span className="text-black">New Password</span>}
        rules={[
          {
            required: true,
            message: 'name is required',
          },
        ]}
      >
        <Input.Password
          style={{
            width: '100%',
            height: 40,
            border: 'none',
            borderRadius: '5px',
            color: '#111',
            backgroundColor: '#fff',
            outline: 'none',
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={<span className="text-black">Confirm Password</span>}
        rules={[
          {
            required: true,
            message: 'phone number is required',
          },
        ]}
      >
        <Input.Password
          style={{
            width: '100%',
            height: 40,
            border: 'none',
            borderRadius: '5px',
            color: '#111',
            backgroundColor: '#fff',
            outline: 'none',
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        className="!bg-[#3872F0] !hover:bg-[#3872F0] active:bg-[#3872F0] w-full"
      >
        update
      </Button>
    </Form>
  );
};

export default ChangePassword;
