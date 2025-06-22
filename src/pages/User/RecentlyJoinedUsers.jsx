import React, { useState } from "react";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

import img from "../../assets/block.png";
// import { useGetAllUserQuery, useUpdateUserMutation } from "../../redux/api/userApi";
// import { imageUrl } from "../../Utils/server";
import ActiveListings from "./ActiveListings";
import UserStats from "./UserStatics";

const RecentlyJoinedUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [activeTab, setActiveTab] = useState("User Statics");
  const [selectedUser, setSelectedUser] = useState(null);

  // Demo data
  const demoUsers = [
    {
      key: "1",
      no: 1,
      name: "John Doe",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "2025-05-20",
      phone: "+1 (555) 123-4567",
      country: "Bangladesh",
      subscription: "Free",
      userRole: "Business Asset Seller",
      email: "john.doe@example.com",
      block: false,
      totalListings: 15,
      activeListings: 8,
      approvedListings: 10,
      rejectedListings: 2,
      soldListing: 3,
    },
    {
      key: "2",
      no: 2,
      name: "Jane Smith",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "2025-04-15",
      phone: "+44 7700 900123",
      country: "United Kingdom",
      subscription: "Premium",
      userRole: "Franchise Buyer",
      email: "jane.smith@example.co.uk",
      block: false,
      totalListings: 20,
      activeListings: 12,
      approvedListings: 18,
      rejectedListings: 1,
      soldListing: 5,
    },
    {
      key: "3",
      no: 3,
      name: "Ahmed Khan",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "2025-03-10",
      phone: "+92 300 1234567",
      country: "Pakistan",
      subscription: "Free",
      userRole: "Business Asset Buyer",
      email: "ahmed.khan@example.pk",
      block: true,
      totalListings: 5,
      activeListings: 2,
      approvedListings: 3,
      rejectedListings: 2,
      soldListing: 1,
    },
    {
      key: "4",
      no: 4,
      name: "Maria Garcia",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      date: "2025-06-05",
      phone: "+34 600 123 456",
      country: "Spain",
      subscription: "Standard",
      userRole: "Franchise Seller",
      email: "maria.garcia@example.es",
      block: false,
      totalListings: 12,
      activeListings: 6,
      approvedListings: 9,
      rejectedListings: 1,
      soldListing: 4,
    },
    {
      key: "5",
      no: 5,
      name: "David Lee",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      date: "2025-02-28",
      phone: "+1 (213) 555-7890",
      country: "United States",
      subscription: "Premium",
      userRole: "Business Broker",
      email: "david.lee@example.com",
      block: false,
      totalListings: 30,
      activeListings: 20,
      approvedListings: 25,
      rejectedListings: 3,
      soldListing: 10,
    },
  ];

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
      // In demo mode, just close the modal
      setIsModalOpen(false);
    }
  };

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.img}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="flex flex-col gap-[2px]">
            <span className="leading-none">{record.name}</span>
            <span className="leading-none">{record.email}</span>
          </div>
        </div>
      ),
    },
    { title: "Contact Number", dataIndex: "phone", key: "phone" },
    {
      title: "User Role",
      key: "userRole",
      render: (_, record) => (
        <Tag
          className="!p-1 !w-full !flex !items-center !justify-center"
          color="blue"
        >
          {record.userRole}
        </Tag>
      ),
    },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Subscription ", dataIndex: "subscription", key: "subscription" },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(record)}
            className={`border rounded-lg p-1 ${
              record.block
                ? "border-red-500 text-red-500 bg-red-100"
                : "border-[#0091ff] text-[#0091ff] bg-[#cce9ff]"
            }`}
          >
            <MdBlockFlipped
              className={`w-8 h-8 ${
                record.block
                  ? "border-red-500 text-red-500 bg-red-100"
                  : "border-[#0091ff] text-[#0091ff] bg-[#cce9ff]"
              }`}
            />
          </button>
          <button
            onClick={() => showModal2(record)}
            className="border border-[#0091ff] rounded-lg p-1 bg-[#cce9ff] text-[#0091ff]"
          >
            <FaRegEye className="w-8 h-8 text-[#0091ff]" />
          </button>
        </div>
      ),
    },
  ];

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
            headerBg: "#0091ff",
            headerColor: "rgb(255,255,255)",
            cellFontSize: 16,
            headerSplitColor: "#0091ff",
          },
        },
      }}
    >
      <Table
        dataSource={demoUsers}
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
              className="border-2 border-[#0091ff] text-gray-800 font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleBlock}
              className="bg-[#0091ff] !text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
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
        width={700}
      >
        <div className="w-full p-5 relative mx-auto m">
          {/* Profile header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 mb-3 overflow-hidden">
              <img
                src={selectedUser?.img}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              {selectedUser?.name}
            </h3>
            <div className="flex gap-4 text-gray-600">
              <span className="flex items-center gap-2">
                <AiOutlinePhone /> {selectedUser?.phone}
              </span>
              <span className="flex items-center gap-2">
                <AiOutlineMail /> {selectedUser?.email}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              className={`pb-2 px-4 ${
                activeTab === "User Statics"
                  ? "border-b-2 border-[#0091ff] text-[#0091ff]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("User Statics")}
            >
              User Statistics
            </button>
            <button
              className={`pb-2 px-4 ${
                activeTab === "Active Listings"
                  ? "border-b-2 border-[#0091ff] text-[#0091ff]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("Active Listings")}
            >
              Active Listings
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "User Statics" ? (
              <UserStats user={selectedUser} />
            ) : (
              <ActiveListings
                user={selectedUser}
                setIsModalOpen2={setIsModalOpen2}
              />
            )}
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default RecentlyJoinedUsers;
