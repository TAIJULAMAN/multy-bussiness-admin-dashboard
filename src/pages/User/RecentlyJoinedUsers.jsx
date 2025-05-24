import React, { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

import img from "../../assets/block.png";
import { useGetAllUserQuery, useUpdateUserMutation } from "../../redux/api/userApi";
import { imageUrl } from "../../Utils/server";
import ActiveListings from "./ActiveListings";
import UserStats from "./UserStatics";


const RecentlyJoinedUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [activeTab, setActiveTab] = useState("User Statics");
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: userData, isLoading, isError } = useGetAllUserQuery();
  const [updateUser] = useUpdateUserMutation();

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const showModal2 = (user) => {
    setSelectedUser(user);
    setIsModalOpen2(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleBlock = async () => {
    if (selectedUser) {
      try {
        await updateUser({
          id: selectedUser?.key,
          status: "blocked",
        }).unwrap();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to block user", error);
      }
    }
  };

  const dataSource =
    userData?.data?.slice(0, 5).map((user, index) => ({
      key: user?._id || index.toString(),
      no: index + 1,
      name: user?.name || "No Name",
      img: user?.img,
      date: user?.joined || "N/A",
      phone: user?.phone || "N/A",
      email: user?.email || "N/A",
      block: user?.block,
      totalListings: user?.total_listing || 0,
      activeListings: user?.active_listing || 0,
      approvedListings: user?.active_listing || 0,
      rejectedListings: user?.rejected_listing || 0,
      soldListing: user?.sold_listing || 0,
    })) || [];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={imageUrl(record?.img)}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.name || "No Name"}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-GB");
        return formattedDate;
      },
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(record)}
            className={`border rounded-lg p-1 ${record?.block == true
              ? "border-red-500 text-red-500 bg-red-100"
              : "border-[#14803c] text-[#14803c] bg-[#d3e8e6]"
              }`}
          >
            <MdBlockFlipped
              className={`w-8 h-8 ${record?.block == true
                ? "border-red-500 text-red-500 bg-red-100"
                : "border-[#14803c] text-[#14803c] bg-[#d3e8e6]"
                }`}
            />
          </button>
          <button
            onClick={() => showModal2(record)}
            className="border border-[#14803c] rounded-lg p-1 bg-[#d3e8e6] text-[#14803c]"
          >
            <FaRegEye className="w-8 h-8 text-[#14803c]" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            activeBorderColor: "#14803c",
          },
          Pagination: {
            colorPrimary: "#14803c",
            colorPrimaryHover: "#14803c",
            itemActiveBg: "#14803c",
            itemActiveColor: "#ffffff",
            colorBgTextHover: "#14803c",
            colorText: "#14803c",
          },
          Table: {
            headerBg: "#14803c",
            headerColor: "rgb(255,255,255)",
            cellFontSize: 16,
            headerSplitColor: "#14803c",
          },
        },
      }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
      />

      {/* Block Modal */}
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="flex flex-col justify-center items-center py-10">
          <img src={img} alt="Confirmation" className="w-40 h-40 mb-5" />
          <p className="text-3xl text-center text-gray-800">Warning</p>
          <p className="text-xl text-center mt-5">
            Do you want to block this user?
          </p>
          <div className="text-center py-5 w-full flex justify-center gap-4">
            <button
              onClick={handleCancel}
              className="border-2 border-[#14803c] text-gray-800 font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleBlock}
              className="bg-[#14803c] text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        open={isModalOpen2}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        <div className="w-full max-w-md p-5 relative mx-auto">
          {/* Profile header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 mb-3 overflow-hidden">
              <img
                src={imageUrl(selectedUser?.img)}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">{selectedUser?.name}</h2>

            {/* Contact info */}
            <div className="flex items-center text-gray-500 mt-1">
              <AiOutlinePhone size={16} className="text-gray-400" />
              <span className="ml-1 text-sm">{selectedUser?.phone}</span>
            </div>
            <div className="flex items-center text-gray-500 mt-1">
              <AiOutlineMail size={16} className="text-gray-400" />
              <span className="ml-1 text-sm">{selectedUser?.email}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mb-5">
            <button
              className={`pb-2 px-4 ${activeTab === "User Statics"
                ? "border-b-2 border-green-600 text-green-600 font-medium"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("User Statics")}
            >
              User Statics
            </button>
            <button
              className={`pb-2 px-4 ${activeTab === "Active Listings"
                ? "border-b-2 border-green-600 text-green-600 font-medium"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("Active Listings")}
            >
              Active Listings
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "User Statics" && (
            <UserStats selectedUser={selectedUser} />
          )}
          {activeTab === "Active Listings" && <ActiveListings />}
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default RecentlyJoinedUsers;
