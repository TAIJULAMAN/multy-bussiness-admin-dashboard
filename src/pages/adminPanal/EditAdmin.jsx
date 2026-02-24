// EditAdmin.jsx
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Checkbox, Select, message, Spin } from "antd";

const accessOptions = [
  "User Access",
  "Listing Access",
  "Subscription Access",
  "All Subscriber Access",
  "Earning Access",
  "NDA Access",
  "Coupon Access",
  "Blog Access",
  "Manage Category Access",
];

const { Option } = Select;

const EditAdmin = ({ openEditModal, setOpenEditModal, selectedUser, setUsers }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        access: selectedUser.access,
      });
    }
  }, [selectedUser, form]);

  const handleCancel = () => setOpenEditModal(false);

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((user) =>
          user.key === selectedUser.key ? { ...user, ...values } : user
        )
      );
      message.success("Admin updated successfully!");
      setLoading(false);
      setOpenEditModal(false);
    }, 1000);
  };

  return (
    <Modal
      centered
      open={openEditModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
      title={`Edit Admin - ${selectedUser?.name}`}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="px-2">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input placeholder="Enter name" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled style={{ height: "40px", backgroundColor: "#f5f5f5" }} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select placeholder="Select role" style={{ width: "100%", height: "40px" }}>
            <Option value="Admin">Admin</Option>
            <Option value="Super Admin">Super Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Access Permissions" name="access">
          <Checkbox.Group options={accessOptions} />
        </Form.Item>

        <Form.Item>
          <button
            className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
              loading ? "bg-[#fa8e97] cursor-not-allowed" : "bg-[#E63946] hover:bg-[#941822]"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spin size="small" />
                <span>Submitting...</span>
              </>
            ) : (
              "Update"
            )}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAdmin;