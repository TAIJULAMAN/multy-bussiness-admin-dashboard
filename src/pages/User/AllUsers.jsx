import { ConfigProvider, Modal, Table, Tag } from "antd";
import { useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";

import img from "../../assets/block.png";
import ActiveListings from "../../pages/User/ActiveListings";
import UserStats from "../../pages/User/UserStatics";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";
import Loader from "../../Components/Shared/Loaders/Loader";

const AllUsers = ({ search }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [activeTab, setActiveTab] = useState("User Statics");
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: usersData, isLoading } = useGetAllUserQuery({
    page,
    search,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const users = usersData?.data;
  const metaPage = usersData?.meta?.page || page || 1;
  const metaLimit = usersData?.meta?.limit || 10;
  const metaTotal = usersData?.meta?.total || users?.length || 0;

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const showModal2 = (user) => {
    setSelectedUser(user);
    setIsModalOpen2(true);
  };

  const handleBlock = async () => {
    if (selectedUser?._id) {
      try {
        await updateUser(selectedUser?._id).unwrap();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_, __, index) => (metaPage - 1) * metaLimit + (index + 1),
    },
    {
      title: "Name",
      key: "name",
      render: (_, record, index) => (
        <div className="flex items-center gap-3">
          <img
            src={
              record.img || `https://avatar.iran.liara.run/public/${index + 1}`
            }
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
    // { title: "Email", dataIndex: "email", key: "email" },
    { title: "Contact Number", dataIndex: "mobile", key: "mobile" },
    {
      title: "User Role",
      key: "userRole",
      render: (_, record) => (
        <Tag
          className="!p-1 !w-full !flex !items-center !justify-center"
          color="blue"
        >
          {record.role}
        </Tag>
      ),
    },
    { title: "Country", dataIndex: "country", key: "country" },
    {
      title: "Subscription",
      key: "subscription",
      render: (_, record) =>
        record?.subscriptionPlan?.subscriptionPlanType || "Free Plan",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(record)}
            className={`border rounded-lg p-1 ${
              record?.isBlocked === true
                ? "border-red-500 text-red-500 bg-red-100"
                : "border-green-500 text-green-500 bg-green-100"
            }`}
          >
            <MdBlockFlipped
              className={`w-8 h-8 ${
                record?.isBlocked === true ? "text-red-500" : "text-green-500"
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

  if (isLoading) return <Loader />;

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            activeBorderColor: "#14803c",
          },
          Pagination: {
            colorPrimary: "#0091ff",
            colorPrimaryHover: "#0091ff",
            itemActiveBg: "#0091ff",
            itemActiveColor: "#ffffff",
            colorBgTextHover: "#0091ff",
            colorText: "#0091ff",
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
        dataSource={users}
        columns={columns}
        pagination={{
          pageSize: metaLimit,
          total: metaTotal,
          current: metaPage,
          showSizeChanger: false,
          onChange: (newPage) => setPage(newPage),
        }}
        // rowKey={(record) =>
        //   record?._id || record?.id || record?.email || record?.name
        // }
        scroll={{ x: "max-content" }}
      />

      {/* Block Modal */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center py-10">
          <img src={img} alt="Confirmation" className="w-40 h-40 mb-5" />
          <p className="text-3xl text-center text-gray-800">Warning!</p>
          <p className="text-xl text-center mt-5">
            Do you want to block this user?
          </p>
          <div className="text-center py-5 w-full flex justify-center gap-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="border-2 border-[#14803c] text-gray-800 font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleBlock}
              disabled={isUpdating}
              className="bg-[#0091ff] !text-white font-semibold w-1/3 py-3 px-5 rounded-lg disabled:opacity-50"
            >
              {isUpdating ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        open={isModalOpen2}
        centered
        onCancel={() => {
          setIsModalOpen2(false);
        }}
        footer={null}
      >
        <div className="w-full max-w-md p-5 relative mx-auto">
          {/* Profile header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 mb-3 overflow-hidden">
              <img
                // src={imageUrl(selectedUser?.img)}
                // src={img}
                src="https://avatar.iran.liara.run/public/44"
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
              className={`pb-2 px-4 ${
                activeTab === "User Statics"
                  ? "border-b-2 border-[#0091ff] text-[#0091ff] font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("User Statics")}
            >
              User Statics
            </button>
            <button
              className={`pb-2 px-4 ${
                activeTab === "Active Listings"
                  ? "border-b-2 border-[#0091ff] text-[#0091ff] font-medium"
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
          {activeTab === "Active Listings" && (
            <ActiveListings
              selectedUser={selectedUser}
              setIsModalOpen2={setIsModalOpen2}
            />
          )}
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AllUsers;
