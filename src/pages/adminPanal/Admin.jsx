// Admin.jsx
import { ConfigProvider, Table, Tag, message, Button, Modal } from "antd";
import React, { useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import AddAdmin from "./AddAdmin";
import { MdBlockFlipped, MdOutlineCheckCircle, MdEdit, MdDelete } from "react-icons/md";
import EditAdmin from "./EditAdmin";

const dummyUsers = [
  {
    key: 1,
    sl: 1,
    name: "John Doe",
    email: "john@example.com",
    image: "https://i.pravatar.cc/100?img=1",
    role: "Admin",
    status: "active",
    access: ["User Access", "Listing Access"],
  },
  {
    key: 2,
    sl: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    image: "https://i.pravatar.cc/100?img=2",
    role: "Super Admin",
    status: "blocked",
    access: ["User Access", "Listing Access", "Subscription Access"],
  },
];

const Admin = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleBlock = (key) => {
    setUsers((prev) =>
      prev.map((u) => (u.key === key ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u))
    );
    message.success("Status updated!");
  };

  const handleDelete = (key) => {
    setUsers((prev) => prev.filter((u) => u.key !== key));
    message.success("User deleted!");
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const columns = [
    { title: "SL No.", dataIndex: "sl", key: "sl", width: 60 },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      align: "center",
      render: (_, record) => (
        <img
          src={record.image}
          alt={record.name}
          className="w-10 h-10 object-cover rounded mx-auto"
        />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (role) => <span>{role}</span>, // Show only
    },
    {
      title: "Access",
      key: "access",
      width: 400,
      render: (_, record) => (
        <div className="flex flex-wrap gap-1 items-center">
          {record.access.map((acc) => (
            <Tag key={acc} color="blue">
              {acc}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 100,
      render: (_, record) =>
        record.status === "active" ? <Tag color="green">Active</Tag> : <Tag color="red">Blocked</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <div
            className={`w-[36px] h-[36px] flex justify-center items-center text-white rounded cursor-pointer ${
              record.status === "active" ? "bg-[#E63946]" : "bg-[#2a9d8f]"
            }`}
            onClick={() => toggleBlock(record.key)}
            title={record.status === "active" ? "Block User" : "Unblock User"}
          >
            {record.status === "active" ? <MdBlockFlipped /> : <MdOutlineCheckCircle />}
          </div>
          <div
            className="w-[36px] h-[36px] flex justify-center items-center text-white rounded bg-[#1D3557] cursor-pointer"
            onClick={() => handleEditClick(record)}
            title="Edit User"
          >
            <MdEdit />
          </div>
          <div
            className="w-[36px] h-[36px] flex justify-center items-center text-white rounded bg-[#E63946] cursor-pointer"
            onClick={() => handleDelete(record.key)}
            title="Delete User"
          >
            <MdDelete />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Admin Panel" />
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#E63946] w-[150px] text-white py-2 rounded"
        >
          Add Admin
        </button>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#0091ff",
              headerColor: "#ffffff",
              cellFontSize: 16,
              headerSplitColor: "#0091ff",
            },
          },
        }}
      >
        <Table dataSource={users} columns={columns} scroll={{ x: "max-content" }} bordered pagination={{ pageSize: 5 }} />
      </ConfigProvider>

      <AddAdmin openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} setUsers={setUsers} />

      <EditAdmin
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedUser={selectedUser}
        setUsers={setUsers}
      />
    </div>
  );
};

export default Admin;