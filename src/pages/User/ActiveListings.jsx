import { ConfigProvider, Modal, Table, Tag } from "antd";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import img from "../../assets/product.png";
import { useGetSingleUserQuery } from "../../redux/api/userApi";
// import { imageUrl } from '../../Utils/server';

const ActiveListings = ({ setIsModalOpen2, selectedUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { data: singleUser, isLoading } = useGetSingleUserQuery(
    { userId: selectedUser?._id },
    { skip: !selectedUser?._id }
  );

  const showModal = (record) => {
    setSelectedItem(record);
    setIsModalOpen(true);
    setIsModalOpen2(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const dataSource = singleUser?.data?.approvedBusiness?.map((item, index) => ({
    key: index + 1,
    no: index + 1,
    name: item?.title || "No Name",
    askingPrice: item?.askingPrice || "N/A",
    date: item?.createdAt || "N/A",
    category_name: item?.category || "N/A",
    status: item?.status || "N/A",
    user: item?.userData?.name || "N/A",
    user_id: item?.userData?._id || "N/A",
    role: item?.userData?.role || "N/A",
    country: item?.country || "N/A",
    imageUrl:
      (Array.isArray(item?.images) && item.images[0]) || item?.image || null,
  }));
  console.log("dataSource of active list table", dataSource);

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Asking Price", dataIndex: "askingPrice", key: "askingPrice" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value) =>
        value
          ? new Date(value).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
          : "N/A",
    },
    { title: "Category", dataIndex: "category_name", key: "category_name" },
    {
      title: "User Role",
      dataIndex: "role",
      render: (_, record) => (
        <Tag color="blue">{record?.role || "No Role"}</Tag>
      ),
    },
    { title: "Country", dataIndex: "country", key: "country" },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => showModal(record)}
              className="border border-[#0091ff] rounded-lg p-1 bg-[#cce9ff] text-[#0091ff]"
            >
              <FaRegEye className="w-8 h-8 text-[#0091ff]" />
            </button>
          </div>
        );
      },
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
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-5">
            {/* Image */}
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={selectedItem?.imageUrl || img}
                alt={selectedItem?.name || "Listing"}
                className="w-full h-[240px] object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{selectedItem?.name}</h1>
                <div className="mt-1 text-lg font-semibold text-[#0091ff]">
                  {selectedItem?.askingPrice !== undefined &&
                  selectedItem?.askingPrice !== null
                    ? `$${selectedItem?.askingPrice}`
                    : "N/A"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Category
                  </h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] px-2 py-1 rounded">
                    {selectedItem?.category_name || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] px-2 py-1 rounded">
                    {selectedItem?.status || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Country</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] px-2 py-1 rounded">
                    {selectedItem?.country || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Role</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] px-2 py-1 rounded">
                    {selectedItem?.role || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] px-2 py-1 rounded">
                    {selectedItem?.date
                      ? new Date(selectedItem.date).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "2-digit" }
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ActiveListings;
