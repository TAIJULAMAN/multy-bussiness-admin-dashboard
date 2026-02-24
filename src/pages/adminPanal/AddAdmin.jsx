// AddAdmin.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Checkbox, message, Spin, Select } from "antd";
import { useCreateAdminMutation } from "../../redux/api/adminPanalApi";

export const ENUM_ADMIN_PERMISSION = {
  USER: "USER",
  LISTING: "LISTING",
  EARNING: "EARNING",
  CATEGORY: "CATEGORY",
  SUBSCRIPTION: "SUBSCRIPTION",
  COUPON: "COUPON",
  BLOG: "BLOG",
  NDA: "NDA",
};

export const ENUM_ADMIN_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
};

const AddAdmin = ({ openAddModal, setOpenAddModal, setUsers }) => {
  const [addAdmin] = useCreateAdminMutation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(""); // Track role selection

  // Map accessOptions to display labels
  const accessOptions = [
    { label: "User Access", value: ENUM_ADMIN_PERMISSION.USER },
    { label: "Listing Access", value: ENUM_ADMIN_PERMISSION.LISTING },
    { label: "Subscription Access", value: ENUM_ADMIN_PERMISSION.SUBSCRIPTION },
    { label: "All Subscriber Access", value: ENUM_ADMIN_PERMISSION.SUBSCRIPTION },
    { label: "Earning Access", value: ENUM_ADMIN_PERMISSION.EARNING },
    { label: "NDA Access", value: ENUM_ADMIN_PERMISSION.NDA },
    { label: "Coupon Access", value: ENUM_ADMIN_PERMISSION.COUPON },
    { label: "Blog Access", value: ENUM_ADMIN_PERMISSION.BLOG },
    { label: "Manage Category Access", value: ENUM_ADMIN_PERMISSION.CATEGORY },
  ];

  const handleCancel = () => setOpenAddModal(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Map role to ENUM
      const roleEnum = values.role === "Super Admin" ? ENUM_ADMIN_ROLE.SUPER_ADMIN : ENUM_ADMIN_ROLE.ADMIN;

      // Map permissions (skip if SUPER_ADMIN)
      const permissions =
        roleEnum === ENUM_ADMIN_ROLE.SUPER_ADMIN ? [] : values.permissions || [];

      // API payload
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: roleEnum,
        permissions,
      };

      await addAdmin(payload).unwrap();

      // Optionally update local UI
      setUsers((prev) => [
        ...prev,
        {
          key: prev.length + 1,
          sl: prev.length + 1,
          name: values.name,
          email: values.email,
          image: `https://i.pravatar.cc/100?img=${prev.length + 4}`,
          role: roleEnum,
          status: "active",
          access: permissions, // just for table display
        },
      ]);

      message.success("Admin added successfully!");
      form.resetFields();
      setRole("");
      setOpenAddModal(false);
    } catch (error) {
      message.error("Failed to add admin!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal centered open={openAddModal} onCancel={handleCancel} footer={null} width={600}>
      <h2 className="font-bold text-center mb-6">+ Add Admin</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="px-2">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input placeholder="Enter name" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input placeholder="Enter email" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input password!" }]}
        >
          <Input.Password placeholder="Enter password" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) return Promise.resolve();
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select
            placeholder="Select role"
            onChange={(val) => setRole(val)}
            value={role}
            style={{ width: "100%" }}
          >
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Super Admin">Super Admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Permissions" name="permissions">
          <Checkbox.Group
            options={accessOptions}
            disabled={role === "Super Admin"}
          />
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
              "Submit"
            )}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAdmin;