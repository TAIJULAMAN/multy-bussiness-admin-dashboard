import React from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useGetAllListingsQuery } from "../../redux/api/listingApi";
import Loader from "../../Components/Shared/Loaders/Loader";
import { getImageBaseUrl } from "../../config/envConfig";

export default function ListingTable({ businessRole = "", status = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/bus1.png");
  const navigate = useNavigate();

  // Fetch listings data from API with filters
  const { data: listingsData, isLoading } = useGetAllListingsQuery({
    businessRole: businessRole || undefined,
    status: status || undefined,
    page,
    limit: 10,
  });
  console.log("listingsData", listingsData);

  const showModal = (record) => {
    setSelectedListing(record);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataSource = listingsData?.data?.map((listing, index) => ({
    key: listing._id || index,
    no: index + 1 + (page - 1) * 10,
    userName: listing?.user?.name || "N/A",
    email: listing?.user?.email || "N/A",
    userImg: listing?.user?.image,
    productName: listing?.title || "N/A",
    catrgory: listing?.category || "N/A",
    productImg: listing?.image,
    price: listing?.price || 0,
    date: listing?.createdAt
      ? new Date(listing?.createdAt).toLocaleDateString()
      : "N/A",
    country: listing?.countryName || "N/A",
    ...listing,
  }));

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
            src={
              record?.userImg
                ? `${getImageBaseUrl()}/profile-image/${record?.userImg}`
                : "https://avatar.iran.liara.run/public/23"
            }
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
            src={
              record?.productImg
                ? `${getImageBaseUrl()}/business-image/${record?.productImg}`
                : "https://avatar.iran.liara.run/public/21"
            }
            className="w-10 h-10 object-cover rounded"
            alt="Product Image"
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
      key: "price",
      render: (_, record) => (
        <span className="text-lg font-semibold">${record?.price}</span>
      ),
    },
    {
      title: "Posted On",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "business location",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(record)}
            className="border border-[#0091ff] rounded-lg p-1 bg-[#cce9ff] text-[#0091ff]"
            title="View Details"
          >
            <FaRegEye className="w-8 h-8 text-[#0091ff]" />
          </button>
          <button
            onClick={() =>
              navigate("/edit-listing-management", {
                state: { listing: record },
              })
            }
            className="border border-green-500 rounded-lg p-1 bg-green-100 text-green-600"
            title="Edit Listing"
          >
            <FiEdit className="w-8 h-8 text-green-600" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

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
        pagination={{
          pageSize: 10,
          total: listingsData?.total || dataSource?.length || 0,
          current: page,
          showSizeChanger: false,
          onChange: (newPage) => setPage(newPage),
        }}
        scroll={{ x: "max-content" }}
      />
      <Modal
        open={isModalOpen}
        centered
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        width="800px"
        style={{ top: 20 }}
        bodyStyle={{
          padding: 0,
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
        }}
      >
        <div className="container mx-auto p-5 bg-white">
          {/* Image Gallery Section */}
          <div className="mb-5">
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Trendy Urban Café"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-5">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Trendy Urban Café in Dhaka City
              </h1>
              <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
                {/* <FaTag className="text-green-600" /> */}
                <span>Price: $75,000 USD</span>
              </div>
            </div>

            {/* Business Details Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Business Details
              </h2>

              <div className="space-y-4">
                {/* Business Type */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* <FaBuilding className="text-gray-600" /> */}
                    <span className="font-medium text-gray-700">
                      Business Type
                    </span>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    Franchise Resale
                  </span>
                </div>

                {/* Industry */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* <FaMapMarkerAlt className="text-gray-600" /> */}
                    <span className="font-medium text-gray-700">Industry</span>
                  </div>
                  <span className="text-gray-600">
                    Food & Beverage – Café & Coffee Shop
                  </span>
                </div>

                {/* Ownership Type */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* <FaUser className="text-gray-600" /> */}
                    <span className="font-medium text-gray-700">
                      Ownership Type
                    </span>
                  </div>
                  <span className="text-gray-600">Sole Proprietorship</span>
                </div>

                {/* Reason for Selling */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* <FaInfoCircle className="text-gray-600" /> */}
                    <span className="font-medium text-gray-700">
                      Reason for Selling
                    </span>
                  </div>
                  <span className="text-gray-600">Owner relocating abroad</span>
                </div>

                {/* Location */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* <FaMapMarkerAlt className="text-gray-600" /> */}
                    <span className="font-medium text-gray-700">Location</span>
                  </div>
                  <span className="text-gray-600">
                    Banani, Dhaka, Bangladesh
                  </span>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Product Description
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  Located in the heart of Banani, this cozy, fully-operational
                  urban café is a favorite among young professionals, students,
                  and tourists. The business boasts a strong brand identity,
                  stylish interior, and a loyal customer base.
                </p>
                <p>
                  The café is known for its handcrafted coffee, fresh bakery
                  items, and comfortable ambiance perfect for casual meetings
                  and co-working.
                </p>
              </div>
            </div>

            {/* Assets Included */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Assets Included
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Licensed franchise brand rights (transferable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Complete café setup (~1,200 sq. ft.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Professional coffee & kitchen equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>POS system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Decor and interior furnishings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>10k+ social media followers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Staff and supplier contacts</span>
                </li>
              </ul>
            </div>

            {/* Financial Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Financial Summary (Approximate)
              </h3>

              <div className="space-y-3">
                <div className="">
                  <span className="text-gray-700">Monthly Revenue:</span>
                  <span className="font-semibold">$4,500</span>
                </div>
                <div className="">
                  <span className="text-gray-700">Monthly Expenses:</span>
                  <span className="font-semibold">$2,000</span>
                </div>
                <div className="">
                  <span className="text-gray-700">Net Profit:</span>
                  <span className="font-semibold">$2,500</span>
                </div>
                <div className="">
                  <span className="text-gray-700">Inventory Value:</span>
                  <span className="font-semibold">$2,000</span>
                </div>
                <div className="">
                  <span className="text-gray-700">Lease Terms:</span>
                  <span className="text-gray-600 text-sm">
                    3 years remaining, renewable
                  </span>
                </div>
                <div className="">
                  <span className="text-gray-700">Royalty Fee:</span>
                  <span className="text-gray-600">5% of monthly revenue</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full pt-5 border-t border-gray-200 flex gap-2">
              <button className="w-full px-3 py-2 border border-[#0091ff] bg-[#0091ff] !text-white text-sm">
                Mark as Approved
              </button>
              <button className="w-full px-3 py-2 border border-red-500 bg-red-500 !text-white text-sm">
                Mark as Rejected
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
