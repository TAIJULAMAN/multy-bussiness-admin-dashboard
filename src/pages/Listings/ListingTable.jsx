import React from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import {
  useGetAllListingsQuery,
  useUpdateListingMutation,
  useDeleteListingMutation,
} from "../../redux/api/listingApi";
import Loader from "../../Components/Loaders/Loader";
import { getImageBaseUrl } from "../../config/envConfig";
import Swal from "sweetalert2";

export default function ListingTable({ businessRole = "", status = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  // console.log("selectedListing", selectedListing);
  const [page, setPage] = useState(1);
  const [activeAction, setActiveAction] = useState(null);
  const navigate = useNavigate();

  // Fetch listings data from API with filters
  const { data: listingsData, isLoading } = useGetAllListingsQuery({
    businessRole: businessRole || undefined,
    status: status || undefined,
    page,
    limit: 10,
  });

  // Update listing mutation
  const [updateListing, { isLoading: isUpdating }] = useUpdateListingMutation();
  const [deleteListing, { isLoading: isDeleting }] = useDeleteListingMutation();

  const showModal = (record) => {
    setSelectedListing(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (record) => {
    if (!record?._id) return;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete "${record?.title || "this listing"}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteListing({ businessId: record._id }).unwrap();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Listing "${record?.title || ""}" has been deleted successfully.`,
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.data?.message || "Failed to delete listing. Please try again.",
        });
      }
    }
  };

  const handleApprove = async () => {
    if (!selectedListing) return;
    console.log(selectedListing._id);
    try {
      const wasApproved = selectedListing?.isApproved === true;
      await updateListing({
        businessId: selectedListing._id,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: wasApproved ? "Rejected!" : "Approved!",
        text: wasApproved
          ? `Listing "${
              selectedListing?.title || ""
            }" has been rejected successfully!`
          : `Listing "${
              selectedListing?.title || ""
            }" has been approved successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to approve listing. Please try again.",
      });
    }
    setActiveAction(null);
  };

  const handleApproveClick = async (action) => {
    setActiveAction(action); // 'approve' or 'reject'
    await handleApprove();
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
    price: listing?.price || "N/A",
    views: listing?.views || "N/A",
    date: listing?.createdAt
      ? new Date(listing?.createdAt).toLocaleDateString()
      : "N/A",
    title: listing?.title,
    category: listing?.category || "N/A",
    subCategory: listing?.subCategory || "N/A",
    businessType: listing?.businessType || "N/A",
    ownerShipType: listing?.ownerShipType || "N/A",
    askingPrice: listing?.askingPrice || "N/A",
    countryName: listing?.countryName || "N/A",
    state: listing?.state || "N/A",
    city: listing?.city || "N/A",
    reason: listing?.reason || "N/A",
    description: listing?.description || "N/A",
    isApproved: listing?.isApproved || "N/A",
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
      title: "Views",
      dataIndex: "views",
      key: "views",
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
      dataIndex: "countryName",
      key: "countryName",
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
          <button
            onClick={() => handleDelete(record)}
            disabled={isDeleting}
            className="border border-red-500 rounded-lg p-1 bg-red-100 text-red-600"
            title="Delete Listing"
          >
            <FiTrash2 className={`w-8 h-8 ${isDeleting ? "opacity-50" : "text-red-600"}`} />
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
                src={
                  selectedListing?.business_image
                    ? `${getImageBaseUrl()}/business-image/${
                        selectedListing.business_image
                      }`
                    : selectedListing?.image
                    ? `${getImageBaseUrl()}/business-image/${
                        selectedListing.image
                      }`
                    : "https://avatar.iran.liara.run/public/21"
                }
                alt={selectedListing?.title || "Business Listing"}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-5">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedListing?.title || "Business Listing"}
              </h1>
              <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
                <span>Price: ${selectedListing?.price || 0} USD</span>
              </div>
            </div>

            {/* Business Details Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Business Details
              </h2>

              <div className="space-y-4">
                {/* Business Role */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">
                      Business Role
                    </span>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {selectedListing?.businessRole || "N/A"}
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">Category</span>
                  </div>
                  <span className="text-gray-600">
                    {selectedListing?.category || "N/A"}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">Status</span>
                  </div>
                  <span
                    className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                      selectedListing?.isApproved === true
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedListing?.isApproved === true
                      ? "Approved"
                      : "Pending"}
                  </span>
                </div>

                {/* User Information */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">Listed By</span>
                  </div>
                  <span className="text-gray-600">
                    {selectedListing?.user?.name || "N/A"}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* <FaMapMarkerAlt className="text-gray-600" /> */}
                    <span className="font-medium text-gray-700">Location</span>
                  </div>
                  <span className="text-gray-600">
                    {selectedListing?.country || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Business Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Business Description
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  {selectedListing?.description ||
                    "No description available for this business listing."}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            {selectedListing?.additionalInfo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Additional Information
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>{selectedListing.additionalInfo}</p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Email:</span>
                  <span className="font-semibold">
                    {selectedListing?.user?.email || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Posted Date:</span>
                  <span className="text-gray-600">
                    {selectedListing?.createdAt
                      ? new Date(selectedListing.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full pt-5 border-t border-gray-200 flex gap-2">
              {/* Approve button - active only when not approved */}
              <button
                onClick={() => handleApproveClick("approve")}
                disabled={isUpdating || selectedListing?.isApproved === true}
                className={`w-1/2 px-3 py-2 border !text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed
                  ${"bg-blue-500 border-blue-500 hover:bg-blue-600 text-white"}`}
                title="Approve Listing"
              >
                {isUpdating && activeAction === "approve" ? "Processing..." : "Mark as Approve"}
              </button>

              {/* Reject button - active only when currently approved */}
              <button
                onClick={() => handleApproveClick("reject")}
                disabled={isUpdating || selectedListing?.isApproved !== true}
                className={`w-1/2 px-3 py-2 border !text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed
                  ${"bg-red-500 border-red-500 hover:bg-red-600 text-white"}`}
                title="Reject Listing"
              >
                {isUpdating && activeAction === "reject" ? "Processing..." : "Mark as Rejected"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
