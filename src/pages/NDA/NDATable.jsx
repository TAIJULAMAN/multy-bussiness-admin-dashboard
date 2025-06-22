import React from "react";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import img from "../../assets/build.png"
import { Link } from "react-router-dom";

function NDATable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [page, setPage] = useState(1);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataSource = [
    {
      key: "1",
      no: 1,
      userName: "John Doe",
      contactNumber: "084657990568",
      userRole: "seller",
      date: "2023-01-01",
      country: "Bangladesh",
      status: "Active",
      email: "john.doe@example.com",
      description: "Description 1",
      condition: "New",
    },
    {
      key: "2",
      no: 2,
      userName: "Jane Smith",
      contactNumber: "123456789",
      userRole: "seller",
      date: "2023-01-02",
      country: "India",
      status: "Inactive",
      email: "jane.smith@example.com",
      description: "Description 2",
      condition: "Used",
    },
    {
      key: "3",
      no: 3,
      userName: "Alice Johnson",
      contactNumber: "987654321",
      userRole: "seller",
      date: "2023-01-03",
      country: "USA",
      status: "Active",
      email: "alice.johnson@example.com",
      description: "Description 3",
      condition: "New",
    },
    {
      key: "4",
      no: 4,
      userName: "Bob Brown",
      contactNumber: "555123456",
      userRole: "seller",
      date: "2023-01-04",
      country: "Canada",
      status: "Active",
      email: "bob.brown@example.com",
      description: "Description 4",
      condition: "Old",
    },
    {
      key: "5",
      no: 5,
      userName: "Emily Davis",
      contactNumber: " 777888999",
      userRole: "seller",
      date: "2023-01-05",
      country: "UK",
      status: "Inactive",
      email: "emily.davis@example.com",
      description: "Description 5",
      condition: "Used",
    },
    {
      key: "6",
      no: 6,
      userName: "Michael Lee",
      contactNumber: "333444555",
      userRole: "seller",
      date: "2023-01-06",
      country: "Germany",
      status: "Active",
      email: "michael.lee@example.com",
      description: "Description 6",
      condition: "New",
    },
    {
      key: "7",
      no: 7,
      userName: "Sara Kim",
      contactNumber: "222333444",
      userRole: "seller",
      date: "2023-01-07",
      country: "South Korea",
      status: "Inactive",
      email: "sara.kim@example.com",
      description: "Description 7",
      condition: "Old",
    },
    {
      key: "8",
      no: 8,
      userName: "David Wilson",
      contactNumber: "444555666",
      userRole: "seller",
      date: "2023-01-08",
      country: "Australia",
      status: "seller",
      email: "david.wilson@example.com",
      description: "Description 8",
      condition: "New",
    },
    {
      key: "9",
      no: 9,
      userName: "Laura Scott",
      contactNumber: " 777888999",
      userRole: " seller",
      date: "2023-01-09",
      country: "France",
      status: "seller",
      email: "laura.scott@example.com",
      description: "Description 9",
      condition: "Used",
    },
    {
      key: "10",
      no: 10,
      userName: "Chris Martin",
      contactNumber: "777888999",
      userRole: "seller",
      date: "2023-01-10",
      country: "Spain",
      status: "Active",
      email: "chris.martin@example.com",
      description: "Description 10",
      condition: "New",
    },
  ];
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "User Info",
      key: "User Info",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            // src={imageUrl(record?.userImg)}
            src="https://avatar.iran.liara.run/public/20"
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="flex flex-col items-start justify-center">
            <span>{record?.userName || "No Name"}</span>
            <span>{record?.email || "No Email"}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "User Role",
      key: "userRole",
      render: (_, record) => (
        // <div className="px-5 py-2 bg-[#c2e1ff] border-2 border-[#0060FF] flex justify-center text-center">
        //   {record?.userRole}
        // </div>
        <Tag
          className="!p-1 !w-full !flex !items-center !justify-center"
          color="blue"
        >
          {record?.userRole}
        </Tag>
      )
    },
    {
      title: "Submission Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Business Location",
      dataIndex: "country",
      key: "country",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to="/document">
          <button
            className="border border-[#0091ff] rounded-lg p-1 bg-[#cce9ff] text-[#0091ff]"
          >
            <FaRegEye className="w-8 h-8 text-[#0091ff]" />
          </button>
        </Link>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
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
        //   pageSize: listData?.pagination?.itemPerPage,
        //   total: listData?.pagination?.totalItems,
        //   current: listData?.pagination?.currentPage,
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
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-5">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={selectedListing?.productName}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{selectedListing?.productName}</h1>
                <div className="flex items-center mt-2">
                  <span className="text-2xl font-semibold">{selectedListing?.price}</span>
                  <p className="ml-2 text-[#0091ff]">In Stock</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">Product Details</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Product Category
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.catrgory}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Status
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.status}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Seller Name
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.userName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Seller Email
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Condition
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.condition}
                    </p>
                  </div>

                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    Description
                  </h2>
                  <p className="mt-1">
                    {selectedListing?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default NDATable;
