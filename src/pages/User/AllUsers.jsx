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

      date: "2023-01-01",
      phone: "123-456-7890",
      country: "Bangladesh",
      block: true,
      email: "john.doe@example.com",
      userRole: "Business Asset Seller",
      totalListings: 10,
      activeListings: 5,
      approvedListings: 3,
      rejectedListings: 2,
      soldListing: 1,
    },
    {
      key: "2",
      no: 2,
      name: "Jane Smith",
      date: "2023-01-02",
      phone: "987-654-3210",
      country: "USA",
      block: false,
      email: "jane.smith@example.com",
      userRole: "Business Asset Seller",
      totalListings: 8,
      activeListings: 6,
      approvedListings: 4,
      rejectedListings: 1,
      soldListing: 3,
    },
    {
      key: "3",
      no: 3,
      name: "Alice Johnson",
      date: "2023-01-03",
      phone: "555-123-4567",
      country: "Canada",
      block: false,
      email: "alice.johnson@example.com",
      userRole: "Business Asset Seller",
      totalListings: 12,
      activeListings: 7,
      approvedListings: 5,
      rejectedListings: 0,
      soldListing: 4,
    },
    {
      key: "4",
      no: 4,
      name: "Bob Brown",
      date: "2023-01-04",
      phone: "444-987-6543",
      country: "UK",
      block: true,
      email: "bob.brown@example.com",
      userRole: "Business Asset Seller",
      totalListings: 9,
      activeListings: 3,
      approvedListings: 2,
      rejectedListings: 3,
      soldListing: 1,
    },
    {
      key: "5",
      no: 5,
      name: "Carol White",
      date: "2023-01-05",
      phone: "321-654-9870",
      country: "Australia",
      block: false,
      email: "carol.white@example.com",
      userRole: "Business Asset Seller",
      totalListings: 15,
      activeListings: 10,
      approvedListings: 7,
      rejectedListings: 1,
      soldListing: 6,
    },
    {
      key: "6",
      no: 6,
      name: "David Green",
      date: "2023-01-06",
      phone: "789-123-4567",
      country: "Germany",
      block: false,
      email: "david.green@example.com",
      userRole: "Business Asset Seller",
      totalListings: 11,
      activeListings: 8,
      approvedListings: 6,
      rejectedListings: 2,
      soldListing: 3,
    },
    {
      key: "7",
      no: 7,
      name: "Eva Black",
      date: "2023-01-07",
      phone: "234-567-8901",
      country: "France",
      block: false,
      email: "eva.black@example.com",
      userRole: "Business Asset Seller",
      totalListings: 7,
      activeListings: 5,
      approvedListings: 4,
      rejectedListings: 1,
      soldListing: 2,
    },
    {
      key: "8",
      no: 8,
      name: "Frank Wilson",
      date: "2023-01-08",
      phone: "987-321-6540",
      country: "Italy",
      block: true,
      email: "frank.wilson@example.com",
      userRole: "Business Asset Seller",
      totalListings: 6,
      activeListings: 2,
      approvedListings: 2,
      rejectedListings: 2,
      soldListing: 1,
    },
    {
      key: "9",
      no: 9,
      name: "Grace Lee",
      date: "2023-01-09",
      phone: "654-789-1230",
      country: "Japan",
      block: false,
      email: "grace.lee@example.com",
      userRole: "Business Asset Seller",
      totalListings: 14,
      activeListings: 11,
      approvedListings: 8,
      rejectedListings: 0,
      soldListing: 7,
    },
    {
      key: "10",
      no: 10,
      name: "Henry King",
      date: "2023-01-10",
      phone: "321-123-7890",
      country: "South Korea",
      block: false,
      email: "henry.king@example.com",
      userRole: "Business Asset Seller",
      totalListings: 10,
      activeListings: 7,
      approvedListings: 5,
      rejectedListings: 2,
      soldListing: 4,
    },
    {
      key: "11",
      no: 11,
      name: "Isabel Scott",
      date: "2023-01-11",
      phone: "456-789-1234",
      country: "Netherlands",
      block: true,
      email: "isabel.scott@example.com",
      userRole: "Business Asset Seller",
      totalListings: 9,
      activeListings: 3,
      approvedListings: 2,
      rejectedListings: 3,
      soldListing: 2,
    },
    {
      key: "12",
      no: 12,
      name: "Jack Turner",
      date: "2023-01-12",
      phone: "789-456-1230",
      country: "Brazil",
      block: false,
      email: "jack.turner@example.com",
      userRole: "Business Asset Seller",
      totalListings: 13,
      activeListings: 9,
      approvedListings: 7,
      rejectedListings: 1,
      soldListing: 5,
    },
    {
      key: "13",
      no: 13,
      name: "Karen Adams",
      date: "2023-01-13",
      phone: "123-789-4560",
      country: "Mexico",
      block: false,
      email: "karen.adams@example.com",
      userRole: "Business Asset Seller",
      totalListings: 8,
      activeListings: 6,
      approvedListings: 4,
      rejectedListings: 2,
      soldListing: 3,
    },
    {
      key: "14",
      no: 14,
      name: "Liam Baker",
      date: "2023-01-14",
      phone: "456-123-7890",
      country: "Russia",
      block: true,
      email: "liam.baker@example.com",
      userRole: "Business Asset Seller",
      totalListings: 7,
      activeListings: 4,
      approvedListings: 3,
      rejectedListings: 2,
      soldListing: 1,
    },
    {
      key: "15",
      no: 15,
      name: "Mia Carter",
      date: "2023-01-15",
      phone: "789-321-4560",
      country: "South Africa",
      block: false,
      email: "mia.carter@example.com",
      userRole: "Business Asset Seller",
      totalListings: 11,
      activeListings: 7,
      approvedListings: 6,
      rejectedListings: 1,
      soldListing: 4,
    },
    {
      key: "16",
      no: 16,
      name: "Noah Davis",
      date: "2023-01-16",
      phone: "123-654-7890",
      country: "New Zealand",
      block: false,
      email: "noah.davis@example.com",
      userRole: "Business Asset Seller",
      totalListings: 10,
      activeListings: 8,
      approvedListings: 5,
      rejectedListings: 2,
      soldListing: 3,
    },
    {
      key: "17",
      no: 17,
      name: "Olivia Evans",
      date: "2023-01-17",
      phone: "654-321-9870",
      country: "China",
      block: true,
      email: "olivia.evans@example.com",
      userRole: "Business Asset Seller",
      totalListings: 9,
      activeListings: 5,
      approvedListings: 3,
      rejectedListings: 3,
      soldListing: 2,
    },
    {
      key: "18",
      no: 18,
      name: "Paul Foster",
      date: "2023-01-18",
      phone: "987-654-3211",
      country: "Singapore",
      block: false,
      email: "paul.foster@example.com",
      userRole: "Business Asset Seller",
      totalListings: 14,
      activeListings: 10,
      approvedListings: 8,
      rejectedListings: 1,
      soldListing: 6,
    },
    {
      key: "19",
      no: 19,
      name: "Quinn Garcia",
      date: "2023-01-19",
      phone: "321-987-6540",
      country: "Bangladesh",
      block: false,
      email: "quinn.garcia@example.com",
      userRole: "Business Asset Seller",
      totalListings: 8,
      activeListings: 6,
      approvedListings: 4,
      rejectedListings: 2,
      soldListing: 3,
    },
    {
      key: "20",
      no: 20,
      name: "Rachel Harris",
      date: "2023-01-20",
      phone: "456-789-1230",
      country: "USA",
      block: true,
      email: "rachel.harris@example.com",
      userRole: "Business Asset Seller",
      totalListings: 7,
      activeListings: 3,
      approvedListings: 2,
      rejectedListings: 3,
      soldListing: 1,
    },
  ];




  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "User Info",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            // src={imageUrl(record?.img)}
            src="https://avatar.iran.liara.run/public/6"
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
    { title: "Contact Number", dataIndex: "phone", key: "phone" },
    {
      title: "User Role",
      dataIndex: "userRole",
      render: (_, record) => (
        <Tag color="blue">{record?.userRole || "No Role"}</Tag>
      ),
    },
    { title: "Country", dataIndex: "country", key: "country" },
    {
      title: "Action",

      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(record)}
            className={`border rounded-lg p-1 ${record?.block == true
              ? "border-red-500 text-red-500 bg-red-100"
              : "border-[#0091ff] text-[#0091ff] bg-[#d3e8e6]"
              }`}
          >
            <MdBlockFlipped
              className={`w-8 h-8 ${record?.block == true
                ? "border-red-500 text-red-500 bg-red-100"
                : "border-[#0091ff] text-[#0091ff] bg-[#d3e8e6]"
                }`}
            />
          </button>
          <button
            onClick={() => showModal2(record)}
            className="border border-[#0091ff] rounded-lg p-1 bg-[#d3e8e6] text-[#0091ff]"
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
          <img src="https://avatar.iran.liara.run/public/44" alt="Confirmation" className="w-40 h-40 mb-5" />
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
              className={`pb-2 px-4 ${activeTab === "User Statics"
                ? "border-b-2 border-[#0091ff] text-[#0091ff] font-medium"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("User Statics")}
            >
              User Statics
            </button>
            <button
              className={`pb-2 px-4 ${activeTab === "Active Listings"
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
          {activeTab === "Active Listings" && <ActiveListings selectedUser={selectedUser} setIsModalOpen2={setIsModalOpen2} />}
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AllUsers;
