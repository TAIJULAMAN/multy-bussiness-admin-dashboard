import { ConfigProvider, Modal, Table, Tag } from "antd";
import { useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";

import img from "../../assets/block.png";
import ActiveListings from "../../pages/User/ActiveListings";
import UserStats from "../../pages/User/UserStatics";
// import {
//   useGetAllUserQuery,
//   useUpdateUserMutation,
// } from "../../redux/api/userApi";
// import { imageUrl } from "../../Utils/server";
// import Loader from "../../Components/Shared/Loaders/Loader";

const AllUsers = ({ search }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [activeTab, setActiveTab] = useState("User Statics");
  const [selectedUser, setSelectedUser] = useState(null);
  // const { data: userData, isLoading } = useGetAllUserQuery({ search, page });
  // const [updateUser] = useUpdateUserMutation();

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

  // const handleBlock = async () => {
  //   if (selectedUser) {
  //     try {
  //       await updateUser({
  //         id: selectedUser?.key,
  //         status: "blocked",
  //       }).unwrap();
  //       setIsModalOpen(false);
  //     } catch (error) {
  //       console.error("Failed to block user", error);
  //     }
  //   }
  // };

  // const dataSource =
  //   userData?.data?.map((user, index) => ({
  //     key: user?._id || index.toString(),
  //     no: index + 1,
  //     name: user?.name || "No Name",
  //     img: user?.img,
  //     date: user?.joined || "N/A",
  //     phone: user?.phone || "N/A",
  //     email: user?.email || "N/A",
  //     block: user?.block,
  //     totalListings: user?.total_listing || 0,
  //     activeListings: user?.active_listing || 0,
  //     approvedListings: user?.active_listing || 0,
  //     rejectedListings: user?.rejected_listing || 0,
  //     soldListing: user?.sold_listing || 0,
  //   })) || [];

  const dataSource = [
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
     {
      key: "6",
      no: 6,
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
      key: "7",
      no: 7,
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
      key: "8",
      no: 8,
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
      key: "9",
      no: 9,
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
      key: "10",
      no: 10,
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
     {
      key: "11",
      no: 11,
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
      key: "12",
      no: 12,
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
      key: "13",
      no: 13,
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
      key: "14",
      no: 14,
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
      key: "15",
      no: 15,
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

  // if (isLoading) return <Loader />;

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
        dataSource={dataSource}
        columns={columns}
        // pagination={{
        //   pageSize: userData?.pagination?.itemPerPage,
        //   total: userData?.pagination?.totalItems,
        //   current: userData?.pagination?.currentPage,
        //   showSizeChanger: false,
        //   onChange: (page) => setPage(page),
        // }}
        pagination={{
          pageSize: 10,
          total: dataSource.length,
          current: 1,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
        scroll={{ x: "max-content" }}
      />

      {/* Block Modal */}
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="flex flex-col justify-center items-center py-10">
          <img
            src={img}
            alt="Confirmation"
            className="w-40 h-40 mb-5"
          />
          <p className="text-3xl text-center text-gray-800">Warning!</p>
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
              onClick={() => {
                // handleBlock();
                setIsModalOpen(false);
              }}
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
