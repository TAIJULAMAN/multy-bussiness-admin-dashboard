import React from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useGetAllListingQuery } from "../../redux/api/listApi";
import { imageUrl } from "../../Utils/server";

function ListingTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [page, setPage] = useState(1);
  const { data: listData } = useGetAllListingQuery({ page });
  console.log("listdata", listData);
  const showModal = (record) => {
    setSelectedListing(record);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataSource =
    listData?.data?.map((list, index) => ({
      key: list?._id || index.toString(),
      no: index + 1,
      userName: list?.user_name || "No Name",
      userImg: list?.user_img,
      productName: list?.name || "No Name",
      productImg: list?.img,
      price: list?.price,
      product: list?.product,
      catrgory: list?.category_name,
      status: list?.status,
      email: list?.user_email || "N/A",
      description: list?.description,
      condition: list?.condition,
    })) || [];



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
            src={imageUrl(record?.userImg)}
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
      title: "Listing Info",
      key: "Listing Info",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={imageUrl(record?.productImg)}
            className="w-10 h-10 object-cover rounded"
            alt="Product Avatar"
          />
          <div className="flex flex-col items-start justify-center">
            <span>{record?.productName}</span>
            <span>{record?.catrgory}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          style={{
            backgroundColor:
              text === "ARCHIVED"
                ? "#FEF3C7"
                : text === "SOLD"
                  ? "#CCF0EB"
                  : "#FFCCCC",
            color: "#000",
            padding: "6px 12px",
            borderRadius: "6px",
            display: "inline-block",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => showModal(record)}
          className="border border-[#14803c] rounded-lg p-1 bg-[#d3e8e6] text-[#14803c]"
        >
          <FaRegEye className="w-8 h-8 text-[#14803c]" />
        </button>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
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
        pagination={{
          pageSize: listData?.pagination?.itemPerPage,
          total: listData?.pagination?.totalItems,
          current: listData?.pagination?.currentPage,
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
                  src={imageUrl(selectedListing?.productImg)}
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
                  <span className="text-2xl font-semibold">$ {selectedListing?.price}</span>
                  <p className="ml-2 text-green-500">In Stock</p>
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
                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">
                      {selectedListing?.catrgory}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Status
                    </h3>
                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">
                      {selectedListing?.status}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Seller Name
                    </h3>
                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">
                      {selectedListing?.userName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Seller Email
                    </h3>
                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">
                      {selectedListing?.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Condition
                    </h3>
                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">
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

export default ListingTable;
